import React, {useState, useEffect, useRef} from 'react'
import {Transition} from "./Transition";
import {noop} from "../../utils";
import {Autocomplete, Box, Button, Dialog, IconButton, TextField, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {addLesson, changeModule, closeModal, setLessons} from "../../store/reducers/admin/moduleSlice";
import {useCreateModuleMutation, useUpdateModuleMutation} from "../../services/moduleAPI";
import {IModule} from "../../models/IModule";
import BaseModal from "./BaseModal";
import {useGetAllLessonsQuery} from "../../services/contentAPI";
import {ILesson} from "../../models/ILesson";
import lessonSlice, {changeCourse} from "../../store/reducers/admin/lessonSlice";
import ListIcon from '@mui/icons-material/List';
import SortListByDrag from "../SortListByDrag";
import {LoadingButton} from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";

const ModuleCreate = () => {
    const {open, module, isUpdate} = useAppSelector(state => state.moduleReducer)
    const {data: lessons} = useGetAllLessonsQuery()
    const dispatch = useAppDispatch()
    const [create, {isLoading: isLoadingCreate, isSuccess: isSuccessCreate}] = useCreateModuleMutation()
    const [update, {isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate}] = useUpdateModuleMutation()
    const handleClose = () => dispatch(closeModal())
    const fileRef = useRef<File | null>(null)
    const lessonsRef = useRef<any>(null)

    useEffect(() => {
        if (isSuccessCreate || isSuccessUpdate) {
            handleClose()
        }
    }, [isLoadingCreate, isSuccessUpdate])

    const handleModule = (key: keyof IModule) => (e: React.ChangeEvent<HTMLInputElement>) => dispatch(changeModule({
        ...module,
        [key]: e.target.value
    }))

    const handleChangeOptions = (list: any) => {
        lessonsRef.current = list
    }

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            fileRef.current = e.target.files[0]
        }
    }

    const handleSaveModule = () => {
        let isError = false
        if (!module.title) {
            isError = true
        }
        if (!module.description) {
            isError = true
        }
        if (isError) {
            return
        }

        const data = new FormData()
        data.append('title', module.title!)
        data.append('description', module.description!)
        if (fileRef && fileRef.current) {
            data.append('file', fileRef.current)
        }
        if (lessonsRef && lessonsRef.current) {
            data.append('lessons', JSON.stringify(lessonsRef.current.map((lesson: ILesson) => lesson._id)))
        }
        if (isUpdate) {
            update({_id: module._id!, body: data})
        } else {
            create(data)
        }
    }

    return (
        <BaseModal
            open = {open}
            onClose = {handleClose}
            disabled = {isLoadingCreate || isLoadingUpdate}
            title = {'Создание модуля'}
        >
            <Box mx = {5}>
                <Box
                    mb = {3}
                >
                    <TextField
                        label = 'Заголовок'
                        variant = 'filled'
                        required
                        onChange = {handleModule('title')}
                        value = {module.title}
                        //error = {titleError}
                        disabled = {isLoadingCreate || isLoadingUpdate}
                        fullWidth
                    />
                </Box>
                <Box
                    mb = {3}
                >
                    <TextField
                        label = 'Описание'
                        variant = 'filled'
                        required
                        onChange = {handleModule('description')}
                        value = {module.description}

                        disabled = {isLoadingCreate || isLoadingUpdate}
                        fullWidth
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
                        lessons &&
						<SortListByDrag
							initList = {module.lessons}
							options = {lessons}
							changeOptions = {handleChangeOptions}
							disabled = {isLoadingCreate || isLoadingUpdate}
						/>
                    }
                </Box>
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
                            onChange = {handleFile}
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
                        onClick = {handleSaveModule}
                    >
                        Сохранить
                    </LoadingButton>
                </Box>
            </Box>
        </BaseModal>
    )
}

export default ModuleCreate
