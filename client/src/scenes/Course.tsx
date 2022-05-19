import {Box, Button, Typography} from '@mui/material';
import React, {FC, useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useGetCourseQuery} from "../services/contentAPI";
import {useAppDispatch} from "../hooks/redux";
import {openModal} from "../store/reducers/admin/courseSlice";

const Course: FC = () => {
    const {courseId} = useParams()
    const navigate = useNavigate()
    const {data: course} = useGetCourseQuery(String(courseId))
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!courseId) {
            navigate('/')
        }
    }, [courseId, navigate])

    const handlerEdit = () => {
        if (course) {
            dispatch(openModal({
                title: course.title,
                description: course.description,
                isUpdate: true,
                id: course.id
            }))
        }
    }


    return (
        <Box>
            <Button
                variant = 'outlined'
                onClick = {handlerEdit}
            >
                Edit course
            </Button>
            <Box>
                {
                    course &&
					<>
						<Typography>{course.title}</Typography>
						<Typography>{course.description}</Typography>
						<Box>
                            {
                                course.lessons && course.lessons.map(item =>
                                    <Box
                                        key={item.id}
                                    >
                                        <Link
                                            to = {`/lesson/${item.id}`}
                                        >
                                            {item.title}
                                        </Link>
                                    </Box>
                                )
                            }
						</Box>
					</>
                }
            </Box>
        </Box>
    );
};

export default Course;
