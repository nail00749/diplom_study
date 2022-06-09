import React, {FC} from 'react'
import {Box, Grid, Typography} from "@mui/material";
import {useGetAllSubscribesQuery} from "../../services/contentAPI";
import {ICourse} from "../../models/ICourse";
import StyleLink from "../UI/StyleLink";
import {useGetAllCoursesQuery, useGetStudentCoursesQuery} from "../../services/courseAPI";
import {IUserSubscription} from "../../models/IUserSubscription";
import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay  } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {BaseURL} from "../../config";

const UserCourse: FC = () => {
    const {data: subscribes} = useGetStudentCoursesQuery()
    const {data: allCourses} = useGetAllCoursesQuery()


    return (
        <Grid
            container
            spacing = {5}
        >
            <Grid
                item
                xs = {12}
                sm = {12}
                md = {4}
            >
                <Box
                    sx = {{
                        border: '1px solid',
                        borderRadius: 3,
                    }}
                    p = {3}
                >
                    <Typography
                        component = 'h3'
                        mb = {3}
                        color = 'text.primary'
                    >
                        Ваши курсы
                    </Typography>
                    {
                        subscribes && subscribes.length ?
                            subscribes.map((sub: IUserSubscription) =>
                                <StyleLink
                                    key = {sub._id}
                                    to = {`/course/${sub.flow.course._id}/${sub.flow._id}`}
                                >
                                    <Box
                                        mb = {3}
                                        py = {1.5}
                                        px = {3}
                                        sx = {{
                                            borderRadius: 3,
                                        }}
                                    >
                                        {sub.flow.course.title}
                                    </Box>
                                </StyleLink>
                            ) : 'У вас нет подписок на курсы'
                    }
                </Box>
            </Grid>
            <Grid
                item
                xs = {12}
                sm = {12}
                md = {4}
            >
                <Typography
                    color = 'text.primary'
                    variant = 'h6'
                    mb = {2}
                    textAlign='center'
                >
                    Все курсы
                </Typography>
                <Swiper
                    loop={true}
                    autoplay={true}
                    modules={[Navigation, Pagination, A11y, Autoplay ]}
                    navigation
                    pagination={{ clickable: true }}
                >
                    {
                        allCourses && allCourses.map((course: ICourse) =>
                            <SwiperSlide
                                key = {course._id}
                            >
                                <Grid
                                    container
                                    direction = 'column'
                                    alignItems = 'center'
                                >
                                    <Box>
                                        {course.title}
                                    </Box>
                                    {
                                        course.image_path &&
										<img
											src = {BaseURL + course.image_path}
											alt = ""
											style = {{
                                                maxWidth: 200,
                                                maxHeight: 160
                                            }}
										/>
                                    }
                                </Grid>
                            </SwiperSlide>
                        )
                    }
                </Swiper>
            </Grid>
        </Grid>
    )
}

export default UserCourse
