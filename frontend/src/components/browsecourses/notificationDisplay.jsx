import React from 'react';
import { Typography, List, ListItem, ListItemText, Container } from '@mui/material';

const NotificationDisplay = ({ notifications }) => {
  return (
    <Container>
      <Typography variant="h2">Notifications</Typography>
      <List>
        {notifications.map(notification => (
          <ListItem key={notification._id}>
            <ListItemText primary={notification.message} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default NotificationDisplay;
