// src/components/Notifications.js

import React from 'react';

const Notifications = ({ notifications }) => {
  if (!notifications || notifications.length === 0) return <p>No notifications</p>;

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
