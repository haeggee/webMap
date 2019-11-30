import React from "react";
// Importing actions/required methods
import { setState, getState, subscribe } from "statezero"
import { login } from "../actions/serverAPI"
import { Paper, Button, TextField, Box, Typography } from "@material-ui/core";
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
    fields: {
        width: '100%',
        margin: theme.spacing(2)
    },
}))

/**
 * Updates the state of the login form.
 * @param {*} field
 */
const updateLoginForm = (field) => {
    const { name, value } = field;
    setState(`loginForm.${name}`, value);
};

export default function Login() {
    const classes = useStyles()
    const [message, setMessage] = React.useState("")
    
    subscribe(() => setMessage(getState("message")), "message");
    return (
        <Box>
            <Paper className={classes.paper}>
                <TextField
                    variant="outlined"
                    name="username"
                    label="Username"
                    className={classes.fields}
                    onChange={e => updateLoginForm(e.target)}
                />

                <TextField
                    variant="outlined"
                    name="password"
                    label="Password"
                    type="password"
                    className={classes.fields}
                    onChange={e => updateLoginForm(e.target)}
                />

                <Button className={classes.fields}
                        variant="contained"
                        onClick={login}>
                    Log In
                </Button>
                <Box className={classes.fields}>
                    <Typography color="secondary">
                        {message}
                    </Typography>
                </Box>
            </Paper>
        </Box >
    );
}