import React, {FC, useEffect, useState} from 'react'
import {AppBar, Avatar, Box, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {logOut} from "../../store/reducers/user/UserSlice";
import NavigationMenu from "./NavigationMenu";
import {useGetMeDataQuery} from "../../services/userAPI";
import {BaseURL} from "../../config";
import LogoutIcon from '@mui/icons-material/Logout';

const Topbar: FC = () => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const dispatch = useAppDispatch()
    const {data: user, refetch} = useGetMeDataQuery()
    const {isAuthenticated} = useAppSelector(state => state.userReducer)
    useEffect(() => {
        refetch()
    }, [isAuthenticated, refetch]);

    const handlerOpenMenu = (e: React.MouseEvent<HTMLElement>) => setAnchorElUser(e.currentTarget)

    const handleCloseMenu = () => setAnchorElUser(null)

    const handlerLogOut = () => dispatch(logOut())

    return (
      <AppBar
        position = 'static'
      >
          <Toolbar>
              <NavigationMenu/>
              <Box
                sx = {{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '100%'
                }}
              >
                  <Tooltip title = {'open'}>
                      <IconButton
                        onClick = {handlerOpenMenu}
                      >
                          {
                              user && user.avatar_path ?
                                <Avatar
                                  src = {BaseURL + user.avatar_path}
                                />
                                :
                                <AccountCircle/>
                          }
                      </IconButton>
                  </Tooltip>
                  <Menu
                    sx = {{
                        mt: '30px'
                    }}
                    anchorEl = {anchorElUser}
                    anchorOrigin = {{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    keepMounted
                    transformOrigin = {{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    open = {Boolean(anchorElUser)}
                    onClose = {handleCloseMenu}
                  >
                      <MenuItem
                        onClick = {handlerLogOut}
                      >
                          <LogoutIcon/>
                          <Typography ml={.5}>Log out</Typography>
                      </MenuItem>
                  </Menu>
              </Box>
          </Toolbar>
      </AppBar>

    )
}

export default Topbar
