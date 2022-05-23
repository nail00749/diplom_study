import {Grid, Typography, Box, Button} from '@mui/material';
import React, {FC, useState} from 'react';
import AuthForm from "../components/AuthForm";
import RegisterForm from "../components/RegisterForm";
import {useGetAllCoursesQuery} from "../services/courseAPI";
import {ICourse} from "../models/ICourse";


const Login: FC = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const {data: courses} = useGetAllCoursesQuery()

    const handlerForm = () => {
        setIsLogin(prev => !prev)
    }

    return (
        <Grid
            container
            spacing = {1}
            /*direction = "column"
            alignItems = "center"
            justifyContent = "center"*/
            sx = {{
                minHeight: '100vh',
                p: 3
            }}
        >
            <Grid
                item
                xs = {0}
                sm = {6}
                md = {9}
            >
                {
                    courses && courses.map((course: ICourse) =>
                        <Box>{course.title}</Box>
                    )
                }
            </Grid>
            <Grid
                item
                xs = {12}
                sm = {6}
                md = {3}
                container
                justifyContent = 'center'
            >
                <Box
                    mb = {1}
                    p = {2}
                >
                    <Typography
                        variant = "h4"
                        align = 'center'
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
                    <Box
                        display = 'flex'
                        justifyContent = 'center'
                    >
                        {/*<Button
                            onClick = {handlerForm}
                            variant = 'outlined'
                        >
                            {isLogin ? 'Sign up' : 'Sign In'}
                        </Button>*/}
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Login;
