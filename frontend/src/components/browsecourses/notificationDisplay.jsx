import { useState, useEffect } from "react";
import {
  Alert,
  Badge,
  Box,
  IconButton,
  Popper,
  Fade,
  FormGroup,
  FormControlLabel,
  Switch,
  Stack
} from "@mui/material";
import NotificationsNoneTwoToneIcon from '@mui/icons-material/NotificationsNoneTwoTone';
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";

const types = ["success", "info", "warning", "error"];


export default function DescriptionAlerts() {
  //state variables for notifications and unread count
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  
  //state variables for controlling notification center(popper) visibility and filter for unread only
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  //function to toggle popper visibility
  const toggleNotificationCenter = (event) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(!isOpen);
  };

  //function to toggle filter for unread only
  const toggleFilter = () => {
    setShowUnreadOnly(!showUnreadOnly);
  };

  useEffect(() => {
    // Fetch notifications from the server
    //TODO: replcae 1234 with the user id taken from the user's session: N
    const fetchNotifications = async () => {
      try {

        //remove 1234 and replace with the user id taken from the user's session: N
        const response = await axios.get(`http://localhost:5000/notify/${localStorage.getItem("token")}`);
        const fetchedNotifications = response.data;
        setNotifications(fetchedNotifications);

        // Calculate unread count
        const newUnreadCount = fetchedNotifications.filter(notification => !notification.read).length;
        setUnreadCount(newUnreadCount);

      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications(); // Fetch notifications when the component mounts
  }, []); // Empty dependency array ensures that this effect runs only once, similar to componentDidMount

  //function to mark notifications as read
  const markNotificationAsRead = (id) => {
    const updatedNotifications = notifications.map(notification => {
      if (notification._id === id) {
        return {
          ...notification,
          read: true
        };
      }
      return notification;
    });
    setNotifications(updatedNotifications);
    setUnreadCount(prevCount => Math.max(0, prevCount - 1));
  };

  return (
    <Box sx={{ margin: "8px" }}>
      <IconButton size="large" onClick={toggleNotificationCenter}>
        <Badge badgeContent={unreadCount} color="primary">
          <NotificationsNoneTwoToneIcon color="action" />
        </Badge>
      </IconButton>

      <Popper open={isOpen} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box>
              <Box
                sx={{
                  background: "#666",
                  padding: "8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              > 
                <FormGroup sx={{ color: "#fff" }}>
                  <FormControlLabel
                    control={
                      <Switch
                        color="secondary"
                        onChange={toggleFilter}
                        checked={showUnreadOnly}
                      />
                    }
                    label="Show unread only"
                  />
                </FormGroup>
              </Box>
              <Stack
                sx={{
                  height: "400px",
                  width: "min(60ch, 100ch)",
                  padding: "12px",
                  background: "#f1f1f1",
                  borderRadius: "8px",
                  overflowY: "auto"
                }}
                spacing={2}
              >
                {(!notifications.length ||
                  (unreadCount === 0 && showUnreadOnly)) && (
                  <h4>
                    Your queue is empty! you are all set{" "}
                    <span role="img" aria-label="dunno what to put">
                      🎉
                    </span>
                  </h4>
                )}
                {(showUnreadOnly
                  ? notifications.filter((v) => !v.read)
                  : notifications
                ).map((notification) => {
                  return (
                    <Alert
                      key={notification._id}
                      severity={notification.type || "info"}
                      action={
                        notification.read ? (
                          <CheckIcon />
                        ) : (
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            onClick={() => markNotificationAsRead(notification._id)}
                          >
                            <MarkChatReadIcon />
                          </IconButton>
                        )
                      }
                    >
                      {notification.message}
                    </Alert>
                  );
                })}
              </Stack>
            </Box>
          </Fade>
        )}
      </Popper>
    </Box>
  );
}
