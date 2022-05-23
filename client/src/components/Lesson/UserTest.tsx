import React, {FC, useState} from 'react'
import {Box, Button, Typography} from "@mui/material";
import PassTest from "../modals/PassTest";
import {ITest} from "../../models/ITest";
import {useGetMyTestResultQuery} from "../../services/userTestResultAPI";
import CheckTest from "../modals/CheckTest";

interface UserTestProps {
    test: ITest
}

const UserTest: FC<UserTestProps> = ({test}) => {
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
                                        {`Ваша оценка ${testResult.mark}`}
                                    </Typography>
                                    <Button
                                        variant = 'contained'
                                        onClick={handlerTestCheckModal}
                                    >
                                        Подробнее
                                    </Button>
                                    <CheckTest
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
                            Pass test
                        </Button>
                        <PassTest
                            open = {openTest}
                            onClose = {handlerTestModal}
                            test = {test}
                        />
                    </>
            }
        </Box>
    )
}

export default UserTest
