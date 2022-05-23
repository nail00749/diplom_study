import React from 'react';
import Login from "../scenes/Login";
import Main from '../scenes/Main';
import Course from "../scenes/Course";
import Lesson from '../scenes/Lesson';
import Admin from '../scenes/Admin';
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Flow from '../scenes/Flow';
import TeacherLesson from "../scenes/TeacherLesson";

export interface IRoute {
    path: string,
    component: React.FunctionComponent<any>,
    exact?: boolean
}

export interface ILink {
    link: string,
    icon?: any,
    text: string,
}

export enum RouteNames {
    HOME = '/',
    LOGIN = '/login',
    COURSE = '/course/:courseId',
    LESSON = '/lesson/:lessonId',
    STREAM = '/stream',
    ADMIN = '/admin',
    FLOW = '/flow/:flowId',
    LESSONTEACHER = '/lesson-teacher/:lessonId/:flowId'
}

export const linksNavigationUser: ILink[] = [
    {link: RouteNames.HOME, text: 'HOME', icon: HomeIcon},
    /*{link: RouteNames.STREAM, text: 'STREAM', icon: SettingsInputAntennaIcon}*/
]

export const linksNavigationAdmin: ILink[] = [
    {link: RouteNames.ADMIN, text: 'ADMIN', icon: AdminPanelSettingsIcon},
]

export const publicRoute: IRoute[] = [
    {path: RouteNames.LOGIN, component: Login, exact: false},
    {path: RouteNames.HOME, component: Login, exact: true},
]

export const authRoute: IRoute[] = [
    {path: RouteNames.HOME, component: Main, exact: true},
    {path: RouteNames.COURSE, component: Course, exact: false},
    {path: RouteNames.LESSON, component: Lesson, exact: false},
    {path: RouteNames.FLOW, component: Flow, exact: false},
    {path: RouteNames.LESSONTEACHER, component: TeacherLesson, exact: false}
    /*{path: RouteNames.STREAM, component: Stream, exact: false},*/
]

export const adminRoutes: IRoute[] = [
    {path: RouteNames.ADMIN, component: Admin, exact: false},
]




