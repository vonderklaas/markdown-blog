---
title: React Todo in 38 Lines!
description: Wonder if it is possible to write a todo in 38 lines? You need to check this out!
author: Nick Garbalau
authorImage: https://avatars.githubusercontent.com/u/53371076?v=4
coverImage: https://play-lh.googleusercontent.com/HUuQc4Zpl6x7fUyX-jFMmcuUbW77REw4UKl5rfhHfP4VY6ctBU1w1I_RZWsXaojFgIo
date: '26 Jan 2023'
---

## Code

```
import { useState } from 'react';

const App = () => {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  return (
    <div>
      <input
        type='text'
        value={message}
        placeholder='Enter a message'
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <input
        type='button'
        value='Add'
        onClick={() => {
          setMessageList([
            ...messageList,
            {
              id: messageList.length + 1,
              message: message,
            },
          ]);
          setMessage('');
        }}
      />
      <ul>
        {messageList.map((m) => (
          <li key={m.id}>{m.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
```

## Challenge

Can squeeze it even more? Waiting for you to try!
