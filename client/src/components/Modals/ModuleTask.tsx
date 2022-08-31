import React, {FC, useState, useEffect} from 'react'
import BaseModal from "./BaseModal";
import {Autocomplete, Box, TextField, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import {useGetAllModulesQuery} from "../../services/moduleAPI";
import {IModule} from "../../models/IModule";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useCreateModuleTaskMutation} from "../../services/moduleTaskAPI";
import {closeModuleTask} from "../../store/reducers/modals/modalsSlice";

const ModuleTask: FC = () => {
    const {moduleTaskOpen} = useAppSelector(state => state.modalsReducer)
    const dispatch = useAppDispatch()
    const {data: modules} = useGetAllModulesQuery()
    const [create, {isLoading, isSuccess}] = useCreateModuleTaskMutation()

    const [task, setTask] = useState('')
    const [module, setModule] = useState<{ value: IModule | null, error: boolean }>({value: null, error: false})
    const [moduleInput, setModuleInput] = useState('');

    useEffect(() => {
        if (isSuccess) {
            handleClose()
        }
    }, [isSuccess])

    const handleChangeTask = (e: React.ChangeEvent<HTMLInputElement>) => setTask(e.target.value)

    const handleChangeModule = (e: any, newValue: IModule | null) => setModule({value: newValue, error: false})

    const handleSend = () => {
        let isError = false

        if (!task) {
            isError = true
        }
        if (!module.value) {
            isError = true
            setModule({...module, error: true})
        }
        if (isError) {
            return
        }

        const data = {
            fullText: task,
            module: module!.value!._id
        }

        create(data)
    }

    const handleClose = () => {
        setModule({value: null, error: false})
        setTask('')
        dispatch(closeModuleTask())
    }

    return (
        <BaseModal
            title = {'Задание по модулю'}
            disabled = {isLoading}
            onClose = {handleClose}
            open = {moduleTaskOpen}
        >
            <Box
                mx = {5}
            >
                <Box
                    mb = {3}
                >
                    <Autocomplete
                        renderInput = {params =>
                            <TextField
                                {...params}
                                label = 'Выберите модуль'
                                variant = 'filled'
                                fullWidth
                                error = {module.error}
                            />
                        }
                        value = {module.value}
                        options = {modules as readonly IModule[]}
                        onChange = {handleChangeModule}
                        inputValue = {moduleInput}
                        onInputChange = {(e, newValue) => {
                            setModuleInput(newValue)
                        }}
                        getOptionLabel = {(option: any) => (option && option.title) || ''}
                        disabled = {isLoading}
                    />
                </Box>
                <Box
                    mb = {3}
                >
                    <Typography
                        color = 'text.primary'
                        variant = 'body1'
                        sx = {{
                            mb: 2,
                            maxWidth: 300
                        }}
                    >
                        Для того чтобы вставить слово в пропуск оберните его в //word// текст далее...
                    </Typography>
                    <TextField
                        label = 'Задание'
                        required
                        value = {task}
                        onChange = {handleChangeTask}
                        disabled = {isLoading}
                        multiline
                        minRows = {5}
                        fullWidth
                        sx = {{
                            maxWidth: 320
                        }}
                    />
                </Box>
                <Box
                    mb = {3}
                >
                    <LoadingButton
                        loading = {isLoading}
                        variant = 'outlined'
                        color = 'success'
                        endIcon = {<SaveIcon/>}
                        onClick = {handleSend}
                        fullWidth
                    >
                        Отравить
                    </LoadingButton>
                </Box>
            </Box>
        </BaseModal>
    )
}

export default ModuleTask
