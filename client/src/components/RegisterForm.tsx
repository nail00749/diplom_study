import React, {FC, useEffect, useState} from 'react';
import {Box, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput,} from "@mui/material";
import {AccountCircle, Visibility, VisibilityOff} from '@mui/icons-material';
import {useRegisterMutation} from "../services/userAPI";
import LoadingButton from "@mui/lab/LoadingButton";
import RegisterSuccess from "./modals/RegisterSuccess";
import {validateEmail} from "../utils";
import {showErrorAlert} from "../store/reducers/service/ServiceSlice";
import {useAppDispatch} from "../hooks/redux";


interface FormProps {
    setIsLogin: () => void
}

const RegisterForm: FC<FormProps> = ({setIsLogin}) => {
    const [username, setUsername] = useState<string>('');
    const [usernameError, setUsernameError] = useState(false);
    const [password, setPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);
    const dispatch = useAppDispatch()

    const [register, {isLoading, isSuccess}] = useRegisterMutation()

    useEffect(() => {
        if (isSuccess) {
            setIsOpenSuccess(true)
        }

    }, [isSuccess]);


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
        await register(data)
    }

    const handlerShowPassword = () => {
        setShowPassword(prev => !prev)
    }

    const handlerMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

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
                        error = {usernameError}
                        disabled={isLoading}
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
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                        label = "Password"
                        error = {passwordError}
                        disabled={isLoading}
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
                    variant = {'contained'}
                    type = 'submit'
                  >
                      Register
                  </LoadingButton>
              </Box>
          </form>

          <RegisterSuccess
            open = {isOpenSuccess}
            setClose = {setIsOpenSuccess}
            setPageLogin = {setIsLogin}
          />
      </>
    );
};

export default RegisterForm;
