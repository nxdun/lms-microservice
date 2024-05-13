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
import axios from "axios";

import ChromeReaderModeTwoToneIcon from "@mui/icons-material/ChromeReaderModeTwoTone";
import LanguageTwoToneIcon from "@mui/icons-material/LanguageTwoTone";

import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationDisplay from "./notificationDisplay";

const Header = ({ value, setValue, logsOut }) => {
  //media query things
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  //drawer things
  const [DrawerOpen, setDrawerOpen] = useState(false);

  //menu things
  const [MenuOpen, setMenuOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]); // State for notifications
  const open = Boolean(anchorEl);
  const options = [
    "Username here", //add uasername here

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

  //fetch notifications for the logged-in user
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/notify/1234`);
      const notificationsData = response.data;
      setNotifications(notificationsData); // Update notifications state with fetched data
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  //function for notification button
  const handleNotifClick = async () => {
    fetchNotifications(); //fetchNotifications function called when notification button clicked
  };

  const DrawerContent = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <ListItem>
          <ListItemButton
            onClick={() => {
              setDrawerOpen(false);
            }}
            MenuOpen={MenuOpen}
          >
            <ListItemIcon>
              <LanguageTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary={"Browse"} />
          </ListItemButton>
        </ListItem>
        <List sx={{ paddingLeft: 2 }}>
            {[
              "Programming",
              "Web Development",
              "Mobile",
              "Android",
              "Artificial Intelligence",
              "Data Science",
              "Statistics",
              "Machine Learning",
              "Math",
              "Data Analyst",
              "Microservice",
              "Software Development"
            ].map((category, index) => (
              <ListItem key={index}>
                <ListItemText primary={category} />
              </ListItem>
            ))}
          </List>
        
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
              <Tab label="My Courses" />
            </Tabs>
            <Button
              sx={{
                marginLeft: "auto",
                marginRight: "-2rem",
              }}
            >
              <div>
                <List>
                  <ListItemButton
                    id="lock-button"
                    onClick={handleClickListItem}
                  >
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
                
                <NotificationsIcon onClick={handleNotifClick} />

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
              <Tab label="My Courses" />
            </Tabs>
            
            <Button sx={{ marginLeft: "auto"

             }}>
            <NotificationDisplay notifications={notifications} />

              <div>
                <List>
                  <ListItemButton
                    id="lock-button"
                    onClick={handleClickListItem}
                  >
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
