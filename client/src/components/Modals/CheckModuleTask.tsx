import React, {FC} from 'react'
import BaseModal from "./BaseModal";
import {IModuleTask} from "../../models/IModuleTask";
import {Box, Typography} from "@mui/material";
import {IModuleTaskResult} from "../../models/IModuleTaskResult";

interface CheckModuleTaskProps {
    open: boolean
    onClose: () => void
    task: IModuleTask
    response: IModuleTaskResult
}

const CheckModuleTask: FC<CheckModuleTaskProps> = ({open, onClose, task, response: {response, mark}}) => {

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
            } else {
                counter++
                return (
                    <Typography
                        key={str+i}
                        variant = 'subtitle1'
                        sx = {{
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
            open = {open}
            disabled = {false}
            title = 'Проверка задания по модулю'
            onClose = {onClose}
        >
            <Box
                sx = {{
                    maxWidth: 320,
                    mx: 5
                }}
            >
                {render()}
                <Typography
                    color = 'text.primary'
                    my = {2}
                >
                    {`Баллов ${mark} из ${task.leftWordArr.length}`}
                </Typography>
            </Box>
        </BaseModal>
    )
}

export default CheckModuleTask
