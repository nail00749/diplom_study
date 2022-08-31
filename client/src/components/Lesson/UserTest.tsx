import React, {FC, useState} from 'react'
import {Box, Button, Typography} from "@mui/material";
import PassTest from "../Modals/PassTest";
import {ITest} from "../../models/ITest";
import TestResult from "../Modals/TestResult";
import {useGetMyResultFlowQuery} from "../../services/userFlowAPI";

interface UserTestProps {
    test: ITest,
    flowId: string
}

const UserTest: FC<UserTestProps> = ({test, flowId}) => {
    const [openTest, setOpenTest] = useState(false)
    const [openCheckTest, setOpenCheckTest] = useState(false)
    const {data: myResultFlow} = useGetMyResultFlowQuery(String(flowId))

    const handlerTestModal = () => setOpenTest(prev => !prev)
    const handlerTestCheckModal = () => setOpenCheckTest(prev => !prev)

    return (
        <Box>
            {
                myResultFlow && myResultFlow.testsResult && myResultFlow.testsResult[test._id] && myResultFlow.testsResult[test._id] ?
                    <>
                        {
                            myResultFlow.testsResult[test._id].mark === -1 ? 'Тест еще не проверен учителем' :
                                <Box>
                                    <Typography
                                        color = 'text.primary'
                                        my={1}
                                    >
                                        {`Ваш балл: ${myResultFlow.testsResult[test._id].mark}`}
                                    </Typography>
                                    <Button
                                        variant = 'contained'
                                        onClick = {handlerTestCheckModal}
                                    >
                                        Подробнее
                                    </Button>
                                    <TestResult
                                        open = {openCheckTest}
                                        onClose = {handlerTestCheckModal}
                                        test = {test}
                                        testResult = {myResultFlow.testsResult[test._id]}
                                    />
                                </Box>
                        }
                    </> :
                    <>
                        <Button
                            variant = 'outlined'
                            onClick = {handlerTestModal}
                        >
                            Сдать тест
                        </Button>
                        <PassTest
                            open = {openTest}
                            onClose = {handlerTestModal}
                            test = {test}
                            flowId = {flowId}
                        />
                    </>
            }
        </Box>
    )
}

export default UserTest
