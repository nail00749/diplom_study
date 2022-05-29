import React, {FC, useEffect, useRef} from 'react';
import {Dialog, Typography, IconButton, Box, TextField, Button} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import {useCreateCourseMutation, useUpdateCourseMutation} from "../../services/courseAPI";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {
    closeModal,
    errorTitleChange,
    errorDescriptionChange,
    changeCourse
} from "../../store/reducers/admin/courseSlice";
import {LoadingButton} from "@mui/lab";
import {Transition} from "./Transition";
import {noop} from "../../utils";
import {ICourse} from "../../models/ICourse";
import BaseModal from "./BaseModal";
import {useGetAllModulesQuery} from "../../services/moduleAPI";
import SortListByDrag from "../SortListByDrag";
import {moduleSlice} from "../../store/reducers/admin/moduleSlice";
import {IModule} from "../../models/IModule";

const CourseCreate: FC = () => {
    const [create, {isLoading: isLoadingCreate, isSuccess: isSuccessCreate}] = useCreateCourseMutation()
    const [update, {isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate}] = useUpdateCourseMutation()
    const {data: modules} = useGetAllModulesQuery()

    const {
        open,
        titleError,
        descriptionError,
        isUpdate,
        course
    } = useAppSelector(state => state.courseReducer)
    const dispatch = useAppDispatch()
    const fileRef = useRef<File | null>(null)
    const modulesRef = useRef<any>(null)

    useEffect(() => {
        if (isSuccessCreate || isSuccessUpdate) {
            dispatch(closeModal())
        }
    }, [isSuccessUpdate, isSuccessCreate]);

    const saveCourse = async () => {
        let isError = false
        if (!course.title) {
            isError = true
            dispatch(errorTitleChange())
        }
        if (!course.description) {
            isError = true
            dispatch(errorDescriptionChange())
        }

        if (isError) {
            return
        }

        const data = new FormData()
        data.append('title', course.title!)
        data.append('description', course.description!)
        if (fileRef && fileRef.current) {
            data.append('file', fileRef.current)
        }
        if (modulesRef && modulesRef.current) {
            data.append('modules', JSON.stringify(modulesRef.current.map((module: IModule) => module._id)))
        }

        if (isUpdate) {
            await update({body: data, _id: course._id!})
        } else {
            await create(data)
        }
        modulesRef.current = null
    };

    const handleCourse = (key: keyof ICourse) => (e: React.ChangeEvent<HTMLInputElement>) => dispatch(changeCourse({
        ...course,
        [key]: e.target.value
    }))

    const handlerFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            fileRef.current = e.target.files[0]
        }
    }

    const handleChangeOptions = (list: any) => {
        modulesRef.current = list
    }

    const handleClose = () => dispatch(closeModal())

    return (
        <BaseModal
            open = {open}
            onClose = {handleClose}
            disabled = {isLoadingCreate || isLoadingUpdate}
            title = {'Создание курса'}
        >


            <Box
                mx = {5}
            >
                <Box
                    mb = {3}
                >
                    <TextField
                        label = 'Заголовок'
                        variant = 'filled'
                        required
                        onChange = {handleCourse('title')}
                        value = {course.title}
                        error = {titleError}
                        disabled = {isLoadingCreate || isLoadingUpdate}
                    />
                </Box>
                <Box
                    mb = {3}
                >
                    <TextField
                        label = 'Описание'
                        variant = 'filled'
                        required
                        onChange = {handleCourse('description')}
                        value = {course.description}
                        error = {descriptionError}
                        disabled = {isLoadingCreate || isLoadingUpdate}
                    />
                </Box>
                <Box
                    sx = {{
                        mb: 3,
                        overflowY: 'auto',
                        maxHeight: 250
                    }}
                >
                    {
                        modules &&
						<SortListByDrag
							initList = {course.modules}
							options = {modules}
							changeOptions = {handleChangeOptions}
							disabled = {isLoadingCreate || isLoadingUpdate}
						/>
                    }
                </Box>
                {
                    (fileRef && fileRef.current) &&
					<Box>
                        {`File: ${fileRef.current.name.length > 18 ? fileRef.current.name.substring(0, 15) + '...' : fileRef.current.name}`}
					</Box>
                }
                <Box
                    mb = {3}
                >
                    <Button
                        variant = 'contained'
                        component = "label"
                        fullWidth
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

        </BaseModal>
    )
}

export default React.memo(CourseCreate);


