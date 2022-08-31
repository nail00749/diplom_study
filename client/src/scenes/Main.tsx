import React, {FC, Suspense} from 'react';
import {CircularProgress, Grid, useMediaQuery} from "@mui/material";
import Profile from "../components/User/Profile";

const CourseContainer = React.lazy(() => import("../components/Course/CourseContainer"))

const Main: FC = () => {
    const matches = useMediaQuery('(max-width: 425px)')

    return (
        <Grid
            container
            spacing = {2}
            mt = {.5}
            p = {matches ? 1 : 3}
        >
            <Grid
                item
                xs = {12}
                md = {4}
            >
                <Profile/>
            </Grid>
            <Grid
                item
                xs = {12}
                md = {8}
            >
                <Suspense fallback = {<CircularProgress/>}>
                    <CourseContainer/>
                </Suspense>
            </Grid>
            {/*<Grid
                item
                xs = {12}
                md={4}
            >
                <StreamContainer/>
            </Grid>*/}
        </Grid>
    );
};

export default Main;
