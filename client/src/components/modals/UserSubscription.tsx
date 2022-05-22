import React, {useState, useEffect} from 'react'
import {Transition} from "./Transition";
import {Autocomplete, Box, Dialog, IconButton, TextField, Typography, useMediaQuery,} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {closeUserSubscription} from "../../store/reducers/modals/modalsSlice";
import {noop} from '../../utils/index'
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {MobileDatePicker} from '@mui/x-date-pickers/MobileDatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import SaveIcon from "@mui/icons-material/Save";
import {LoadingButton} from "@mui/lab";
import {IUserFlow} from "../../models/IUserFlow";
import {useCreateUserSubscriptionMutation} from "../../services/userSubscriptionAPI";
import {IUser} from "../../models/IUser";
import {useGetAllUsersQuery} from "../../services/adminAPI";
import {useGetAllUserFlowQuery} from "../../services/userFlowAPI";

const UserSubscription = () => {
    const {userSubscriptionOpen} = useAppSelector(state => state.modalReducer)
    const dispatch = useAppDispatch()
    const {data: flows} = useGetAllUserFlowQuery()
    const {data: users} = useGetAllUsersQuery()
    const [create, {isLoading, isSuccess}] = useCreateUserSubscriptionMutation()
    const [students, setStudents] = useState<IUser[]>([])


    const [courseInputValue, setCourseInputValue] = useState('');
    const [studentInputValue, setStudentInputValue] = useState('');

    const [flow, setFlow] = useState<{ value: IUserFlow | null, error: boolean }>({value: null, error: false})
    const [student, setStudent] = useState<{ value: IUser | null, error: boolean }>({value: null, error: false})

    const [startDate, setStartDate] = useState<{ value: Date | null, error: boolean }>({
        value: new Date(),
        error: false
    })
    const [endDate, setEndDate] = useState<{ value: Date | null, error: boolean }>({value: new Date(), error: false})
    const matches = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        if (users && users.length) {
            setStudents(users.filter(u => u.role === 'user'))
        }
    }, [users])

    useEffect(() => {
        if (isSuccess) {
            handleClose()
        }
    }, [isSuccess])

    const handleCourse = (e: any, newValue: IUserFlow | null) => setFlow({value: newValue, error: false})
    const handleStudent = (e: any, newValue: IUser | null) => setStudent({value: newValue, error: false})


    const handleClose = () => dispatch(closeUserSubscription())

    const handleChangeStartDate = (newValue: Date | null) => setStartDate({...startDate, value: newValue})

    const handleChangeEndDate = (newValue: Date | null) => setEndDate({...startDate, value: newValue})

    const handleSave = () => {
        let isError = false

        if (!flow.value) {
            setFlow({...flow, error: true})
            isError = true
        }
        if (!startDate.value) {
            setStartDate({...startDate, error: true})
            isError = true
        }
        if (!endDate.value) {
            setEndDate({...endDate, error: true})
            isError = true
        }
        if (!student.value) {
            setStudent({...student, error: true})
            isError = true
        }

        if (startDate!.value! > endDate!.value!) {
            setStartDate({...startDate, error: true})
            setEndDate({...endDate, error: true})
            isError = true
        }
        if (isError) {
            return
        }

        const data = {
            flow: flow!.value!._id,
            student: student!.value!._id,
            start_date: startDate!.value,
            end_date: endDate!.value
        }
        create(data)
    }

    return (
        <Dialog
            open = {userSubscriptionOpen}
            TransitionComponent = {Transition}
            onClose = {isLoading ? noop : handleClose}
            sx = {{
                borderRadius: 3
            }}
        >
            <Box
                sx = {{
                    display: 'flex',
                    flexDirection: 'column',
                    pb: 2,
                }}
            >
                <Box
                    sx = {{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: 'grey.800',
                        mb: 3,
                        py: 2
                    }}
                >
                    <IconButton
                        onClick = {handleClose}
                        disabled = {isLoading}
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
                            ml: 3,
                            mr: 5
                        }}
                    >
                        {`Create Subscription`}
                    </Typography>
                </Box>
                <Box
                    mx = {5}
                >
                    <Box mb = {3}>
                        <Autocomplete
                            renderInput = {params =>
                                <TextField
                                    {...params}
                                    label = 'Flow'
                                    variant = 'filled'
                                    required
                                    fullWidth
                                    error = {flow.error}
                                />
                            }
                            value = {flow.value}
                            options = {flows as readonly IUserFlow[]}
                            onChange = {handleCourse}
                            inputValue = {courseInputValue}
                            onInputChange = {(e, newValue) => {
                                setCourseInputValue(newValue)
                            }}
                            getOptionLabel = {(option: IUserFlow) => (option && option.name) || ''}
                            disabled = {isLoading}
                        />
                    </Box>
                    <Box mb = {3}>
                        <Autocomplete
                            renderInput = {params =>
                                <TextField
                                    {...params}
                                    label = 'Student'
                                    variant = 'filled'
                                    required
                                    fullWidth
                                    error = {student.error}
                                />
                            }
                            value = {student.value}
                            options = {students as readonly IUser[]}
                            onChange = {handleStudent}
                            inputValue = {studentInputValue}
                            onInputChange = {(e, newValue) => {
                                setStudentInputValue(newValue)
                            }}
                            getOptionLabel = {(option: IUser) => (option && option.email) || ''}
                            disabled = {isLoading}
                        />
                    </Box>
                    <Box mb = {3}>
                        <LocalizationProvider dateAdapter = {AdapterDateFns}>
                            {
                                matches ?
                                    <MobileDatePicker
                                        value = {startDate.value}
                                        onChange = {handleChangeStartDate}
                                        renderInput = {
                                            (params) =>
                                                <TextField
                                                    label = 'Start date'
                                                    {...params}
                                                    error = {startDate.error}
                                                    disabled = {isLoading}
                                                    variant = 'filled'
                                                />
                                        }
                                        inputFormat = {'d.MM.yy'}
                                    /> :
                                    <DesktopDatePicker
                                        value = {startDate.value}
                                        onChange = {handleChangeStartDate}
                                        renderInput = {
                                            (params) =>
                                                <TextField
                                                    {...params}
                                                    label = 'Start date'
                                                    error = {startDate.error}
                                                    disabled = {isLoading}
                                                    variant = 'filled'
                                                />
                                        }
                                        inputFormat = {'d.MM.yy'}
                                    />
                            }
                        </LocalizationProvider>
                    </Box>
                    <Box mb = {3}>
                        <LocalizationProvider dateAdapter = {AdapterDateFns}>
                            {
                                matches ?
                                    <MobileDatePicker
                                        value = {endDate.value}
                                        onChange = {handleChangeEndDate}
                                        renderInput = {
                                            (params) =>
                                                <TextField
                                                    {...params}
                                                    label = 'End date'
                                                    error = {endDate.error}
                                                    disabled = {isLoading}
                                                    variant = 'filled'
                                                />
                                        }
                                        inputFormat = {'d.MM.yy'}
                                    /> :
                                    <DesktopDatePicker
                                        value = {endDate.value}
                                        onChange = {handleChangeEndDate}
                                        renderInput = {
                                            (params) =>
                                                <TextField
                                                    {...params}
                                                    label = 'End date'
                                                    error = {endDate.error}
                                                    disabled = {isLoading}
                                                    variant = 'filled'
                                                />
                                        }
                                        inputFormat = {'d.MM.yy'}
                                    />
                            }
                        </LocalizationProvider>
                    </Box>
                </Box>
                <Box mx = {'auto'}>
                    <LoadingButton
                        loading = {isLoading}
                        variant = 'outlined'
                        color = 'success'
                        endIcon = {<SaveIcon/>}
                        onClick = {handleSave}
                    >
                        Save
                    </LoadingButton>
                </Box>

            </Box>
        </Dialog>
    )
}

export default UserSubscription
