import React, { FC, useState } from 'react';
import {
  Box,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  IconButton,
  Drawer,
} from '@mui/material';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { linksNavigationUser, linksNavigationAdmin } from '../../router/router';
import SwitchToggleTheme from './SwitchToggleTheme';
import { useGetMeDataQuery } from '../../services/userAPI';
import StyleLink from './StyleLink';

const NavigationMenu: FC = () => {
  const [state, setState] = useState<boolean>(false);
  const [selectedLinkIndex, setSelectedLinkIndex] = useState(0);
  const { data: user } = useGetMeDataQuery();

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event && event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setState(open);
  };

  const handlerIndexActive = (index: number) => () => setSelectedLinkIndex(index);

  return (
    <Box>
      <>
        <IconButton
          onClick = {toggleDrawer(true)}
          color = 'default'
        >
          <DehazeIcon />
        </IconButton>
        <Drawer
          anchor = 'left'
          open = {state}
          onClose = {toggleDrawer(false)}
          //onOpen = {toggleDrawer(true)}
        >
          <Box
            sx = {{
              width: 250,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              bgcolor: 'background.default',
            }}
            role = 'presentation'
            onClick = {toggleDrawer(false)}
            onKeyDown = {toggleDrawer(false)}
          >
            <List>
              {
                linksNavigationUser.map((item, index) =>
                  <StyleLink
                    key = {item.text}
                    to = {item.link}
                  >
                    <ListItemButton
                      selected = {selectedLinkIndex === index}
                      onClick = {handlerIndexActive(index)}
                    >
                      {
                        item.icon &&
                        <ListItemIcon>
                          <item.icon />
                        </ListItemIcon>
                      }
                      <ListItemText
                        color = 'text.primary'
                        primary = {item.text}
                      />
                    </ListItemButton>
                  </StyleLink>,
                )
              }
              {
                (user && (user.role === 'teacher' || user.role === 'admin')) &&
                linksNavigationAdmin.map((item, index) =>
                  <StyleLink
                    key = {item.text}
                    to = {item.link}
                  >
                    <ListItemButton
                      selected = {selectedLinkIndex === index + linksNavigationUser.length}
                      onClick = {handlerIndexActive(index + linksNavigationUser.length)}
                    >
                      {
                        item.icon &&
                        <ListItemIcon>
                          <item.icon />
                        </ListItemIcon>
                      }
                      <ListItemText
                        primary = {item.text}
                      />
                    </ListItemButton>
                  </StyleLink>,
                )
              }
            </List>
          </Box>
          <Box
            sx = {{
              height: 50,
            }}
          >
            <SwitchToggleTheme />
          </Box>
        </Drawer>
      </>
    </Box>
  );
};

export default NavigationMenu;
