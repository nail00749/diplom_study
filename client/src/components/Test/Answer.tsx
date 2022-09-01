import React, {FC} from 'react'
import {Box, Checkbox, FormControlLabel, IconButton, TextField} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {IAnswer} from "../../models/ITest";
import {useAppDispatch} from "../../hooks/redux";
import {correctAnswer, deleteAnswer, textAnswer} from "../../store/reducers/admin/testSlice";

interface AnswerProps {
    indexQuestion: number,
    value: IAnswer,
    indexAnswer: number
}

const Answer: FC<AnswerProps> = ({indexQuestion, value, indexAnswer}) => {
    const dispatch = useAppDispatch()

    const handlerDelete = () => dispatch(deleteAnswer({indexQuestion, indexAnswer}))

    const handlerText = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(textAnswer({
        indexQuestion,
        indexAnswer,
        value: e.target.value
    }))

    const handlerCorrect = () => dispatch(correctAnswer({indexQuestion, indexAnswer}))

    return (
        <Box
            mb = {1}
        >
            <TextField
                label = 'Текст ответа'
                value = {value.text}
                onChange = {handlerText}
            />
            <Box
                component = 'span'
                p = {1}
            >
                <FormControlLabel
                    control = {
                        <Checkbox
                            checked = {value.is_correct}
                            value = {value.is_correct}
                            onChange = {handlerCorrect}
                        />
                    }
                    label = 'Верный'
                />
            </Box>
            <IconButton
                onClick = {handlerDelete}
                color = 'error'
            >
                <CloseIcon/>
            </IconButton>
        </Box>
    )
}

export default React.memo(Answer)
