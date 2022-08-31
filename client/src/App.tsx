import React, {useState, useMemo, useEffect} from 'react';
import AppRouter from "./components/AppRouter";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {CssBaseline, PaletteMode, Box, CircularProgress, Typography} from "@mui/material";
import {grey} from '@mui/material/colors';
import './config/index.css'
import {BaseURL, getDesignTokens} from "./config";

export const ColorModeContext = React.createContext({
    toggleColorMode: () => {
    }
});

const App = () => {

    return (
        <Box
            sx = {{
                minHeight: '100vh',
                bgcolor: 'background.default',
                display: 'flex',
                flexDirection: 'column'
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
