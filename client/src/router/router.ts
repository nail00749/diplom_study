import React from 'react';
import Login from "../scenes/Login";
import Main from '../scenes/Main';
import Course from "../scenes/Course";
import Lesson from '../scenes/Lesson';
import Admin from '../scenes/Admin';
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import TeacherFlow from '../scenes/TeacherFlow';
import TeacherLesson from "../scenes/TeacherLesson";
import Module from "../scenes/Module";
import TeacherModule from "../scenes/TeacherModule";

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
    COURSE = '/course/:courseId/:flowId',
    MODULE = '/module/:moduleId/:flowId',
    LESSON = '/lesson/:lessonId/:flowId',
    STREAM = '/stream',
    ADMIN = '/admin',
    FLOW = '/flow/:flowId',
    MODULE_TEACHER = 'module-teacher/:moduleId/:flowId',
    LESSON_TEACHER = '/lesson-teacher/:lessonId/:flowId',
    REGISTER_TEACHER = '/register-teacher/:registerId',
}

export const linksNavigationUser: ILink[] = [
    {link: RouteNames.HOME, text: 'Главная', icon: HomeIcon},
    /*{link: RouteNames.STREAM, text: 'STREAM', icon: SettingsInputAntennaIcon}*/
]

export const linksNavigationAdmin: ILink[] = [
    {link: RouteNames.ADMIN, text: 'Админ', icon: AdminPanelSettingsIcon},
]

export const publicRoute: IRoute[] = [
    {path: RouteNames.LOGIN, component: Login, exact: false},
    {path: RouteNames.HOME, component: Login, exact: true},
    {path: RouteNames.REGISTER_TEACHER, component: Login, exact: false},
]

export const authRoute: IRoute[] = [
    {path: RouteNames.HOME, component: Main, exact: true},
    {path: RouteNames.COURSE, component: Course, exact: false},
    {path: RouteNames.LESSON, component: Lesson, exact: false},
    {path: RouteNames.MODULE, component: Module}
    /*{path: RouteNames.STREAM, component: Stream, exact: false},*/
]

export const adminRoutes: IRoute[] = [
    {path: RouteNames.ADMIN, component: Admin, exact: false},
    {path: RouteNames.FLOW, component: TeacherFlow, exact: false},
    {path: RouteNames.LESSON_TEACHER, component: TeacherLesson, exact: false},
    {path: RouteNames.MODULE_TEACHER, component: TeacherModule, exact: false}
]




