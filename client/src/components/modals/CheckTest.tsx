import React, {FC, ReactElement, useEffect, useState} from 'react'
import {IAnswer, IQuestion, ITest} from "../../models/ITest";
import {usePassTestMutation} from "../../services/userTestResultAPI";
import {useAppDispatch} from "../../hooks/redux";
import {showErrorAlert} from "../../store/reducers/service/ServiceSlice";
import {
    Box,
    Checkbox,
    Dialog,
    FormControl,
    FormControlLabel,
    FormGroup, IconButton,
    Radio,
    RadioGroup,
    TextField, Typography
} from "@mui/material";
import {Transition} from "./Transition";
import CloseIcon from "@mui/icons-material/Close";
import {LoadingButton} from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import {noop} from "../../utils";

interface CheckTestProps {
    open: boolean
    onClose: () => void
    test: ITest,
    testResult: any
}

const CheckTest: FC<CheckTestProps> = ({open, onClose, test, testResult}) => {
    const [result] = useState<any>(JSON.parse(testResult.result))

    const renderAnswers = (question: IQuestion): ReactElement | null => {
        if (question.is_extended) {
            return (
                <TextField
                    multiline
                    maxRows = {5}
                    onChange = {noop}
                    value = {result[question!.id] ? result[question!.id] : ''}
                    disabled
                />
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
                        {`Результаты теста`}
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
                </Box>
            </Box>
        </Dialog>
    )
}

export default CheckTest
