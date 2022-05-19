import React, {FC, ReactElement} from 'react'
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
import {IQuestion, ITest} from "../../models/ITest";


interface PassTestProps {
    open: boolean
    onClose: () => void
    test: ITest
}

const PassTest: FC<PassTestProps> = ({open, onClose, test}) => {

    const renderAnswers = (question: IQuestion, i: number): ReactElement | null => {
        if (question.is_extended) {
            return (
                <TextField
                    multiline
                    maxRows = {5}
                />
            )
        } else if (question.is_multiple) {
            return (
                <Box>
                    {
                        question.answers.map((a, j) =>
                            <FormGroup
                                key = {a.id}
                            >
                                <FormControlLabel control = {<Checkbox/>} label = {a.text}/>
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
                            <RadioGroup>
                                {question.answers.map((a, j) =>
                                    <FormControlLabel
                                        key = {a.id}
                                        value = {a.text}
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
        >
            <Box
                p = {3}
                px = {5}
            >
                <Box
                    sx = {{
                        display: 'flex',
                        alignItems: 'center'
                    }}
                    mb = {2}
                >
                    <IconButton
                        onClick = {onClose}
                        //disabled = {isLoadingCreate || isLoadingUpdate}
                    >
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant = 'h5' component = 'span'>
                        {`Test pass`}
                    </Typography>
                </Box>
                <Box mb = {4}>
                    <Typography>
                        {test.description}
                    </Typography>
                </Box>
                <Box>
                    {
                        test.questions.map((q, i) =>
                            <Box
                                key={q.id}
                                mb = {2}
                                border = {'1px solid'}
                            >
                                <Typography>{q.text}</Typography>
                                {renderAnswers(q, i)}
                            </Box>
                        )
                    }
                </Box>

                <LoadingButton
                    //loading = {isLoadingCreate || isLoadingUpdate}
                    variant = 'outlined'
                    color = 'success'
                    endIcon = {<SendIcon/>}
                    //onClick = {saveCourse}
                >
                    Send
                </LoadingButton>
            </Box>
        </Dialog>
    )
}

export default PassTest
