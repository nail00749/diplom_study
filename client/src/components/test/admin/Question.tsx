import React, {FC} from 'react'
import {Box, Button, Checkbox, FormControlLabel, FormGroup, IconButton, TextField} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
    deleteQuestion,
    textQuestion,
    extensionChange,
    multipleChange,
    addAnswer
} from "../../../store/reducers/admin/testSlice";
import {useAppDispatch} from "../../../hooks/redux";
import {IQuestion} from "../../../models/ITest";
import Answer from "./Answer";


interface QuestionProps {
    index: number,
    value: IQuestion
}

const Question: FC<QuestionProps> = ({index, value}) => {
    const dispatch = useAppDispatch()

    const handlerText = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(textQuestion({
        index,
        text: e.target.value
    }))

    const handlerDelete = () => dispatch(deleteQuestion(index))

    const handlerExtension = () => dispatch(extensionChange(index))

    const handlerMultiple = () => dispatch(multipleChange(index))

    const handlerAddAnswer = () => dispatch(addAnswer(index))

    return (
        <Box
            mb = {2}
            border = {'1px solid'}
            p = {1}
        >
            <Box
                sx = {{
                    display: 'flex',
                    alignItems: 'center',
                }}
                mb = {1}
            >
                <TextField
                    label = {'Текст вопроса'}
                    onChange = {handlerText}
                    value = {value.text}
                />
                <Box
                    component = 'span'
                    p = {1}
                >
                    <FormGroup>
                        <FormControlLabel
                            disabled = {value.is_multiple  || Boolean((value.answers && value.answers.length))}
                            control = {
                                <Checkbox
                                    checked={value.is_extended}
                                    value = {value.is_extended}
                                    onChange = {handlerExtension}
                                />
                            }
                            label = 'Расширенный'
                        />
                        <FormControlLabel
                            disabled = {value.is_extended}
                            control = {
                                <Checkbox
                                    checked = {value.is_multiple}
                                    value = {value.is_multiple}
                                    onChange = {handlerMultiple}
                                />
                            }
                            label = 'С неск. ответами'
                        />
                    </FormGroup>
                </Box>
                <IconButton
                    onClick = {handlerDelete}
                    color = 'error'
                >
                    <CloseIcon/>
                </IconButton>
            </Box>
            <Box>
                {
                    value.answers && value.answers.length ?
                        value.answers.map((answer, i) => (
                            <Answer
                                key = {answer.id}
                                value = {answer}
                                indexQuestion = {index}
                                indexAnswer = {i}
                            />)) : null
                }
                <Button
                    disabled = {value.is_extended}
                    variant = 'outlined'
                    onClick = {handlerAddAnswer}
                >
                    Добавить ответ
                </Button>
            </Box>
        </Box>
    )
}

export default Question
