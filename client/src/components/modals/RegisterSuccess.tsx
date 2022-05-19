import React, {FC} from 'react';
import {Dialog, Slide, Typography, Box, Button, Container} from "@mui/material";
import {TransitionProps} from '@mui/material/transitions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Transition = React.forwardRef(function Transition(props: TransitionProps & {
    children: React.ReactElement;
}, ref: React.Ref<unknown>) {
    return <Slide direction = "down" ref = {ref} {...props} />;
});

interface RegisterSuccessProps {
    open: boolean,
    setClose: (state: boolean) => void,
    setPageLogin: () => void
}

const RegisterSuccess: FC<RegisterSuccessProps> = ({open, setClose, setPageLogin}) => {

    const handlerSuccess = () => {
        setClose(false)
        setTimeout(() => setPageLogin(), 500)
    }

    const handlerClose = () => setClose(false)

    return (
        <Dialog
            open = {open}
            TransitionComponent = {Transition}
            onClose = {handlerClose}
        >
            <Container>
                <Box
                    p = {3}
                    px = {5}
                    sx = {{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <CheckCircleIcon
                        color = 'success'
                        sx = {{
                            fontSize: 64
                        }}
                    />
                    <Typography
                        variant = 'h5'
                        sx = {{
                            my: 4
                        }}
                    >
                        Register Success
                    </Typography>
                    <Button
                        variant = 'outlined'
                        color = 'success'
                        onClick = {handlerSuccess}
                    >
                        Go next
                    </Button>
                </Box>
            </Container>
        </Dialog>
    )

}

export default RegisterSuccess;
