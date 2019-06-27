import React from 'react';

import Typography from '@material-ui/core/Typography';
function ILog(props) {
    const [value, setValue] = React.useState("");
    window.nbLog = function(s){
        setValue(s)
    }
    return (
        <Typography component="div">
        {value}
        </Typography>
    )
}
export default ILog

