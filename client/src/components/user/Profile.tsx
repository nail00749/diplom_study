import React, {FC, useEffect, useState} from 'react'
import {Box, Button, TextField, Typography} from "@mui/material";
import {useAppSelector} from "../../hooks/redux";
import {useGetMeDataQuery, useUpdateMutation} from "../../services/userAPI";
import {LoadingButton} from "@mui/lab";
import UserAvatar from "./UserAvatar";

interface IUserEdit {
    name: string
    surname: string
    telegram: string
}

const Profile: FC = () => {
    const {isAuthenticated} = useAppSelector(state => state.userReducer)
    const {data: user} = useGetMeDataQuery()
    const [isEdit, setIsEdit] = useState(false);
    const [userData, setUserData] = useState<IUserEdit>({
        name: '',
        surname: '',
        telegram: ''
    });

    const [update, {isSuccess, isLoading}] = useUpdateMutation()

    useEffect(() => {
        setIsEdit(false)
    }, [isSuccess])

    const handlerIsEdit = () => {
        setIsEdit(prev => !prev)
        const data = {
            name: (user && user.name) || '',
            surname: (user && user.surname) || '',
            telegram: (user && user.telegram) || '',
        }
        setUserData(data)
    }

    const handlerData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData(prev => {
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
      <Box
        sx = {{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}
      >
          {
            (isAuthenticated && user) &&
            <>
                <UserAvatar/>
                <Box
                  sx = {{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      width: '100%',
                      my: 2
                  }}
                >
                    {
                        !isEdit ?
                          <>
                              <Box
                                mr = {5}
                              >
                                  <Typography
                                    variant = 'h5'
                                    color='text.primary'
                                  >
                                      {`Email: ${user.email}`}
                                  </Typography>
                                  {
                                    user.name &&
                                    <Typography
                                      variant = 'h6'
                                      color='text.primary'
                                    >
                                        {`Name: ${user.name}`}
                                    </Typography>
                                  }
                                  {
                                    user.surname &&
                                    <Typography
                                      variant = 'h6'
                                      color='text.primary'
                                    >
                                        {`Surname: ${user.surname}`}
                                    </Typography>
                                  }
                                  {
                                    user.telegram &&
                                    <Typography
                                      variant = 'h6'
                                      color='text.primary'
                                    >
                                        {`Telegram: ${user.telegram}`}
                                    </Typography>
                                  }
                              </Box>
                              <Box
                                mt={1}
                              >
                                  <Button
                                    fullWidth
                                    variant = 'outlined'
                                    onClick = {handlerIsEdit}
                                  >
                                      Edit profile
                                  </Button>
                              </Box>
                          </> :
                          <>
                              <Box
                                my = {3}
                              >
                                  <TextField
                                    label = 'Name'
                                    name = 'name'
                                    onChange = {handlerData}
                                    value = {userData.name}
                                  />
                              </Box>
                              <Box>
                                  <TextField
                                    label = 'Surname'
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
                                      Save
                                  </LoadingButton>
                                  <Button
                                    variant = 'contained'
                                    onClick = {handlerCancel}
                                  >
                                      Cancel
                                  </Button>
                              </Box>
                          </>
                    }
                </Box>
            </>
          }
      </Box>
    )
}

export default Profile
