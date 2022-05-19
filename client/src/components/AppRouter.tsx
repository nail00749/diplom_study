import React, {FC, Suspense} from 'react';
import {Route, Routes, BrowserRouter, Navigate} from "react-router-dom";
import {adminRoutes, authRoute, publicRoute} from '../router/router';
import {useAppSelector} from "../hooks/redux";
import Topbar from "./UI/Topbar";
import ServiceAlert from "./UI/serviceAlert";
import {useGetMeDataQuery} from "../services/userAPI";
//import AdminModalsContainer from "./modals/AdminModalsContainer";
const AdminModalsContainer = React.lazy(() => import('./modals/AdminModalsContainer'))

const AppRouter: FC = () => {
    const {isAuthenticated} = useAppSelector(state => state.userReducer)
    const {data: user} = useGetMeDataQuery(undefined, {skip: !isAuthenticated})

    return (
        <BrowserRouter>
            {isAuthenticated && <Topbar/>}
            {
                (isAuthenticated && (user && (user.role === 'admin' || user.role === 'teacher')))
                &&
				<Suspense fallback = {null}>
					<AdminModalsContainer/>
				</Suspense>
            }
            <ServiceAlert/>
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
                                />
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
                                />
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
                                />
                            )
                        }
                        <Route
                            path = '*'
                            element = {<Navigate to = '/'/>}
                        />
                    </Routes>
            }
        </BrowserRouter>

    );
};

export default AppRouter;
