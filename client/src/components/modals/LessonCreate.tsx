import React, {FC, useEffect, useState} from 'react';
import {Dialog, Typography, IconButton, Box, TextField, Autocomplete} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import {useCreateLessonMutation, useUpdateLessonMutation} from "../../services/lessonAPI";
import {useGetAllCoursesQuery} from "../../services/courseAPI";
import {
    closeModal,
    changeDescription,
    changeTitle,
    errorTitleChange,
    errorDescriptionChange,
    changeCourse,
    errorCourseChange
} from "../../store/reducers/admin/lessonSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {ICourse} from "../../models/ICourse";
import {ILesson} from "../../models/ILesson";
import {LoadingButton} from "@mui/lab";
import {Transition} from "./Transition";
import {noop} from "../../utils";

const CourseCreate: FC = () => {
    const {
        open,
        isUpdate,
        title,
        description,
        titleError,
        descriptionError,
        course,
        courseError,
        id
    } = useAppSelector(state => state.lessonAdminReducer)
    const dispatch = useAppDispatch()
    const [courseInputValue, setCourseInputValue] = useState('');
    const {data: courses} = useGetAllCoursesQuery()
    const [create, {isLoading: isLoadingCreate, isSuccess: isSuccessCreate}] = useCreateLessonMutation()
    const [update, {isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate}] = useUpdateLessonMutation()


    useEffect(() => {
        if (isSuccessCreate || isSuccessUpdate) {
            handleClose()
        }
    }, [isSuccessCreate, isSuccessUpdate]);


    const saveLesson = async () => {
        let isError = false
        if (!title) {
            isError = true
            dispatch(errorTitleChange())
        }
        if (!description) {
            isError = true
            dispatch(errorDescriptionChange())
        }
        if (!course) {
            isError = true
            dispatch(errorCourseChange())
        }

        if (isError) {
            return
        }
        const data = {
            title,
            description,
            course: course!._id
        }
        if (isUpdate) {
            await update({...data, _id: id} as ILesson)
        } else {
            await create(data)
        }

    };

    const handlerName = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(changeTitle(e.target.value))

    const handlerAbout = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(changeDescription(e.target.value))

    const handleCourse = (e: any, newValue: ICourse | null) => dispatch(changeCourse(newValue));

    const handleClose = () => dispatch(closeModal())

    return (
        <Dialog
            open = {open}
            TransitionComponent = {Transition}
            onClose = {(isLoadingUpdate || isLoadingCreate) ? noop : handleClose}
            sx = {{
                borderRadius: 3
            }}
        >
            <Box
                sx = {{
                    display: 'flex',
                    flexDirection: 'column',
                    pb: 3,
                }}
            >
                <Box
                    sx = {{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: 'grey.800',
                        mb: 3,
                        py: 3
                    }}
                >
                    <IconButton
                        onClick = {handleClose}
                        disabled = {isLoadingCreate || isLoadingUpdate}
                        color = {'error'}
                        sx = {{
                            ml: 2
                        }}
                    >
                        <CloseIcon/>
                    </IconButton>
                    <Typography
                        variant = 'h5'
                        component = 'span'
                        color = 'grey.400'
                        sx = {{
                            ml: 3
                        }}
                    >
                        {`Lesson ${isUpdate ? 'edit' : 'create'}`}
                    </Typography>
                </Box>
                <Box mx = {5}>
                    <Box mb = {3}>
                        <TextField
                            label = 'Name'
                            variant = 'filled'
                            required
                            onChange = {handlerName}
                            value = {title}
                            error = {titleError}
                            disabled = {isLoadingCreate || isLoadingUpdate}
                        />
                    </Box>
                    <Box mb = {3}>
                        <TextField
                            label = 'About'
                            variant = 'filled'
                            required
                            onChange = {handlerAbout}
                            value = {description}
                            error = {descriptionError}
                            disabled = {isLoadingCreate || isLoadingUpdate}
                        />
                    </Box>
                    <Box mb = {3}>
                        <Autocomplete
                            renderInput = {params =>
                                <TextField
                                    {...params}
                                    label = 'Course'
                                    variant = 'filled'
                                    required
                                    fullWidth
                                    error = {courseError}
                                />
                            }
                            value = {course}
                            options = {courses as readonly ICourse[]}
                            onChange = {handleCourse}
                            inputValue = {courseInputValue}
                            onInputChange = {(e, newValue) => {
                                setCourseInputValue(newValue)
                            }}
                            getOptionLabel = {(option: ICourse) => (option && option.title) || ''}
                            disabled = {isLoadingCreate || isLoadingUpdate}
                        />
                    </Box>
                </Box>
                <Box mx = {'auto'}>
                    <LoadingButton
                        loading = {isLoadingCreate || isLoadingUpdate}
                        variant = 'outlined'
                        color = 'success'
                        endIcon = {<SaveIcon/>}
                        onClick = {saveLesson}
                    >
                        Save
                    </LoadingButton>
                </Box>
            </Box>
        </Dialog>
    )

}

export default CourseCreate;
