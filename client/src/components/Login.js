import React from "react";
// Importing actions/required methods
// TBD

import { Paper, Button, TextField, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: '#d1d8e3',
        padding: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
    },
    textfield: {
        width: '100%',
        margin: theme.spacing(2)
    },
}))

export default function Login() {
    const classes = useStyles()
    return (
        <Box>
            <Paper className={classes.paper}>
                <TextField
                    variant="outlined"
                    name="username"
                    label="Username"
                    className={classes.textfield}
                />

                <TextField
                    variant="outlined"
                    name="password"
                    label="Password"
                    type="password"
                    className={classes.textfield}
                />

                <Button variant="contained">
                    Log In
                </Button>
            </Paper>
        </Box >
    );
}