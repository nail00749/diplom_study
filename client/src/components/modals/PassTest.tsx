import React, {FC, ReactElement, useState, useEffect} from 'react'
import {Transition} from "./Transition";
import {
    Box,
    Checkbox,
    Dialog, FormControl,
    FormControlLabel,
    FormGroup,
    IconButton, Radio, RadioGroup,
    TextField,
    Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {LoadingButton} from "@mui/lab";
import SendIcon from '@mui/icons-material/Send';
import {IAnswer, IQuestion, ITest} from "../../models/ITest";
import {usePassTestMutation} from "../../services/userTestResultAPI";
import {IUserSubmission} from "../../models/IUserSubmission";
import {useAppDispatch} from "../../hooks/redux";
import {showErrorAlert} from "../../store/reducers/service/ServiceSlice";


interface PassTestProps {
    open: boolean
    onClose: () => void
    test: ITest
}


const PassTest: FC<PassTestProps> = ({open, onClose, test}) => {
    const [state, setState] = useState<any>({})
    const [create, {isLoading, isSuccess}] = usePassTestMutation()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isSuccess) {
            onClose()
        }
    }, [isSuccess]);

    const handleChangeSubmission = (question: IQuestion, answer: IAnswer | null = null) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setState((prev: any) => {
            if (question.id) {
                let key = question.id.toString()
                if (question.is_extended || !question.is_multiple) {
                    prev[key] = e.target.value

                } else if (answer) {
                    if (prev[key] && Array.isArray(prev[key])) {
                        if (prev[key].includes(answer.id)) {
                            let i = prev[key].indexOf(answer.id)
                            prev[key].splice(i, 1)
                        } else {
                            prev[key].push(answer.id)
                        }
                    } else {
                        prev[key] = []
                        prev[key].push(answer.id)
                    }
                }
            }
            return {...prev}
        })
    }

    const sendTest = () => {
        //todo fix checkbox value checked
        let mark = 0
        let isError = false
        let errorStr = ''
        let isExtendedTest = test.questions.some(q => q.is_extended)

        test.questions.forEach((q, i) => {
            const id = q!.id
            //check all responses not empty
            if (id && (!state[id] || (Array.isArray(state[id]) && !state[id].length))) {
                isError = true
                errorStr += `На вопрос ${i + 1} нет ответа \n`
            }
            if (isError) {
                dispatch(showErrorAlert(errorStr))
                return
            }

            //calc result
            if (!q.is_extended && id) {
                const response = state[id]
                if (q.is_multiple) {
                    response.forEach((r: number) => {
                        const a = q.answers.find(a => a.id === r)
                        if (a && a.is_correct) {
                            mark++
                        }
                    })
                } else {
                    const a = q.answers.find(a => a.id === response)
                    if (a && a.is_correct) {
                        mark++
                    }
                }
            }
        })


        const data = {
            test: test._id,
            result: JSON.stringify(state),
            mark: isExtendedTest ? -1 : mark
        }

        create(data)
    }

    const renderAnswers = (question: IQuestion): ReactElement | null => {
        if (question.is_extended) {
            return (
                <TextField
                    multiline
                    maxRows = {5}
                    onChange = {handleChangeSubmission(question)}
                    value = {state[question!.id] ? state[question!.id] : ''}
                />
            )
        } else if (question.is_multiple) {
            return (
                <Box>
                    {
                        question.answers.map((answer) =>
                            <FormGroup
                                key = {answer.id}
                            >
                                <FormControlLabel
                                    control = {
                                        <Checkbox
                                            onChange = {handleChangeSubmission(question, answer)}
                                            checked = {!!(state && state[question!.id] && state[question!.id].findIndex((userResp: number) => userResp === answer.id) !== -1)}
                                        />
                                    }
                                    label = {answer.text}
                                />
                            </FormGroup>
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
                                //todo add value
                                value = {state[question!.id] ? +state[question!.id] : null}
                                onChange = {handleChangeSubmission(question)}
                            >
                                {question.answers.map((a) =>
                                    <FormControlLabel
                                        key = {a.id}
                                        value = {a.id}
                                        control = {<Radio/>}
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
        <Dialog
            open = {open}
            TransitionComponent = {Transition}
            onClose = {onClose}
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
                        onClick = {onClose}
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
                            ml: 2,
                            mr: 3,
                        }}
                    >
                        {`Сдача теста`}
                    </Typography>
                </Box>
                <Box mx = {5}>
                    <Box mb = {4}>
                        <Typography>
                            {test.description}
                        </Typography>
                    </Box>
                    <Box>
                        {
                            test.questions.map((q, index) =>
                                <Box
                                    key = {q.id}
                                    mb = {2}
                                    border = {'1px solid'}
                                    p = {2}
                                >
                                    <Typography mb = {1}>{`Вопрос ${index + 1}. ${q.text}`}</Typography>
                                    {renderAnswers(q)}
                                </Box>
                            )
                        }
                    </Box>
                    <Box
                        sx = {{
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <LoadingButton
                            loading = {isLoading}
                            variant = 'outlined'
                            color = 'success'
                            endIcon = {<SendIcon/>}
                            onClick = {sendTest}
                        >
                            Send
                        </LoadingButton>
                    </Box>
                </Box>
            </Box>
        </Dialog>
    )
}

export default PassTest

