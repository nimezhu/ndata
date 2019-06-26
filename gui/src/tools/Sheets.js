import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import XLSX from "xlsx"
import Sheet from "./Sheet"

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  var  {data} = props

  function handleChange(event, newValue) {
    setValue(newValue);
  }
  var containers = []
  return (
    <Typography component="div" className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
      {
          data.SheetNames && data.SheetNames.map(function(d){
            return (<Tab label={d}/>)
           })
          
      }
      </Tabs>
      </AppBar>
      {
       data.SheetNames && data.SheetNames.map(function(d,i){
           var v = XLSX.utils.sheet_to_json(data.Sheets[d],{header:1})
          return (value===i && <Sheet data={v}/>)
      }) 
    
      }
    </Typography>
  );
}
