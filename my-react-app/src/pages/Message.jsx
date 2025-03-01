import { useEffect, useState } from 'react';
import { fetchData } from '../api/check';
import { toast } from 'react-toastify';
import { initSocket, closeSocket, sendMessage, sendPrivateMessage, sendMessageToRoom, onMessageReceived, onPrivateMessageReceived, onRoomMessageReceived, leaveRoom } from '../api/socketService';

function Message() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [socket, setSocket] = useState(null);
  const [messageHistory, setMessageHistory] = useState([]);
  const [room, setRoom] = useState(''); // State for room name
  const token = sessionStorage.getItem('access_token');

  useEffect(() => {
    if (token) {
      const newSocket = initSocket(token);
      setSocket(newSocket);

      // Listen for public messages
      onMessageReceived((data) => {
        console.log('Received public message:', data);
        setMessageHistory((prevHistory) => [...prevHistory, data.text]);
        toast(data.text);
      });

      // Listen for private messages
      onPrivateMessageReceived((data) => {
        console.log('Received private message:', data);
        setMessageHistory((prevHistory) => [
          ...prevHistory,
          `Private message from ${data.user}: ${data.text}`,
        ]);
        toast(`Private message from ${data.user}: ${data.text}`);
      });

      // Listen for messages from the room
      onRoomMessageReceived((data) => {
        console.log('Received room message:', data);
        setMessageHistory((prevHistory) => [
          ...prevHistory,
          `Room message from ${data.user}: ${data.text}`,
        ]);
        toast(`Room message from ${data.user}: ${data.text}`);
      });

      return () => {
        closeSocket();
      };
    }
  }, [token]);

  useEffect(() => {
    const test = async () => {
      try {
        const response = await fetchData();
        setData([...response]);
      } catch (error) {
        console.error(error);
        setData([]);
      }
    };
    test();
  }, []);

  const handleClick = () => {
    setCount(count + 1);
  };

  const notify = () => toast('Wow so easy!');

  const sendMessageHandler = () => {
    if (socket && message) {
      sendMessage(message); // Send public message
      setMessage(''); // Clear the message input field
    } else {
      toast.error('Please enter a message before sending!');
    }
  };

  const sendPrivateMessageHandler = () => {
    if (socket && recipientId && message) {
      sendPrivateMessage(recipientId, message); // Send private message
      setMessage(''); // Clear message input after sending
    } else {
      toast.error('Please enter a message and recipient ID.');
    }
  };

  // Handle joining a room
  const joinRoomHandler = () => {
    if (socket && room) {
      socket.emit('join-room', room); // Emit join-room event to the server
      toast(`Joined room: ${room}`);
      setRoom(''); // Clear room input field
    } else {
      toast.error('Please enter a room name.');
    }
  };

  // Handle sending message to a room
  const sendMessageToRoomHandler = () => {
    if (socket && room && message) {
      sendMessageToRoom(room, message); // Send message to the room
      setMessage(''); // Clear message input after sending
    } else {
      toast.error('Please enter a message and select a room.');
    }
  };

  // Handle exiting a room
  const exitRoomHandler = () => {
    if (socket && room) {
      leaveRoom(room); // Call the leaveRoom function from socketService
      toast(`Exited room: ${room}`);
      setRoom(''); // Clear the room input field
    } else {
      toast.error('Please join a room before exiting.');
    }
  };

  return (
    <div className="w-screen min-h-screen text-center flex flex-col items-center justify-center space-y-4">
      <div className="flex items-center justify-center">
        <button
          onClick={handleClick}
          className="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm hover:shadow-md bg-stone-800 hover:bg-stone-700 relative bg-gradient-to-b from-stone-700 to-stone-800 border-stone-900 text-stone-50 rounded-lg hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 hover:border-stone-900 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),inset_0_-2px_0px_rgba(0,0,0,0.35)] after:pointer-events-none transition antialiased"
        >
          Button
        </button>
      </div>

      <button onClick={notify}>Notify!</button>

      <h1 className="text-3xl font-bold underline">Message</h1>
      <p>Count: {count}</p>

      {/* Display fetched data */}
      <div>
        {data.length > 0 ? (
          data.map((item, index) => (
            <div key={index}>
              <p>{item.username}</p>
            </div>
          ))
        ) : (
          <p>No data found</p>
        )}
      </div>

      {/* Message History */}
      <div className="w-full h-48 overflow-y-scroll border border-gray-300 p-4 mt-4">
        <h2 className="text-xl font-semibold mb-2">Chat History</h2>
        {messageHistory.length > 0 ? (
          messageHistory.map((msg, index) => (
            <div key={index} className="text-left bg-gray-100 p-2 my-2 rounded-lg">
              <p>{msg}</p>
            </div>
          ))
        ) : (
          <p>No messages yet</p>
        )}
      </div>

      {/* Message input field */}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)} // Update message on text input change
        placeholder="Type your message here"
        className="w-64 h-24 p-2 border border-gray-300 rounded-md mt-4"
      />

      {/* Recipient ID input field for private message */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Recipient ID"
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)} // Set recipient's socket ID
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Room input field */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Room Name"
          value={room}
          onChange={(e) => setRoom(e.target.value)} // Set room name
          className="p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className=' flex gap-2'>
        <div className="mt-4">
          <button
            onClick={joinRoomHandler}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Join Room
          </button>
        </div>

        <div className="mt-4">
          <button
            onClick={sendMessageToRoomHandler}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Send Message to Room
          </button>
        </div>

        <div className="mt-4">
          <button
            onClick={sendPrivateMessageHandler}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Send Private Message
          </button>
        </div>

        <div className="mt-4" >
          <button
            onClick={sendMessageHandler}
            className=" bg-blue-500 text-white px-4 py-2 rounded"
          >
            Send Message
          </button>
        </div>

        <div className="mt-4">
          <button
            onClick={exitRoomHandler} // Exit room button
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Exit Room
          </button>
        </div>
      </div>

    </div>
  );
}

export default Message;
