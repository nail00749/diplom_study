import React, {FC} from 'react'
import {Transition} from "./Transition";
import {noop} from "../../utils";
import {Box, Dialog} from "@mui/material";
import ModalHeader from "./ModalHeader";

interface BaseModalProps {
    open: boolean,
    onClose: () => void,
    title: string,
    disabled: boolean
}

const BaseModal: FC<BaseModalProps> = ({open, onClose, disabled, children, title}) => {
    return (
        <Dialog
            open = {open}
            TransitionComponent = {Transition}
            onClose = {disabled ? noop : onClose}
            sx = {{
                borderRadius: 3
            }}
        >
            <Box
                sx = {{
                    display: 'flex',
                    flexDirection: 'column',
                    pb: 1,
                    overflowY: 'hidden'
                }}
            >
                <ModalHeader
                    title = {title}
                    disabled = {disabled}
                    onClose = {onClose}
                />
                <Box
                    sx = {{
                        overflowY: 'auto'
                    }}
                >
                    {children}
                </Box>
            </Box>

        </Dialog>
    )
}

export default BaseModal
