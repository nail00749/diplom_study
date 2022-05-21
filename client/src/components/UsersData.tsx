import React, {FC, useMemo, useState, useEffect, useRef} from 'react'
import {Box, FormControl, MenuItem, Typography} from "@mui/material";
import {DataGrid, GridColDef, GridRenderCellParams} from '@mui/x-data-grid';
import {useGetAllUsersQuery, useSetRoleMutation} from "../services/adminAPI";
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {IUser} from "../models/IUser";
import {useGetMeDataQuery} from "../services/userAPI";


const UsersData: FC = () => {
    const {data, isSuccess: successData} = useGetAllUsersQuery()
    const {data: meData} = useGetMeDataQuery()
    const [update, {isSuccess}] = useSetRoleMutation()
    const [users, setUsers] = useState<IUser[]>([]);
    const currentUser = useRef<IUser | null>(null)

    useEffect(() => {
        if (data && meData) {
            setUsers(data.filter(user => user._id !== meData._id))
        }
    }, [successData])

    useEffect(() => {
        if (isSuccess && currentUser.current) {
            const {_id, role} = currentUser.current
            setUsers(users => users.map(user => user._id === _id ? {...user, role} : user))
        }
    }, [isSuccess]);


    const columns: GridColDef[] = useMemo(() => {
        return [
            {field: 'email', headerName: 'Email', width: 150},
            {field: 'telegram', headerName: 'Telegram', width: 100},
            {field: 'surname', headerName: 'Surname', width: 100},
            {field: 'name', headerName: 'Name', width: 100},
            {
                field: 'role',
                headerName: 'Role',
                width: 100,
                editable: true,
                renderCell: (params: GridRenderCellParams) => (
                  <FormControl>
                      <Select
                        sx = {{
                            height: 50
                        }}
                        value = {params.value}
                        label = "Role"
                        variant = 'standard'
                        onChange = {changeRole(params)}
                      >
                          <MenuItem value = {'admin'}>admin</MenuItem>
                          <MenuItem value = {'teacher'}>teacher</MenuItem>
                          <MenuItem value = {'user'}>user</MenuItem>
                      </Select>
                  </FormControl>
                )
            }
        ]
    }, [])

    const changeRole = (params: GridRenderCellParams) => async (e: SelectChangeEvent) => {
        const data = {
            email: params.row.email,
            id: params.id,
            role: e.target.value
        }
        currentUser.current = {...params.row, role: e.target.value}
        await update(data)
    }

    return (
      <Box
        p = {3}
      >
          <Box
            sx = {{
                display: 'flex',
                alignItems: 'center'
            }}
          >
              <Typography variant = 'h5' component = 'span' color = 'text.primary'>
                  Edit users data
              </Typography>
          </Box>
          <Box
            sx = {{
                height: 400,
                width: '100%',
                maxWidth: '100vw',
                overflowX: 'auto'
            }}
          >
              {
                users &&
                <DataGrid
                  rows = {users}
                  columns = {columns}
                  rowsPerPageOptions = {[10]}
                  sx = {{
                      minWidth: '320px',
                  }}
                  getRowId = {(row) => row._id}
                />
              }
          </Box>
      </Box>

    )
}

export default UsersData
