import {Grid, Typography, Box} from '@mui/material';
import React, {FC, useState} from 'react';
import AuthForm from "../components/AuthForm";
import RegisterForm from "../components/RegisterForm";


const Login: FC = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true);

    const handlerForm = () => {
        setIsLogin(prev => !prev)
    }

    return (
        <Grid
            container
            spacing = {0}
            direction = "column"
            alignItems = "center"
            justifyContent = "center"
            style = {{minHeight: '100vh'}}
        >
            <Box
                mb = {1}
                p = {4}
                sx = {{border: 2, borderRadius: 8}}
            >
                <Typography
                    variant = "h3"
                    align = 'center'
                >
                    {isLogin ? 'Login' : 'Register'}
                </Typography>
                {
                    isLogin ?
                        <AuthForm
                            setIsLogin = {handlerForm}
                        /> :
                        <RegisterForm
                            setIsLogin = {handlerForm}
                        />
                }
            </Box>
        </Grid>
    );
};

export default Login;
