import React from "react"
import { Box, Button, Grid } from '@material-ui/core'
export default function Buttons() {
    return (
        <Grid container
            justify="center" spacing={3}
            alignItems="center">
            <Grid item xs={2}>
                <Button variant="outlined"
                    color="secondary"
                    className="button"
                    display="flex"
                >
                    Reset
                        </Button>
            </Grid>
            <Grid item xs={2}>
                <Button variant="contained"
                    className="button"
                >
                    Union
                        </Button>
            </Grid>

            <Grid item xs={2}>
                <Button variant="contained"
                    className="button">
                    Intersect
                        </Button>
            </Grid>
        </Grid>
    )
}