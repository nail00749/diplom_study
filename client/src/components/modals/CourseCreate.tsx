import React, {FC, useEffect} from 'react';
import {Dialog, Typography, IconButton, Box, TextField, Button} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import {useCreateCourseMutation, useUpdateCourseMutation} from "../../services/adminAPI";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {
    closeModal,
    changeTitle,
    changeDescription,
    errorTitleChange,
    errorDescriptionChange, changeFile
} from "../../store/reducers/admin/courseSlice";
import {LoadingButton} from "@mui/lab";
import {Transition} from "./Transition";
import {noop} from "../../utils";

const CourseCreate: FC = () => {
    const [create, {isLoading: isLoadingCreate, isSuccess: isSuccessCreate}] = useCreateCourseMutation()
    const [update, {isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate}] = useUpdateCourseMutation()

    const {
        open,
        title,
        titleError,
        description,
        descriptionError,
        isUpdate,
        id,
        file
    } = useAppSelector(state => state.courseAdminReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isSuccessCreate || isSuccessUpdate) {
            dispatch(closeModal())
        }
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

        const data = new FormData()
        data.append('file', file)
        data.append('title', title)
        data.append('description', description)
        if (isUpdate && id) {
            await update({body: data, _id: id})
        } else {
            await create(data)
        }
    };

    const handlerName = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(changeTitle(e.target.value))

    const handlerAbout = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(changeDescription(e.target.value))

    const handlerFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            dispatch(changeFile(e.target.files[0]))
        }
    }
    const handlerClose = () => dispatch(closeModal())

    return (
        <Dialog
            open = {open}
            TransitionComponent = {Transition}
            onClose = {(isLoadingUpdate || isLoadingCreate) ? noop : handlerClose}
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
                        onClick = {handlerClose}
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
                        {`Course ${isUpdate ? 'edit' : 'create'}`}
                    </Typography>
                </Box>
                <Box
                    mx = {5}
                >
                    <Box
                        mb = {3}
                    >
                        <TextField
                            label = 'Title'
                            variant = 'filled'
                            required
                            onChange = {handlerName}
                            value = {title}
                            error = {titleError}
                            disabled = {isLoadingCreate || isLoadingUpdate}
                        />
                    </Box>
                    <Box
                        mb = {3}
                    >
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
                    {
                        file &&
						<Box>
                            {`File: ${file.name.length > 18 ? file.name.substring(0, 15) + '...' : file.name}`}

						</Box>
                    }
                    <Box
                        mb = {3}
                    >
                        <Button
                            variant = 'contained'
                            component = "label"
                            sx = {{
                                width: '100%'
                            }}
                        >
                            Upload file
                            <input
                                type = 'file'
                                hidden
                                onChange = {handlerFile}
                                accept = 'image/*'
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
                            onClick = {saveCourse}
                        >
                            Save
                        </LoadingButton>
                    </Box>
                </Box>
            </Box>
        </Dialog>
    )
}

export default React.memo(CourseCreate);
