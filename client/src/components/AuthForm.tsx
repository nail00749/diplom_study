import React, {FC, useState} from 'react';
import {
    Box,
    Button,
    InputAdornment,
    FormControl,
    OutlinedInput,
    IconButton,
    InputLabel, Checkbox, FormControlLabel, FormGroup,
} from "@mui/material";
import {AccountCircle, VisibilityOff, Visibility} from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import {useLoginMutation} from "../services/userAPI";
import {validateEmail} from "../utils";
import {showErrorAlert} from "../store/reducers/service/ServiceSlice";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {setSaveSession} from "../store/reducers/user/UserSlice";

type FormProps = {
    setIsLogin: () => void
}

const AuthForm: FC<FormProps> = ({setIsLogin}) => {
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


        const data = new FormData()
        data.append('username', username)
        data.append('password', password)
        await login(data)
    }

    const handlerShowPassword = () => {
        setShowPassword(prev => !prev)
    }

    const handlerMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    const handlerSaveSession = () => dispatch(setSaveSession())

    return (
        <>
            <form
                onSubmit = {sendData}
            >
                <Box
                    mt = {3}
                    mb = {3}
                >
                    <FormControl>
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
                </Box>
                <Box>
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
                    mt = {3}
                    mb = {1}
                    display = 'flex'
                    justifyContent = 'center'
                >
                    <LoadingButton
                        loading = {isLoading}
                        type = 'submit'
                        variant = 'contained'
                    >
                        Authorize
                    </LoadingButton>
                    <FormGroup
                        sx = {{
                            ml: 3
                        }}
                    >
                        <FormControlLabel
                            control = {
                                <Checkbox
                                    checked = {saveSession}
                                    onChange = {handlerSaveSession}
                                />
                            }
                            label = {'Save'}
                        />
                    </FormGroup>
                </Box>
            </form>
            <Box
                display = 'flex'
                justifyContent = 'center'
            >
                <Button
                    onClick = {() => {
                        setIsLogin()
                    }}
                    variant = 'outlined'
                    disabled = {isLoading}
                >
                    {'Sign up'}
                </Button>
            </Box>
        </>

    );
};

export default AuthForm;
