import React from 'react'
import {Button, FormControl, IconButton, InputAdornment, OutlinedInput} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {useGenerateLinkMutation} from "../../services/adminAPI";

const GenerateLink = () => {
    const [generate, {data}] = useGenerateLinkMutation()

    const handleGenerate = () => generate()

    const handleCopyToClipboard = () => navigator.clipboard.writeText(`${window.location.origin}/register-teacher/${data.link}`)

    return (
        <>
            <Button
                onClick = {handleGenerate}
                variant = 'contained'
                fullWidth
            >
                Cсылка для учителя
            </Button>
            {
                (data && data.link) &&
				<FormControl
					variant = "filled"
					disabled
					sx = {{
                        mt: 3
                    }}
					fullWidth
				>
					<OutlinedInput
						id = "outlined-adornment-password"
						type = {'text'}
						value = {data ? `${window.location.origin}/register-teacher/${data.link}` : ''}
                        //onChange={handleChange('password')}
						endAdornment = {
                            <InputAdornment position = "end">
                                <IconButton
                                    onClick = {handleCopyToClipboard}
                                    //onMouseDown={handleMouseDownPassword}
                                    edge = "end"
                                >
                                    {<ContentCopyIcon/>}
                                </IconButton>
                            </InputAdornment>
                        }
						notched
					/>
				</FormControl>
            }
        </>
    )
}

export default GenerateLink
