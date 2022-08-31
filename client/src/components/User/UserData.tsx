import React, {FC} from 'react'
import {Box, Button, Typography} from "@mui/material";
import {useGetMeDataQuery} from "../../services/userAPI";

interface UserDataProps {
    setIsEdit: (isEdit: boolean) => void
}

const UserData: FC<UserDataProps> = ({setIsEdit}) => {
    const {data: user} = useGetMeDataQuery()

    return (
        <>
            {
                user &&
				<Box
					mr = {5}
				>
					<Typography
						variant = 'h5'
						color = 'text.primary'
					>
                        {`Email: ${user.email}`}
					</Typography>
                    {
                        user.name &&
						<Typography
							variant = 'h6'
							color = 'text.primary'
						>
                            {`Name: ${user.name}`}
						</Typography>
                    }
                    {
                        user.surname &&
						<Typography
							variant = 'h6'
							color = 'text.primary'
						>
                            {`Surname: ${user.surname}`}
						</Typography>
                    }
                    {
                        user.telegram &&
						<Typography
							variant = 'h6'
							color = 'text.primary'
						>
                            {`Telegram: ${user.telegram}`}
						</Typography>
                    }
				</Box>}
            <Box
                mt = {1}
            >
                <Button
                    fullWidth
                    variant = 'outlined'
                    onClick = {() => setIsEdit(true)}
                >
                    Редактировать
                </Button>
            </Box>
        </>
    )
}

export default UserData
