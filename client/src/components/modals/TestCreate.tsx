import React, {FC, useEffect, useState} from 'react';
import {
    Dialog,
    Typography,
    IconButton,
    Box,
    TextField,
    Button,
    Grid,
    useMediaQuery, Autocomplete
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {
    addQuestion,
    closeModal,
    changeDescription,
    changeLesson,
    errorDescriptionChange,
    errorLessonChange
} from "../../store/reducers/admin/testSlice";
import Question from "../test/admin/Question";
import {useCreateTestMutation, useUpdateTestMutation} from "../../services/adminAPI";
import {useGetAllLessonsQuery} from "../../services/contentAPI";
import {ILesson} from "../../models/ILesson";
import {Transition} from "./Transition";
import {showErrorAlert} from "../../store/reducers/service/ServiceSlice";
import {LoadingButton} from "@mui/lab";
import {ITest} from "../../models/ITest";

const CourseCreate: FC = () => {
    const {
        open,
        questions,
        description,
        descriptionError,
        lesson,
        lessonError,
        isUpdate,
        id
    } = useAppSelector(state => state.testReducer)
    const [lessonInputValue, setLessonInputValue] = useState('');
    const {data: lessons} = useGetAllLessonsQuery()
    const [create, {isLoading: isLoadingCreate, isSuccess: isSuccessCreate}] = useCreateTestMutation()
    const [update, {isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate}] = useUpdateTestMutation()
    const dispatch = useAppDispatch()
    const matches = useMediaQuery('(max-width: 425px)')

    useEffect(() => {
        dispatch(closeModal())
    }, [dispatch, isSuccessCreate, isSuccessUpdate])

    const saveTest = async () => {
        let isError = false
        if (!description) {
            dispatch(errorDescriptionChange())
            isError = true
        }
        if (!lesson) {
            dispatch(errorLessonChange())
            isError = true
        }
        if (!questions || !questions.length) {
            isError = true
            dispatch(showErrorAlert('not questions'))
        }

        if (isError) {
            return
        }

        const data = {
            description,
            questions,
            lesson: lesson!._id
        }
        if (isUpdate) {
            await update({...data, _id: id} as ITest)
        } else {
            await create(data)
        }
    };

    const handlerDescription = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(changeDescription(e.target.value))

    const handleLesson = (e: any, newValue: ILesson | null) => dispatch(changeLesson(newValue))

    const handlerAdd = () => dispatch(addQuestion())

    const handlerClose = () => dispatch(closeModal())

    const mock = () => {
    }

    return (
        <Dialog
            open = {open}
            TransitionComponent = {Transition}
            onClose = {(isLoadingUpdate || isLoadingCreate) ? mock : handlerClose}
            fullScreen
        >
            <Box
                p = {3}
                px = {matches ? 3 : 10}
            >
                <Box
                    sx = {{
                        display: 'flex',
                        alignItems: 'center'
                    }}
                    mb = {2}
                >
                    <IconButton
                        onClick = {handlerClose}
                        disabled = {isLoadingCreate || isLoadingUpdate}
                    >
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant = 'h5' component = 'span'>
                        {`${isUpdate ? 'Edit' : 'Create'} test`}
                    </Typography>
                </Box>
                <Grid
                    container
                    spacing = {3}
                >
                    <Grid item xs = {12} md = {6} lg = {4}>
                        <Box mb = {3}>
                            <TextField
                                label = 'About'
                                variant = 'filled'
                                required
                                onChange = {handlerDescription}
                                value = {description}
                                error = {descriptionError}
                                fullWidth
                                disabled = {isLoadingCreate || isLoadingUpdate}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs = {12} md = {6} lg = {4}>
                        <Box mb = {3}>
                            <Autocomplete
                                renderInput = {params =>
                                    <TextField
                                        {...params}
                                        label = 'Lesson'
                                        variant = 'filled'
                                        required
                                        fullWidth
                                        error = {lessonError}
                                        disabled = {isLoadingCreate || isLoadingUpdate}
                                    />
                                }
                                value = {lesson}
                                options = {lessons as readonly  ILesson[]}
                                onChange = {handleLesson}
                                inputValue = {lessonInputValue}
                                onInputChange = {(e, newValue) => {
                                    setLessonInputValue(newValue)
                                }}
                                getOptionLabel = {(option: ILesson) => (option && option.title) || ''}
                                //renderOption = {(option) => <span>{option.title}</span>}
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Box>
                    {
                        questions && questions.length ?
                            questions.map((item, index) =>
                                <Question
                                    value = {item}
                                    key = {item.id}
                                    index = {index}
                                />
                            ) : null
                    }
                </Box>
                <Box mb = {3}>
                    <Button
                        variant = 'outlined'
                        onClick = {handlerAdd}
                        disabled = {isLoadingCreate || isLoadingUpdate}
                    >
                        Add question
                    </Button>
                </Box>
                <Box>
                    <LoadingButton
                        loading = {isLoadingCreate || isLoadingUpdate}
                        variant = 'outlined'
                        color = 'success'
                        endIcon = {<SaveIcon/>}
                        onClick = {saveTest}
                    >
                        Save
                    </LoadingButton>
                </Box>
            </Box>
        </Dialog>
    )

}

export default CourseCreate;
