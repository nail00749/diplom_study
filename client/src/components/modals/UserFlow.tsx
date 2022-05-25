import React, {useState, useEffect} from 'react'
import {Transition} from "./Transition";
import {Autocomplete, Box, Dialog, IconButton, TextField, Typography, useMediaQuery,} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {ICourse} from "../../models/ICourse";
import {useGetAllCoursesQuery} from "../../services/courseAPI";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {closeUserFlow} from "../../store/reducers/modals/modalsSlice";
import {useCreateUserFlowMutation} from "../../services/userFlowAPI";
import {noop} from '../../utils'
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {MobileDatePicker} from '@mui/x-date-pickers/MobileDatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import SaveIcon from "@mui/icons-material/Save";
import {LoadingButton} from "@mui/lab";
import {useInput} from "../../hooks/useInput";
import {IUserFlow} from "../../models/IUserFlow";
import {IUser} from "../../models/IUser";
import {useGetAllUsersQuery} from "../../services/adminAPI";

const UserFlow = () => {
    const {data: courses} = useGetAllCoursesQuery()
    const {data: users} = useGetAllUsersQuery()
    const [teachers, setTeachers] = useState<IUser[]>([])
    const {userFlowOpen} = useAppSelector(state => state.modalsReducer)
    const [create, {isLoading, isSuccess}] = useCreateUserFlowMutation()
    const dispatch = useAppDispatch()
    const [courseInputValue, setCourseInputValue] = useState('');
    const name = useInput('')
    const [course, setCourse] = useState<{ value: ICourse | null, error: boolean }>({value: null, error: false})
    const [date, setDate] = useState<{ value: Date | null, error: boolean }>({value: new Date(), error: false})
    const matches = useMediaQuery('(max-width:600px)');
    const [teacher, setTeacher] = useState<{ value: IUser | null, error: boolean }>({value: null, error: false})
    const [teacherInputValue, setTeacherInputValue] = useState('');


    useEffect(() => {
        if (users && users.length) {
            setTeachers(users.filter(u => u.role === 'teacher'))
        }
    }, [users])

    useEffect(() => {
        if (isSuccess) {
            handleClose()
        }
    }, [isSuccess])

    const handleCourse = (e: any, newValue: ICourse | null) => setCourse({value: newValue, error: false})

    const handleClose = () => dispatch(closeUserFlow())

    const handleChangeDate = (newValue: Date | null) => setDate({...date, value: newValue})

    const handleTeacher = (e: any, newValue: IUser | null) => setTeacher({value: newValue, error: false})

    const handleSave = () => {
        let isError = false
        if (!name.value) {
            name.handleError(true)
            isError = true
        }
        if (!course.value) {
            setCourse({...course, error: true})
            isError = true
        }
        if (!teacher.value) {
            setTeacher({...teacher, error: true})
            isError = true
        }
        if (!date.value) {
            setDate({...date, error: true})
            isError = true
        }
        if (isError) {
            return
        }

        const data = {
            name: name.value,
            date: date.value!,
            course: course.value!._id!,
            teacher: teacher!.value!._id!,
        }
        create(data)
    }

    return (
        <Dialog
            open = {userFlowOpen}
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
                            ml: 3
                        }}
                    >
                        {`Create user flow`}
                    </Typography>
                </Box>
                <Box
                    mx = {5}
                >
                    <Box
                        mb = {3}
                    >
                        <TextField
                            label = 'Name'
                            variant = 'filled'
                            required
                            disabled = {isLoading}
                            {...name}
                            fullWidth
                        />
                    </Box>
                    <Box mb = {3}>
                        <Autocomplete
                            renderInput = {params =>
                                <TextField
                                    {...params}
                                    label = 'Course'
                                    variant = 'filled'
                                    required
                                    fullWidth
                                    error = {course.error}
                                />
                            }
                            value = {course.value}
                            options = {courses as readonly ICourse[]}
                            onChange = {handleCourse}
                            inputValue = {courseInputValue}
                            onInputChange = {(e, newValue) => {
                                setCourseInputValue(newValue)
                            }}
                            getOptionLabel = {(option: ICourse) => (option && option.title) || ''}
                            disabled = {isLoading}
                        />
                    </Box>
                    <Box mb = {3}>
                        <Autocomplete
                            renderInput = {params =>
                                <TextField
                                    {...params}
                                    label = 'Teacher'
                                    variant = 'filled'
                                    required
                                    fullWidth
                                    error = {teacher.error}
                                />
                            }
                            value = {teacher.value}
                            options = {teachers as readonly IUser[]}
                            onChange = {handleTeacher}
                            inputValue = {teacherInputValue}
                            onInputChange = {(e, newValue) => {
                                setTeacherInputValue(newValue)
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
                                        value = {date.value}
                                        onChange = {handleChangeDate}
                                        renderInput = {
                                            (params) =>
                                                <TextField
                                                    {...params}
                                                    error = {date.error}
                                                    disabled = {isLoading}
                                                />
                                        }
                                        inputFormat = {'d.MM.yy'}
                                    /> :
                                    <DesktopDatePicker
                                        value = {date.value}
                                        onChange = {handleChangeDate}
                                        renderInput = {
                                            (params) =>
                                                <TextField
                                                    {...params}
                                                    error = {date.error}
                                                    disabled = {isLoading}
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

export default UserFlow
