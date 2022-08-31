import {PaletteMode} from "@mui/material";
import {grey} from "@mui/material/colors";

export const BaseURL = process.env.REACT_APP_API || 'http://127.0.0.1:5000'


export const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                text: {
                    primary: grey[900],
                    secondary: grey[800],
                },
            }
            : {
                primary: {
                    main: '#0d47a1'
                },
                /*divider: '#002171',*/
                background: {
                    paper: '#002171'
                },
                text: {
                    primary: '#fff',
                    secondary: '#fff',
                    disabled: '#fff'
                },
            }),
    },
});
