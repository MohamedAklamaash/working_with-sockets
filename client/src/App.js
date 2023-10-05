import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5001");

const App = () => {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [receivedMsgs, setReceivedMsgs] = useState("");

  // Function to join a room
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room); // Emit the "join_room" event
    }
  };

  const handleSubmit = () => {
    if (room !== "") {
      socket.emit("send_message", { message, room });
      setRoom("");
    } else {
      socket.emit("broadcast_msg", { message });
    }
  };

  useEffect(() => {
    socket.on("receive_msg", (data) => {
      console.log(data);
      setReceivedMsgs(data.message);
    });
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Room Name"
        onChange={(event) => setRoom(event.target.value)}
      />
      <button type="submit" onClick={joinRoom}>
        Join Room
      </button>
      <br />
      <input
        type="text"
        placeholder="Message"
        onChange={(event) => setMessage(event.target.value)}
      />
      <button type="submit" onClick={handleSubmit}>
        Send Message
      </button>
      <br />
      <h1>{receivedMsgs}</h1>
    </div>
  );
};

export default App;
