import React, {useState, useEffect, useRef} from 'react'
import {Box, Button, TextField, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {changeModule, closeModal} from "../../store/reducers/admin/moduleSlice";
import {useCreateModuleMutation, useUpdateModuleMutation} from "../../services/moduleAPI";
import {IModule} from "../../models/IModule";
import BaseModal from "./BaseModal";
import {useGetAllLessonsQuery} from "../../services/contentAPI";
import {ILesson} from "../../models/ILesson";
import SortListByDrag from "../SortListByDrag";
import {LoadingButton} from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";

const ModuleCreate = () => {
    const {open, module, isUpdate} = useAppSelector(state => state.moduleReducer)
    const {data: lessons} = useGetAllLessonsQuery()
    const dispatch = useAppDispatch()
    const [create, {isLoading: isLoadingCreate, isSuccess: isSuccessCreate}] = useCreateModuleMutation()
    const [update, {isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate}] = useUpdateModuleMutation()
    const [file, setFile] = useState<File | null>(null)
    const lessonsRef = useRef<any>(null)

    useEffect(() => {
        if (isSuccessCreate || isSuccessUpdate) {
            handleClose()
        }
    }, [isSuccessCreate, isSuccessUpdate])

    const handleClose = () => {
        setFile(null)
        dispatch(closeModal())
    }

    const handleModule = (key: keyof IModule) => (e: React.ChangeEvent<HTMLInputElement>) => dispatch(changeModule({
        ...module,
        [key]: e.target.value
    }))

    const handleChangeOptions = (list: any) => {
        lessonsRef.current = list
    }

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
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
        if (file) {
            data.append('file', file)
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
            title = {isUpdate ? 'Изменение модуля' : 'Создание модуля'}
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
                    <Typography
                        mb = {2}
                        color = 'text.primary'
                    >
                        {file && file.name.substring(0, 20)}
                    </Typography>
                    <Button
                        variant = 'contained'
                        component = "label"
                        fullWidth
                    >
                        Загрузить картинку
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
