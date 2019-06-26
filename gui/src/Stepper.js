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

    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
            <Typography component="div">
            <Typography component="div">
                <Input type="file" id="file" inputProps={{"accept":"xlsx"}} onChange={handleReadFile}/>
          </Typography>
            <Typography component="div">
                <Sheets data={data}/>
          </Typography>
          </Typography>);
            case 1:
                return <Typography component="div">
                    <Button variant="outlined" onClick={handleRun}>Run</Button>

            <Typography component="div">
                    TODO Log...
            </Typography>
                    </Typography>;
            case 2:
                return 'Browsing your data in Nucleome Browser';
            default:
                return 'Uknown stepIndex';
        }
    }

    function handleRun(e) {
        console.log("TODO RUN SERVER")
        try {
            window.nbRun()
        } catch(e) {
            console.log("nbRun function not found")
        }
        setNextStepReady(1)
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

            setNextStepReady(1)
        }
    }

    function handleNext() {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        if (activeStep === steps.length - 1) {
            window.open("https://vis.nucleome.org", "_blank")
        }
        setNextStepReady(0)
    }

    function handleBack() {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    }

    function handleReset() {
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
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
              Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext} disabled={nextStepReady === 0 && activeStep !== steps.length - 1}>
                {activeStep === steps.length - 1 ? 'Open Nucleome Browser' : 'Next'}
              </Button>
            </div>
            <Typography className={classes.instructions} component="div">{getStepContent(activeStep)}</Typography>
          </div>
        )}
      </div>
    </div>);
}
