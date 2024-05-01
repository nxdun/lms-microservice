import {
  AppBar,
  Button,
  Drawer,
  List,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";

import "src/styles/index.css";
import propsval from "prop-types";
import { useState } from "react";
import ChromeReaderModeTwoToneIcon from "@mui/icons-material/ChromeReaderModeTwoTone";
import LanguageTwoToneIcon from "@mui/icons-material/LanguageTwoTone";
const Header = ({ value, setValue, logsOut }) => {
  //media query things
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  //drawer things
  const [DrawerOpen, setDrawerOpen] = useState(false);

  //menu things
  const [MenuOpen, setMenuOpen] = useState(false);
  console.log(MenuOpen);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const options = [
    "Username here",
    
    "My account",
    "Logout",
    "Settings",
    "Help",
    "Feedback",
  ];
  const [selectedIndex, setSelectedIndex] = useState(1);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    setMenuOpen(false);
    //handle menu items button clicks here
    if (index === 2) {
      logsOut();
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  const DrawerContent = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <ListItem>
          <ListItemButton
            onClick={() => {
              setDrawerOpen(false);
            }}
          >
            <ListItemIcon>
              <LanguageTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary={"Browse"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <AppBar
      sx={{
        background: "rgba(234, 234, 234, 0.1)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: "none",
        position: "absolute",
        width: "100%",
        zIndex: 1,
      }}
    >
      <Drawer
        open={DrawerOpen}
        onClose={() => {
          setDrawerOpen(false);
        }}
      >
        {DrawerContent}
      </Drawer>

      <Toolbar>
        <Button
          style={{ color: "white" }}
          onClick={() => {
            setDrawerOpen(true);
          }}
        >
          <ChromeReaderModeTwoToneIcon />
        </Button>

        {isMatch ? (
          <>
            <Tabs
              sx={{ marginLeft: "auto" }}
              indicatorColor="secondary"
              textColor="inherit"
              value={value}
              onChange={(e, value) => setValue(value)}
            >
              <Tab label="Browse" />
              <Tab label="Collections" />
            </Tabs>
            <Button
              sx={{
                marginLeft: "auto",
                marginRight: "-2rem",
              }}
            >
              <div>
                <List>
                  <ListItemButton id="lock-button" onClick={handleClickListItem}>
                    <Avatar
                      sx={{
                        marginLeft: "auto",
                        background: "rgba(255, 46, 99, 0.3)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        boxShadow: "none",
                        zIndex: 1,
                        ":hover": {
                          background: "rgba(255, 46, 99, 0.5)",
                        },
                      }}
                    >
                      {/* //avatar icon here */}
                      N
                    </Avatar>
                  </ListItemButton>
                </List>
                <Menu
                  id="lock-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    role: "listbox",
                  }}
                >
                  {/* //menu items */}
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === 0}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </Button>
          </>
        ) : (
          <>
            <Typography
              sx={{ fontSize: "2rem", paddingLeft: "10%", color: "grey" }}
            ></Typography>
            <Tabs
              indicatorColor="secondary"
              textColor="inherit"
              value={value}
              onChange={(e, value) => setValue(value)}
            >
              <Tab label="Browse" />
              <Tab label="Collections" />
            </Tabs>
            <Button sx={{ marginLeft: "auto" }}>
              <div>
                <List>
                  <ListItemButton id="lock-button" onClick={handleClickListItem}>
                    <Avatar
                      sx={{
                        marginLeft: "auto",
                        background: "rgba(255, 46, 99, 0.3)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        boxShadow: "none",
                        zIndex: 1,
                        ":hover": {
                          background: "rgba(255, 46, 99, 0.5)",
                        },
                      }}
                    >
                      {/* //avatar icon here */}
                      N
                    </Avatar>
                  </ListItemButton>
                </List>
                <Menu
                  id="lock-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    role: "listbox",
                  }}

                >
                  {/* //menu items */}
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === 0}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

Header.propTypes = {
  value: propsval.number.isRequired,
  setValue: propsval.func.isRequired,
  logsOut: propsval.func.isRequired,
};
