import React, {FC} from 'react'
import {Box, IconButton, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export interface ModalHeaderProps {
    onClose: () => void,
    title: string,
    disabled: boolean
}

const ModalHeader: FC<ModalHeaderProps> = ({onClose, title, disabled}) => {
    return (
        <Box
            sx = {{
                display: 'flex',
                flexDirection: 'column',
                pb: 1,
            }}
        >
            <Box
                sx = {{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'grey.800',
                    mb: 3,
                    py: 3
                }}
            >
                <IconButton
                    onClick = {onClose}
                    disabled = {disabled}
                    color = {'error'}
                    sx = {{
                        ml: 2
                    }}
                >
                    <CloseIcon/>
                </IconButton>
                <Typography
                    variant = 'h5'
                    component = 'span'
                    color = 'grey.400'
                    sx = {{
                        mx: 3,
                    }}
                >
                    {title}
                </Typography>
            </Box>
        </Box>
    )
}

export default ModalHeader
