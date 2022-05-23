import React, {FC, useState} from 'react';
import {
    Box,
    InputAdornment,
    FormControl,
    OutlinedInput,
    IconButton,
    InputLabel, Checkbox, FormControlLabel, FormGroup, Button,
} from "@mui/material";
import {AccountCircle, VisibilityOff, Visibility} from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import {useLoginMutation} from "../services/userAPI";
import {validateEmail} from "../utils";
import {showErrorAlert} from "../store/reducers/service/ServiceSlice";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {setSaveSession} from "../store/reducers/user/UserSlice";

interface AuthFormProps {
    setIsLogin: () => void
}

const AuthForm: FC<AuthFormProps> = ({setIsLogin}) => {
    const [username, setUsername] = useState<string>('');
    const [usernameError, setUsernameError] = useState(false);
    const [password, setPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [login, {isLoading}] = useLoginMutation()
    const dispatch = useAppDispatch()
    const {saveSession} = useAppSelector(state => state.userReducer)

    const handlerLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        setUsernameError(false)
    }

    const handlerPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        setPasswordError(false)
    }

    const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let error = ''
        if (!validateEmail(username)) {
            setUsernameError(true)
            error += 'not valid email'
        }
        //todo password check
        if (!password) {
            setPasswordError(true)
            error += ' length password error'
        }
        if (error) {
            dispatch(showErrorAlert(error))
            return
        }

        const data = {
            email: username,
            password
        }
        await login(data)
    }

    const handlerShowPassword = () => {
        setShowPassword(prev => !prev)
    }

    const handlerMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    const handlerSaveSession = () => dispatch(setSaveSession())

    //todo add password recover

    return (
        <>
            <form
                onSubmit = {sendData}
            >
                <Box

                    sx = {{
                        my: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}

                >
                    <FormControl
                        sx = {{
                            mb: 2
                        }}
                    >
                        <InputLabel htmlFor = "outlined-adornment-email">Email</InputLabel>
                        <OutlinedInput
                            id = "outlined-adornment-email"
                            type = {'text'}
                            value = {username}
                            onChange = {handlerLogin}
                            endAdornment = {
                                <InputAdornment
                                    position = "end"
                                    sx = {{
                                        marginLeft: '13px'
                                    }}
                                >
                                    <AccountCircle/>
                                </InputAdornment>
                            }
                            label = "email"
                            autoComplete = {'username'}
                            error = {usernameError}
                            disabled = {isLoading}
                        />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor = "outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id = "outlined-adornment-password"
                            type = {showPassword ? 'text' : 'password'}
                            value = {password}
                            onChange = {handlerPassword}
                            endAdornment = {
                                <InputAdornment position = "end">
                                    <IconButton
                                        aria-label = "toggle password visibility"
                                        onClick = {handlerShowPassword}
                                        onMouseDown = {handlerMouseDown}
                                        edge = "end"
                                        disabled = {isLoading}
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label = "Password"
                            autoComplete = {'current-password'}
                            error = {passwordError}
                            disabled = {isLoading}
                        />
                    </FormControl>
                </Box>
                <Box
                    my = {2}
                    display = 'flex'
                    justifyContent = 'center'
                    alignItems = 'center'
                >
                    <FormGroup>
                        <FormControlLabel
                            control = {
                                <Checkbox
                                    checked = {saveSession}
                                    onChange = {handlerSaveSession}
                                    size = 'small'
                                />
                            }
                            label = {'Запомнить'}
                        />
                    </FormGroup>
                    <Button>Забыли пароль?</Button>
                </Box>
                <Box>
                    <LoadingButton
                        loading = {isLoading}
                        type = 'submit'
                        variant = 'contained'
                        fullWidth
                    >
                        Войти
                    </LoadingButton>
                </Box>
                <Box
                    display = 'flex'
                    justifyContent = 'center'
                    my = {2}
                >
                    <Button
                        onClick = {setIsLogin}
                    >
                        {'Нет аккаунта?'}
                    </Button>
                </Box>
            </form>

        </>

    );
};

export default AuthForm;
