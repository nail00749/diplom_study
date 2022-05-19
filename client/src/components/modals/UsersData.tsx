import React, {FC, useMemo} from 'react'
import {Transition} from "./Transition";
import {Dialog, Box, FormControl, MenuItem, Typography, IconButton} from "@mui/material";
import {DataGrid, GridColDef, GridRenderCellParams} from '@mui/x-data-grid';
import {useGetAllUsersQuery, useSetRoleMutation} from "../../services/adminAPI";
import Select, {SelectChangeEvent} from '@mui/material/Select';
import CloseIcon from "@mui/icons-material/Close";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {toggleUsersData} from "../../store/reducers/service/ServiceSlice";

const UsersData: FC = () => {
    let {data: users} = useGetAllUsersQuery('')
    const [update] = useSetRoleMutation()
    const {showUsersData} = useAppSelector(state => state.serviceReducer)
    const dispatch = useAppDispatch()

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
        await update(data)
    }

    const handlerClose = () => dispatch(toggleUsersData())

    return (
        <Dialog
            open = {showUsersData}
            TransitionComponent = {Transition}
            onClose = {handlerClose}
        >
            <Box
                p = {3}
            >
                <Box
                    sx = {{
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <IconButton
                        onClick = {handlerClose}
                    >
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant = 'h5' component = 'span'>
                        Edit users data
                    </Typography>
                </Box>
                <Box
                    sx = {{
                        height: 400,
                        width: '100%',
                    }}
                >
                    <DataGrid
                        rows = {users}
                        columns = {columns}
                        rowsPerPageOptions = {[10]}
                        sx = {{
                            width: '560px'
                        }}
                    />
                </Box>
            </Box>
        </Dialog>
    )
}

export default UsersData
