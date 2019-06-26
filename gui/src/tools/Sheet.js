import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

function Sheet(props) {
    var {
        data
    } = props
    return (
        <Paper>
        <Typography component="div">
           Under Construction... 
        </Typography>
        <Typography>
           Rows Number: {data.length-1}
        </Typography>
        <Table>
            <TableHead>
            <TableRow>
            {
            data[0].map((cell) => {
                return (<TableCell>{cell}</TableCell>)
            })
            }
            </TableRow>
            </TableHead>
            <TableBody>
        {data.slice(1).map((row) => {
            return (<TableRow>
            {
            row.map((cell) => {
                return (
                <TableCell>{cell}</TableCell>
                )
            })
            }
            </TableRow>)

        }
        )}
            </TableBody>

        </Table>
        </Paper>
    )
}
export default Sheet
