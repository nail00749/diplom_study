import React, {FC, useState} from 'react'
import {Box, Button} from "@mui/material";
import PassTest from "../modals/PassTest";
import {ITest} from "../../models/ITest";
import {useGetMyTestResultQuery} from "../../services/userTestResultAPI";

interface UserTestProps {
    test: ITest
}

const UserTest: FC<UserTestProps> = ({test}) => {
    const [openTest, setOpenTest] = useState(false)
    const {data: testResult} = useGetMyTestResultQuery(String(test._id))


    const handlerTestModal = () => {
        setOpenTest(prev => !prev)
    }

    return (
        <Box>
            {
                testResult ?
                    <>
                        {
                            testResult.mark === -1 ? 'Тест еще не проверен' : 'Посмотреть результаты'
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
