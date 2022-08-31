import { useTheme } from '@mui/material'
import React, {FC} from 'react'
import { Link, LinkProps } from 'react-router-dom'

const StyleLink: FC<LinkProps> = ({children, to, ...otherProps }) => {
    const {palette} = useTheme()
    return (
        <Link
            to={to}
            {...otherProps}
            className={palette.mode === 'dark' ? 'linkDark' : undefined}
        >
            {children}
        </Link>
    )
}

export default StyleLink
