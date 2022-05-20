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
import {usePassTestMutation} from "../../services/userSubmissionAPI";
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
                return
            }

            //calc result
            if (!q.is_extended && id) {
                const response = state[id]
                if (q.is_multiple) {
                    const arrResponse: number[] = response.split(' ').map((r: string) => +r)
                    arrResponse.forEach(r => {
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

        if (isError) {
            dispatch(showErrorAlert(errorStr))
            return
        }


        const data = {
            id: test._id,
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
                value = {question.id && state[question!.id] ? state[question!.id] : ''}
              />
            )
        } else if (question.is_multiple) {
            return (
              <Box>
                  {
                      question.answers.map((a) =>
                        <FormGroup
                          key = {a.id}
                        >
                            <FormControlLabel
                              control = {
                                  <Checkbox
                                    onChange = {handleChangeSubmission(question, a)}
                                    checked = {question.id && a.id && state[question!.id] ? state[question!.id] === +a.id : false}
                                  />
                              }
                              label = {a.text}
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
                            value = {question.id && state[question!.id] ? +state[question!.id] : null}
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
                      test.questions.map((q) =>
                        <Box
                          key = {q.id}
                          mb = {2}
                          border = {'1px solid'}
                        >
                            <Typography>{q.text}</Typography>
                            {renderAnswers(q)}
                        </Box>
                      )
                  }
              </Box>

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
      </Dialog>
    )
}

export default PassTest
