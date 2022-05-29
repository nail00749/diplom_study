import React, {FC, useState, useEffect} from 'react'
import {IAnswer, IQuestion, ITest} from '../../models/ITest';
import BaseModal from "./BaseModal";
import {
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup, Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material";
import {noop} from "../../utils";
import {showErrorAlert} from "../../store/reducers/service/ServiceSlice";
import {useAppDispatch} from "../../hooks/redux";
import {LoadingButton} from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import {useSetMarkMutation} from "../../services/userTestResultAPI";

interface CheckingTestProps {
    open: boolean,
    resultUser: any,
    onClose: () => void
    test: ITest
}

const CheckingTest: FC<CheckingTestProps> = ({open, resultUser, onClose, test}) => {
    const [result, setResult] = useState(JSON.parse(resultUser.result))
    const dispatch = useAppDispatch()
    const [update, {isLoading, isSuccess}] = useSetMarkMutation()

    useEffect(() => {
        if (isSuccess) {
            onClose()
        }
    }, [isSuccess])

    const handleCheckAnswer = (question: IQuestion) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setResult((prev: any) => {
            const key = question.id
            prev[key].isCorrect = e.target.value
            return prev
        })
    }

    const setMark = () => {
        let mark = 0
        test.questions.forEach((question, i) => {
            let key = question.id
            if (question.is_extended) {
                if (result[key].isCorrect === undefined) {
                    dispatch(showErrorAlert(`Проверьте вопрос ${i + 1}`))
                    return
                }
                if (result[key].isCorrect) {
                    mark++
                }
            } else {
                if (question.is_multiple) {
                    const arr = question.answers.filter((a: IAnswer) => result[key].findIndex((r: number) => a.id === r) !== -1)
                    if (arr.every((a: IAnswer) => a.is_correct)) {
                        mark++
                    }
                } else {
                    const a = question.answers.find(a => a.id === result[key])
                    if (a && a.is_correct) {
                        mark++
                    }
                }
            }

        })
        const data = {
            resultId: resultUser._id,
            result: JSON.stringify(result),
            mark
        }
        update(data)

    }

    const renderQuestion = (question: IQuestion) => {
        if (question.is_extended) {
            return (
                <Box>
                    <TextField
                        multiline
                        maxRows = {5}
                        onChange = {noop}
                        value = {result[question!.id] && result[question!.id].text ? result[question!.id].text : ''}
                        disabled
                    />
                    <Box>
                        <FormControl>
                            <RadioGroup
                                row
                                onChange = {resultUser.mark !== -1 ? noop : handleCheckAnswer(question)}
                                value = {result[question!.id].isCorrect}
                            >
                                <FormControlLabel value = {'true'} control = {<Radio/>} label = {'Верно'}/>
                                <FormControlLabel value = {'false'} control = {<Radio/>} label = {'Неверно'}/>
                            </RadioGroup>
                        </FormControl>
                    </Box>
                </Box>
            )
        } else if (question.is_multiple) {
            return (
                <Box>
                    {
                        question.answers.map((answer) => {
                                const checked = !!(result && result[question!.id] && result[question!.id].findIndex((userResp: number) => userResp === answer.id) !== -1)
                                return (<FormGroup
                                    key = {answer.id}
                                >
                                    <FormControlLabel
                                        control = {
                                            <Checkbox
                                                onChange = {noop}
                                                checked = {checked}
                                                color = {checked && answer.is_correct ? 'success' : 'error'}
                                            />
                                        }
                                        label = {answer.text}
                                    />
                                </FormGroup>)
                            }
                        )
                    }
                </Box>
            )
        } else {
            return (
                <Box>
                    <FormControl>
                        {
                            <RadioGroup
                                value = {result[question!.id] ? +result[question!.id] : null}
                                onChange = {noop}
                            >
                                {question.answers.map((a) =>
                                    <FormControlLabel
                                        key = {a.id}
                                        value = {result[question.id] === a.id}
                                        control = {
                                            <Radio
                                                checked = {+result[question.id] === a.id}
                                                color = {(+result[question.id] === a.id && a.is_correct) ? 'success' : 'error'}
                                            />
                                        }
                                        label = {a.text}
                                    />
                                )}
                            </RadioGroup>
                        }
                    </FormControl>
                </Box>
            )
        }

    }

    return (
        <BaseModal
            open = {open}
            disabled = {false}
            onClose = {onClose}
            title = {`Тест ${resultUser.user.email}`}
        >
            <Box
                mx = {5}
            >
                {
                    test.questions.map((question) =>
                        <Box
                            key = {question.id}
                            mb = {2}
                        >
                            <Typography
                                color = 'text.primary'
                                mb = {1}
                            >
                                {question.text}
                            </Typography>
                            {renderQuestion(question)}
                        </Box>
                    )
                }
                <Box>
                    <LoadingButton
                        onClick = {setMark}
                        loading = {isLoading}
                        variant = 'outlined'
                        color = 'success'
                        endIcon = {<SendIcon/>}
                        disabled = {resultUser.mark !== -1}
                    >
                        Выставить оценку
                    </LoadingButton>
                </Box>
            </Box>
        </BaseModal>
    )
}

export default CheckingTest
