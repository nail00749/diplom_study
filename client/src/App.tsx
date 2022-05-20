import React, {useState, useMemo, useEffect} from 'react';
import AppRouter from "./components/AppRouter";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {CssBaseline, PaletteMode, Box, CircularProgress, Typography} from "@mui/material";
import {grey} from '@mui/material/colors';
import './config/index.css'
import {BaseURL} from "./config";

export const ColorModeContext = React.createContext({
    toggleColorMode: () => {
    }
});

const getDesignTokens = (mode: PaletteMode) => ({
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

const App = () => {
    const [statusServer, setStatusServer] = useState<'connecting' | 'success' | 'error'>('connecting')

    useEffect(() => {
        (async function checkConnection() {
            try {
                const resp = await fetch(BaseURL + '/api')
                if (resp.ok)
                    setStatusServer('success')

            } catch (e) {
                setStatusServer('error')
            }
        })()

    }, [])

    return (
        <Box
            sx = {{
                minHeight: '100vh',
                bgcolor: 'background.default',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {
                statusServer === 'success' ?
                    <AppRouter/> :
                    statusServer === 'connecting' ?
                        <Box
                            sx = {{
                                flex: '1 1 100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column'
                            }}
                        >
                            <CircularProgress/>
                            <Typography
                                mt = {3}
                            >
                                Checking server status
                            </Typography>
                        </Box> :
                        <Box
                            sx = {{
                                flex: '1 1 100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            Error connection server
                        </Box>
            }
        </Box>
    );


}

export default function ToggleColorMode() {
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = useMemo(
        () =>
            createTheme(getDesignTokens(mode)),
        [mode],
    );

    return (
        <ColorModeContext.Provider value = {colorMode}>
            <CssBaseline/>
            <ThemeProvider theme = {theme}>
                <App/>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}


//export default App;
