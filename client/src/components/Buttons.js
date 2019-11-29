import React from "react"
import { Box, Button, Grid } from '@material-ui/core'
import { unionClick, intersectClick, resetClick } from "../actions/helpers"
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
                    onClick={resetClick}
                >
                    Reset
                        </Button>
            </Grid>
            <Grid item xs={2}>
                <Button variant="contained"
                    className="button"
                    onClick={unionClick}
                >
                    Union
                        </Button>
            </Grid>

            <Grid item xs={2}>
                <Button variant="contained"
                    className="button"
                    onClick={intersectClick}>
                    Intersect
                        </Button>
            </Grid>
        </Grid>
    )
}