import React, {FC, useState} from 'react'
import {Box} from "@mui/material";
import {useAppSelector} from "../../hooks/redux";
import UserAvatar from "./UserAvatar";
import EditData from "./EditData";
import UserData from "./UserData";

const Profile: FC = () => {
    const {isAuthenticated} = useAppSelector(state => state.userReducer)
    const [isEdit, setIsEdit] = useState(false);

    return (
      <Box
        sx = {{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}
      >
          {
            isAuthenticated &&
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
                          <UserData
                              setIsEdit={setIsEdit}
                          /> :
                          <EditData
                              setIsEdit={setIsEdit}
                          />
                    }
                </Box>
            </>
          }
      </Box>
    )
}

export default Profile
