import {Grid, Typography, Box, Button} from '@mui/material';
import React, {FC, useState} from 'react';
import AuthForm from "../components/AuthForm";
import RegisterForm from "../components/RegisterForm";
import {useParams} from "react-router-dom";
import SchoolIcon from '@mui/icons-material/School';


const Login: FC = () => {
    const {registerId} = useParams()
    const [isLogin, setIsLogin] = useState<boolean>(!Boolean(registerId));

    const handlerForm = () => {
        setIsLogin(prev => !prev)
    }

    return (
        <Grid
            container
            spacing = {1}
            direction = "column"
            alignItems = "center"
            justifyContent = "center"
            sx = {{
                minHeight: '100vh',
                p: 3
            }}
        >
            <SchoolIcon
                color = 'primary'
                fontSize = 'large'
            />
            <Box
                mb = {1}
                p = {2}
            >
                <Typography
                    variant = "h4"
                    align = 'center'
                    color = 'text.primary'
                >
                    {isLogin ? 'Войти' : 'Регистрация'}
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
