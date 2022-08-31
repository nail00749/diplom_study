import React, {FC, Suspense, useEffect} from 'react';
import {Route, Routes, BrowserRouter, Navigate, useLocation} from 'react-router-dom';
import {adminRoutes, authRoute, publicRoute} from '../router/router';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import Topbar from './Common/Topbar';
import ServiceAlert from './Common/serviceAlert';
import {useGetMeDataQuery} from '../services/userAPI';
import {Box} from '@mui/material';
const ModalsContentContainer = React.lazy(() => import('./Modals/ModalsContentContainer'));

const AppRouter: FC = () => {
    const {isAuthenticated} = useAppSelector(state => state.userReducer);
    const {data: user} = useGetMeDataQuery(undefined, {skip: !isAuthenticated});
    const dispatch = useAppDispatch()

    useEffect(() => {
        document.documentElement.scrollTo(0, 0)
    }, [user])

    useEffect(() => {
        function message_broadcast(e: any) {
            if (e?.key != 'message') {
                return
            }
            let message = JSON.parse(e.newValue)
            if (!message) {
                return
            }
            if (message.command === 'Delete session') {
                dispatch({type: 'logOut'})
            }
        }
        window.addEventListener('storage', message_broadcast)
    }, [])


    return (
        <BrowserRouter>
            <Wrapper/>
            {isAuthenticated && <Topbar/>}
            {
                (isAuthenticated && (user && (user.role === 'admin' || user.role === 'teacher')))
                &&
				<Suspense fallback = {null}>
					<ModalsContentContainer/>
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
                                /*(User && (User.role === 'teacher' || User.role === 'admin')) &&*/
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
