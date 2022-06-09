import React, {FC, useState, useEffect} from 'react'
import BaseModal from "./BaseModal";
import {Box, FormControl, Grid, MenuItem, Select, TextField, Typography} from "@mui/material";
import {IModuleTask} from "../../models/IModuleTask";
import SaveIcon from "@mui/icons-material/Save";
import {LoadingButton} from "@mui/lab";
import {ICourse} from "../../models/ICourse";
import {SelectChangeEvent} from "@mui/material/Select";
import {useAppDispatch} from "../../hooks/redux";
import {showErrorAlert} from "../../store/reducers/service/ServiceSlice";
import {usePassModuleTaskMutation} from "../../services/moduleTaskAPI";
import {useGetMyResultFlowQuery} from "../../services/userFlowAPI";
import {shuffleArray} from "../../utils";
import {IModuleTaskResult} from "../../models/IModuleTaskResult";

interface PassModuleTaskProps {
    open: boolean
    task: IModuleTask
    onClose: () => void
    flowId: string
    result?: IModuleTaskResult
}

const PassModuleTask: FC<PassModuleTaskProps> = ({task, open, onClose, flowId, result}) => {
    const [response, setResponse] = useState<string[]>(result && result.response || Array(task.leftWordArr.length).fill(''))
    const [leftWords] = useState(shuffleArray(task.leftWordArr))
    const dispatch = useAppDispatch()
    const {data: myResultFlow} = useGetMyResultFlowQuery(String(flowId))
    const [create, {isLoading, isSuccess}] = usePassModuleTaskMutation()

    useEffect(() => {
        if (isSuccess) {
            onClose()
        }
    }, [isSuccess])

    const handleChange = (i: number) => (e: SelectChangeEvent) => {
        setResponse(prev => Object.assign([], prev, {[i]: e.target.value}))
    }

    const sendTask = () => {
        let isError = false
        response.forEach((word) => {
            if (!word) {
                isError = true
                dispatch(showErrorAlert('Заполните все поля'))
                return
            }
        })
        if (isError) {
            return
        }
        const data = {
            id: String(myResultFlow!._id),
            body: {
                response,
                taskId: task._id
            }
        }
        create(data)
    }

    const render = () => {
        let counter = -1
        return task.fullText.split('//').map((str, i) => {
            if (i % 2 === 0) {
                return (
                    <Box
                        key={str+i}
                        sx = {{
                            display: 'inline',
                        }}
                    >
                        {str}
                    </Box>
                )
            } else if (!result) {
                counter++
                return (
                    <FormControl
                        size = 'small'
                        sx = {{
                            minWidth: 50,
                            m: 1
                        }}
                        key={str+i}
                    >
                        <Select
                            sx = {{
                                display: 'inline',
                            }}
                            value = {response[counter]}
                            onChange = {handleChange(counter)}
                            disabled = {Boolean(result) || isLoading}
                        >
                            {
                                leftWords.map((word, j) =>
                                    <MenuItem
                                        key = {j}
                                        value = {word}
                                    >
                                        {word}
                                    </MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                )
            } else {
                counter++
                return (
                    <Typography
                        key={str+i}
                        variant='subtitle1'
                        sx={{
                            display: 'inline',
                            mx: 1,
                            color: response[counter] === task.leftWordArr[counter] ? 'success.dark' : 'error.dark'
                        }}

                    >
                        {response[counter]}
                    </Typography>
                )
            }
        })
    }

    return (
        <BaseModal
            title = 'Задание по модулю'
            open = {open}
            disabled = {false}
            onClose = {onClose}
        >
            <Box
                sx = {{
                    maxWidth: 320,
                    mx: 5
                }}
            >
                <Grid
                    container
                    justifyContent = 'flexStart'
                    alignItems = 'center'
                    mb = {3}
                >
                    {render()}
                </Grid>
                <Grid
                    container
                    justifyContent = 'center'
                    mb = {3}
                >
                    {result ?
                        <Typography
                            color = 'text.primary'
                            variant = 'body1'
                        >
                            {`Ваша балл: ${result.mark} из ${task.leftWordArr.length}`}
                        </Typography> :
                        <LoadingButton
                            loading = {isLoading}
                            variant = 'outlined'
                            color = 'success'
                            endIcon = {<SaveIcon/>}
                            onClick = {sendTask}
                        >
                            Отправить
                        </LoadingButton>}
                </Grid>
            </Box>
        </BaseModal>
    )
}

export default PassModuleTask
