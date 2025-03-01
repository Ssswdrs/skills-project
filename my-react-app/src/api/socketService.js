import io from 'socket.io-client';

let socket = null;

export const initSocket = (token) => {
  // Check if token is provided
  if (!token) {
    console.error('Socket connection error: No token provided');
    return null;
  }

  if (!socket) {
    socket = io('http://localhost:8080', {
      auth: { token },
      reconnectionAttempts: 5, // Set a limit for reconnection attempts
      reconnectionDelay: 1000, // Delay before attempting to reconnect
      transports: ['websocket'], // Use websocket transport
    });

    // Listen for connection errors
    socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err.message);
      socket = null; // Reset the socket on connection failure
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
      socket = null; // Reset the socket on disconnect
    });

    socket.on('connect', () => {
      console.log('Socket connected');
    });

    return socket;
  }

  return socket;
};

export const closeSocket = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};

export const sendMessage = (message) => {
  if (socket && message) {
    socket.emit('message', message);
  } else {
    console.error('Socket is not connected or message is empty');
  }
};

// Send private message to a specific recipient
export const sendPrivateMessage = (recipientId, message) => {
  if (socket && recipientId && message) {
    socket.emit('private-message', { recipientId, message });
  } else {
    console.error('Socket is not connected, recipientId or message is empty');
  }
};

// Listen for incoming messages
export const onMessageReceived = (callback) => {
  if (socket) {
    socket.on('message', (data) => {
      callback(data);
    });
  } else {
    console.error('Socket not initialized');
  }
};

// Listen for incoming private messages
export const onPrivateMessageReceived = (callback) => {
  if (socket) {
    socket.on('private-message', (data) => {
      callback(data);
    });
  } else {
    console.error('Socket not initialized');
  }
};

// Listen for incoming room messages
export const onRoomMessageReceived = (callback) => {
  if (socket) {
    socket.on('room-message', (data) => {
      callback(data);
    });
  } else {
    console.error('Socket not initialized');
  }
};

// Join a specific room
export const joinRoom = (room) => {
  if (socket && room) {
    socket.emit('join-room', room);
    console.log(`Joined room: ${room}`);
  } else {
    console.error('Socket is not connected or room is not specified');
  }
};

// Leave a specific room
export const leaveRoom = (room) => {
  if (socket && room) {
    socket.emit('leave-room', room);
    console.log(`Left room: ${room}`);
  } else {
    console.error('Socket is not connected or room is not specified');
  }
};

// Send a message to a specific room
export const sendMessageToRoom = (room, message) => {
  if (socket && room && message) {
    socket.emit('room-message', { room, message });
    console.log(`Message sent to room ${room}: ${message}`);
  } else {
    console.error('Socket is not connected, room or message is not specified');
  }
};
