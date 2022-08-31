import React, {useState, useEffect} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {useGetModuleForTeacherQuery} from "../services/moduleAPI";
import {Box, Button, Grid, Step, StepContent, StepLabel, Stepper, Typography} from "@mui/material";
import {BaseURL} from "../config";
import StyleLink from "../components/Common/StyleLink";
import {ILesson} from "../models/ILesson";
import {openModal} from "../store/reducers/admin/moduleSlice";
import {useAppDispatch} from "../hooks/redux";
import {IUserSubscription} from "../models/IUserSubscription";
import CheckModuleTask from "../components/Modals/CheckModuleTask";
import {IModuleTaskResult} from "../models/IModuleTaskResult";

const TeacherModule = () => {
    const {moduleId, flowId} = useParams()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {data: {module, subscriptions} = {}} = useGetModuleForTeacherQuery({
        moduleId: String(moduleId),
        flowId: String(flowId)
    })
    const [open, setOpen] = useState(false)
    const [userResponse, setUserResponse] = useState<IModuleTaskResult | null>(null)

    useEffect(() => {
        if (!moduleId || !flowId) {
            navigate('/')
        }
    }, [moduleId, flowId, navigate])

    const handleEditCourse = () => dispatch(openModal({
        isUpdate: true,
        module
    }))

    const handleCheckModuleTask = (data: any) => () => {
        setOpen(true)
        setUserResponse(data)
    }

    const handleCloseModal = () => setOpen(false)

    return (
        <Box
            p = {3}
        >
            {
                module &&
				<Grid
					container
					spacing = {2}
				>
					<Grid
						item
						xs = {12}
						sm = {8}
						md = {4}
					>
						<Typography
							color = 'text.primary'
							variant = 'h4'
						>
                            {module.title}
						</Typography>
						<Typography
							color = 'text.primary'
							variant = 'body1'
							my = {2}
						>
                            {module.description}
						</Typography>
						<Button
							onClick = {handleEditCourse}
							variant = 'contained'
							sx = {{
                                my: 2
                            }}
						>
							Редактировать модуль
						</Button>
                        {
                            module.lessons &&
							<Stepper
								orientation = 'vertical'
								activeStep = {-1}
							>
                                {
                                    module.lessons.map((module: ILesson) =>
                                        <Step
                                            key = {module._id}
                                        >
                                            <StepLabel>
                                                {
                                                    <StyleLink to = {`/lesson-teacher/${module._id}/${flowId}`}>
                                                        {module.title}
                                                    </StyleLink>
                                                }
                                            </StepLabel>
                                            <StepContent>
                                                {module.description}
                                            </StepContent>
                                        </Step>
                                    )
                                }
							</Stepper>
                        }
					</Grid>
                    {
                        module.image_path &&
						<Grid
							item
							xs = {12}
							sm = {12}
							md = {4}
						>

							<img
								src = {BaseURL + module.image_path}
								alt = ''
								style = {{
                                    maxHeight: 240,
                                    maxWidth: '100%'
                                }}
							/>

						</Grid>
                    }
                    {
                        (subscriptions && module.task) &&
						<Grid
							item
							xs = {12}
							sm = {12}
							md = {4}
						>
							<Typography
								color = 'text.primary'
								mb = {2}
							>
								Результаты задания по модулю
							</Typography>
                            {
                                subscriptions.map((subscription: IUserSubscription) => {
                                        const {resultFlow} = subscription.student
                                        const isSub = subscription && resultFlow
                                        const resultTask = isSub && resultFlow! && resultFlow!.moduleTasks && resultFlow!.moduleTasks[module!.task!._id]
                                        return (
                                            <Box
                                                key = {subscription._id}
                                                my = {2}
                                            >
                                                <Button
                                                    variant = 'outlined'
                                                    onClick = {handleCheckModuleTask(resultTask)}
                                                    disabled = {!Boolean(resultTask)}
                                                >
                                                    {subscription.student.name && subscription.student.surname ? subscription.student.name + ' ' + subscription.student.surname : subscription.student.email}
                                                </Button>
                                            </Box>
                                        )
                                    }
                                )
                            }
						</Grid>
                    }
                    {
                        (module.task && userResponse) &&
						<CheckModuleTask
							open = {open}
							onClose = {handleCloseModal}
							task = {module.task}
							response = {userResponse}
						/>
                    }
				</Grid>
            }
        </Box>
    )
}

export default TeacherModule
