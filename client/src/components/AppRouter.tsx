import React, {FC, Suspense, useEffect} from 'react';
import {Route, Routes, BrowserRouter, Navigate, useLocation} from 'react-router-dom';
import {adminRoutes, authRoute, publicRoute} from '../router/router';
import {useAppSelector} from '../hooks/redux';
import Topbar from './UI/Topbar';
import ServiceAlert from './UI/serviceAlert';
import {useGetMeDataQuery} from '../services/userAPI';
import {Box} from '@mui/material';

const AdminModalsContainer = React.lazy(() => import('./modals/AdminModalsContainer'));

const AppRouter: FC = () => {
    const {isAuthenticated} = useAppSelector(state => state.userReducer);
    const {data: user} = useGetMeDataQuery(undefined, {skip: !isAuthenticated});

    useEffect(() => {
        document.documentElement.scrollTo(0, 0)
    }, [user])

    return (
        <BrowserRouter>
            <Wrapper/>
            {isAuthenticated && <Topbar/>}
            {
                (isAuthenticated && (user && (user.role === 'admin' || user.role === 'teacher')))
                &&
				<Suspense fallback = {null}>
					<AdminModalsContainer/>
				</Suspense>
            }
            <ServiceAlert/>
            <Box
                sx = {{
                    flex: '1 1 100%',
                }}
            >
                {
                    !isAuthenticated ?
                        <Routes>
                            {
                                publicRoute.map(route =>
                                    <Route
                                        path = {route.path}
                                        index = {route.exact}
                                        element = {<route.component/>}
                                        key = {route.path}
                                    />,
                                )
                            }
                            <Route
                                path = '*'
                                element = {<Navigate to = '/'/>}
                            />
                        </Routes> :
                        <Routes>
                            {
                                authRoute.map(route =>
                                    <Route
                                        path = {route.path}
                                        index = {route.exact}
                                        element = {<route.component/>}
                                        key = {route.path}
                                    />,
                                )
                            }
                            {
                                (user && (user.role === 'teacher' || user.role === 'admin')) &&
                                adminRoutes.map(route =>
                                    <Route
                                        path = {route.path}
                                        index = {route.exact}
                                        element = {<route.component/>}
                                        key = {route.path}
                                    />,
                                )
                            }
                            <Route
                                path = '*'
                                element = {<Navigate to = '/'/>}
                            />
                        </Routes>

                }
            </Box>
        </BrowserRouter>
    );
};

export default AppRouter;

const Wrapper = () => {
    const {pathname} = useLocation()
    useEffect(() => {
        document.documentElement.scrollTo(0, 0)
    }, [pathname])

    return null
}
