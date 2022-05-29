import React, {FC, useState} from 'react'
import {Box, Button, Typography} from "@mui/material";
import PassTest from "../modals/PassTest";
import {ITest} from "../../models/ITest";
import {useGetMyTestResultQuery} from "../../services/userTestResultAPI";
import TestResult from "../modals/TestResult";

interface UserTestProps {
    test: ITest,
    flowId: string
}

const UserTest: FC<UserTestProps> = ({test, flowId}) => {
    const [openTest, setOpenTest] = useState(false)
    const [openCheckTest, setOpenCheckTest] = useState(false)
    const {data: testResult} = useGetMyTestResultQuery(String(test._id))

    const handlerTestModal = () => setOpenTest(prev => !prev)
    const handlerTestCheckModal = () => setOpenCheckTest(prev => !prev)

    return (
        <Box>
            {
                testResult ?
                    <>
                        {
                            testResult.mark === -1 ? 'Тест еще не проверен' :
                                <Box>
                                    <Typography>
                                        {`Ваш балл: ${testResult.mark}`}
                                    </Typography>
                                    <Button
                                        variant = 'contained'
                                        onClick={handlerTestCheckModal}
                                    >
                                        Подробнее
                                    </Button>
                                    <TestResult
                                        open = {openCheckTest}
                                        onClose = {handlerTestCheckModal}
                                        test = {test}
                                        testResult={testResult}
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
