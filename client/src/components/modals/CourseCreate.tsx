import React, {FC, useEffect} from 'react';
import {Dialog, Typography, IconButton, Box, TextField} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import {useCreateCourseMutation, useUpdateCourseMutation} from "../../services/adminAPI";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {
    closeModal,
    changeTitle,
    changeDescription,
    errorTitleChange,
    errorDescriptionChange
} from "../../store/reducers/admin/courseSlice";
import {LoadingButton} from "@mui/lab";
import {Transition} from "./Transition";

const CourseCreate: FC = () => {
    const [create, {isLoading: isLoadingCreate, isSuccess: isSuccessCreate}] = useCreateCourseMutation()
    const [update, {isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate}] = useUpdateCourseMutation()
    const {
        open,
        title,
        description,
        titleError,
        descriptionError,
        isUpdate,
        id
    } = useAppSelector(state => state.courseAdminReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(closeModal())
    }, [isSuccessUpdate, isSuccessCreate]);


    const saveCourse = async () => {
        let isError = false
        if (!title) {
            isError = true
            dispatch(errorTitleChange())
        }

        if (!description) {
            isError = true
            dispatch(errorDescriptionChange())
        }

        if (isError) {
            return
        }

        const data = {
            title, description
        }
        if (isUpdate) {
            await update({...data, id})
        } else {
            await create(data)
        }
    };

    const handlerName = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(changeTitle(e.target.value))

    const handlerAbout = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(changeDescription(e.target.value))

    const handlerClose = () => dispatch(closeModal())

    const mock = () => {}

    return (
        <Dialog
            open = {open}
            TransitionComponent = {Transition}
            onClose = {(isLoadingUpdate || isLoadingCreate) ? mock : handlerClose}
        >
            <Box
                p = {3}
                px = {5}
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
                        {`Course ${isUpdate ? 'edit' : 'create'}`}
                    </Typography>
                </Box>
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
                <LoadingButton
                    loading = {isLoadingCreate || isLoadingUpdate}
                    variant = 'outlined'
                    color = 'success'
                    endIcon = {<SaveIcon/>}
                    onClick = {saveCourse}
                >
                    Save
                </LoadingButton>
            </Box>
        </Dialog>
    )

}

export default CourseCreate;
