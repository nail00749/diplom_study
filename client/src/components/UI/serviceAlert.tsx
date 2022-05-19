import React, {FC, useEffect} from 'react'
import {Alert, Box, Collapse} from "@mui/material";
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {hideErrorAlert} from "../../store/reducers/service/ServiceSlice";
import {useLocation} from "react-router-dom";

const ServiceAlert: FC = () => {
    const {error, showAlert} = useAppSelector(state => state.serviceReducer)
    const location = useLocation()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (showAlert) {
            setTimeout(() => {
                if (showAlert) {
                    dispatch(hideErrorAlert())
                }
            }, 5000)
        }
    }, [dispatch, showAlert])

    useEffect(() => {
        dispatch(hideErrorAlert())
    }, [dispatch, location])


    return (
        <>
            {
                showAlert &&
				<Box
					sx = {{
                        position: 'fixed',
                        bottom: 50,
                        width: '100vw',
                        display: 'flex',
                        justifyContent: 'center',
                        zIndex: 9999
                    }}
				>
					<Collapse
						in = {true}
					>
						<Alert
							severity = 'error'
						>
                            {error}
						</Alert>
					</Collapse>
				</Box>
            }
        </>
    )
}

export default ServiceAlert
