import React, {FC} from 'react';
import {Box, Button, ButtonGroup, Container, Grid} from "@mui/material";
import {useAppDispatch} from "../hooks/redux";
import {openModal as openCourse} from "../store/reducers/admin/courseSlice";
import {openModal as openLesson} from "../store/reducers/admin/lessonSlice";
import {openModal as openTest} from "../store/reducers/admin/testSlice";
import UsersData from "../components/modals/UsersData";

const Admin: FC = () => {
    const dispatch = useAppDispatch()

    const handlerCourseModal = () => dispatch(openCourse())

    const handlerLessonModal = () => dispatch(openLesson())

    const handlerTestModal = () => dispatch(openTest())

    return (
      <>
          <Grid
            container
          >
              <Grid
                item
                xs = {12}
                md = {2}
                pt = {5}
                pl = {3}
              >
                  <ButtonGroup
                    orientation = 'vertical'
                  >
                      <Box mb = {2}>
                          <Button
                            variant = 'contained'
                            onClick = {handlerCourseModal}
                          >
                              Create course
                          </Button>
                      </Box>
                      <Box mb = {2}>
                          <Button
                            variant = 'contained'
                            onClick = {handlerLessonModal}
                          >
                              Create lesson
                          </Button>
                      </Box>
                      <Box mb = {2}>
                          <Button
                            variant = 'contained'
                            onClick = {handlerTestModal}
                          >
                              Create test
                          </Button>
                      </Box>
                  </ButtonGroup>
              </Grid>
              <Grid item xs = {12} md = {10}>
                  <UsersData/>
              </Grid>
          </Grid>

      </>
    );
};

export default Admin;

