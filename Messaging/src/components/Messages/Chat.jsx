// Chat.jsx
import React from 'react';
import { MessageLayout } from '../styles';

export default function Message({ message, isCurrentUser }) {
  const { date, messages } = message;

  return (
    <MessageLayout isCurrentUser={isCurrentUser}>
      <span>{date}</span>
      {messages.map(mess => {
        return (
          <div key={mess.id}>
            <img
              src={`https://api.dicebear.com/7.x/fun-emoji/svg?randomizeIds=false&size=50`}
              alt="avatar"
            />
            <div>
              <h5>{mess.sender.uid}</h5>
              <p>{mess.body}</p>
            </div>
          </div>
        );
      })}
    </MessageLayout>
  );
}
