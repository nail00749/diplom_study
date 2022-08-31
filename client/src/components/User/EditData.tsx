import React, {FC, useEffect, useState} from 'react'
import {Box, Button, TextField} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import { IUserEdit} from "../../models/IUser";
import {useGetMeDataQuery, useUpdateMutation} from "../../services/userAPI";

interface EditDataProps {
    setIsEdit: (isEdit: boolean) => void
}

const EditData: FC<EditDataProps> = ({setIsEdit}) => {
    const [userData, setUserData] = useState<IUserEdit>({
        name: '',
        surname: '',
        telegram: ''
    });

    const {data: user} = useGetMeDataQuery()
    const [update, {isSuccess, isLoading}] = useUpdateMutation()

    useEffect(() => {
        const data = {
            name: (user && user.name) || '',
            surname: (user && user.surname) || '',
            telegram: (user && user.telegram) || '',
        }
        setUserData(data)

        if(isSuccess){
            setIsEdit(false)
        }
    }, [isSuccess])

    const handlerData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData((prev: any) => {
            const copy = {...prev}
            copy[e.target.name as keyof IUserEdit] = e.target.value
            return copy
        })
    }


    const handlerUpdate = async () => {
        await update(userData)
    };

    const handlerCancel = () => {
        setUserData({
            name: '',
            surname: '',
            telegram: ''
        })
        setIsEdit(false)
    };

    return (
        <>
            <Box
                my = {3}
            >
                <TextField
                    label = 'Имя'
                    name = 'name'
                    onChange = {handlerData}
                    value = {userData.name}
                />
            </Box>
            <Box>
                <TextField
                    label = 'Фамилия'
                    name = 'surname'
                    onChange = {handlerData}
                    value = {userData.surname}
                />
            </Box>
            <Box
                my = {3}
            >
                <TextField
                    label = 'Telegram'
                    name = 'telegram'
                    onChange = {handlerData}
                    value = {userData.telegram}
                />
            </Box>
            <Box>
                <LoadingButton
                    loading = {isLoading}
                    color = 'success'
                    variant = 'contained'
                    sx = {{
                        mr: 1
                    }}
                    onClick = {handlerUpdate}
                >
                    Сохранить
                </LoadingButton>
                <Button
                    variant = 'contained'
                    color = 'error'
                    onClick = {handlerCancel}
                >
                    Отмена
                </Button>
            </Box>
        </>
    )
}

export default EditData
