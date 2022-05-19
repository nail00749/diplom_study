import React, {useState, useMemo} from 'react';
import AppRouter from "./components/AppRouter";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {CssBaseline, PaletteMode, Box} from "@mui/material";
import {grey} from '@mui/material/colors';
import './config/index.css'

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
                text: {
                    primary: '#fff',
                    secondary: '#fff',
                    disabled: '#fff'
                },
            }),
    },
});

const App = () => {
    return (
        <Box
            sx = {{
                minHeight: '100vh',
                bgcolor: 'background.default',
            }}
        >
            <AppRouter/>
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
