import React from 'react';
import {
    makeStyles
} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Input from "@material-ui/core/Input";
import parseExcel from "./tools/parseExcel"

import Sheets from "./tools/Sheets.js"

import ILog from "./ILog.js"
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Select an Excel file', 'Start Local Data Service', 'Open Nucleome Browser'];
}


export default function HorizontalLabelPositionBelowStepper() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [nextStepReady, setNextStepReady] = React.useState(0);
    const [data, setData] = React.useState([]);
    const steps = getSteps();

    function handleOpen(){
        window.open("https://vis.nucleome.org/v1/main.html?initedLayout=hubs")
        setActiveStep(3)
    }

    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
            <Typography component="div">
            <Typography component="div">
                <Input type="file" id="file" inputProps={{"accept":"xlsx"}} onChange={handleReadFile}/>
          </Typography>
          </Typography>);
            case 1:
                return <Typography component="div">
                <Button variant="outlined" onClick={handleRun}>Run</Button>

            <Typography component="div">
            </Typography>
                    </Typography>;
            case 2:
                return (<Typography component="div">
                <Button variant="outlined" onClick={handleOpen}>Open Nucleome Browser</Button>
                </Typography>);
            case 3: return (<Typography component="div">
            <Button variant="outlined" onClick={handleReset}>Reset</Button>
            </Typography>)
            default:
                return 'Uknown stepIndex';
        }
    }
    function handleRun(e) {
        try {
            window.nbRun()
        } catch(e) {
            window.nbLog("nbRun function not found")
        }
        setActiveStep(2)
    }

    function handleReadFile(e) {
        var fileToRead = document.getElementById("file")
        var files = fileToRead.files;
        if (files.length) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var data = e.target.result;
                var workbook = parseExcel(data)
                setData(workbook)
            }
            reader.readAsBinaryString(files[0]);
            setActiveStep(1)
        }
    }

    function handleReset() {
        window.nbStop();
        setData([])
        setActiveStep(0);
    }

    return (
        <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
          <div>
            <Typography className={classes.instructions} component="div">{getStepContent(activeStep)}</Typography>
          </div>
      </div>
       <div>
        <ILog />
        <Sheets data={data}/>
       </div>
    </div>);
}
