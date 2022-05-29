import React, {FC, useEffect, useState, useRef} from 'react';
import {Dialog, Typography, IconButton, Box, TextField, Autocomplete, Button} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import {useCreateLessonMutation, useUpdateLessonMutation} from "../../services/lessonAPI";
import {
    closeModal,
    errorTitleChange,
    errorDescriptionChange, changeLesson,
} from "../../store/reducers/admin/lessonSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {ICourse} from "../../models/ICourse";
import {ILesson} from "../../models/ILesson";
import {LoadingButton} from "@mui/lab";
import {Transition} from "./Transition";
import {noop} from "../../utils";
import BaseModal from "./BaseModal";

const CourseCreate: FC = () => {
    const {
        open,
        isUpdate,
        lesson,
        titleError,
        descriptionError,
    } = useAppSelector(state => state.lessonReducer)
    const dispatch = useAppDispatch()
    const [create, {isLoading: isLoadingCreate, isSuccess: isSuccessCreate}] = useCreateLessonMutation()
    const [update, {isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate}] = useUpdateLessonMutation()
    const fileRef = useRef<File | null>(null)

    useEffect(() => {
        if (isSuccessCreate || isSuccessUpdate) {
            handleClose()
        }
    }, [isSuccessCreate, isSuccessUpdate]);


    const saveLesson = async () => {
        let isError = false
        if (!lesson.title) {
            isError = true
            dispatch(errorTitleChange())
        }
        if (!lesson.description) {
            isError = true
            dispatch(errorDescriptionChange())
        }


        if (isError) {
            return
        }

        const data = new FormData()
        data.append('title', lesson.title!)
        data.append('description', lesson.description!)
        if(fileRef && fileRef.current){
            data.append('file', fileRef.current)
        }


        if (isUpdate) {
            await update({body: data, _id: lesson._id!})
        } else {
            await create(data)
        }

    };

    const handleLesson = (key: keyof ILesson) => (e: React.ChangeEvent<HTMLInputElement>) => dispatch(changeLesson({
        ...lesson,
        [key]: e.target.value
    }))

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            fileRef.current = e.target.files[0]
        }
    }

    const handleClose = () => dispatch(closeModal())

    return (
        <BaseModal
            open = {open}
            onClose = {handleClose}
            disabled = {isLoadingCreate || isLoadingUpdate}
            title = 'Создание урока'
        >
            <Box mx = {5}>
                <Box mb = {3}>
                    <TextField
                        label = 'Заголовок'
                        variant = 'filled'
                        required
                        onChange = {handleLesson('title')}
                        value = {lesson.title}
                        error = {titleError}
                        disabled = {isLoadingCreate || isLoadingUpdate}
                    />
                </Box>
                <Box mb = {3}>
                    <TextField
                        label = 'Описание'
                        variant = 'filled'
                        required
                        onChange = {handleLesson('description')}
                        value = {lesson.description}
                        error = {descriptionError}
                        disabled = {isLoadingCreate || isLoadingUpdate}
                    />
                </Box>
                <Box
                    mb = {3}
                >
                    <Button
                        variant = 'contained'
                        component = "label"
                        fullWidth
                    >
                        Видео материал
                        <input
                            type = 'file'
                            hidden
                            onChange = {handleFile}
                            accept = 'video/*'
                        />
                    </Button>
                </Box>
                <Box
                    sx = {{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
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
        </BaseModal>
    )

}

export default CourseCreate;
