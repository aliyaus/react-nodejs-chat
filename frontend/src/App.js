import React, { useState } from 'react'
import Lobby from './components/Lobby/Lobby';
import Chat from './components/Chat/Chat';
import { chatFormState, InitialChatForm } from './store/atoms/chatFormAtom';
import { useRecoilState } from 'recoil';
import io from 'socket.io-client';
import { validateFormInput } from './utils/validators';

// connect to local backend 
const socket = io("http://localhost:5000");

function App() {

  const [chatForm, setChatForm] = useRecoilState(chatFormState)

  const [error, setError] = useState('')
  const [inLobby, setInLobby] = useState(true)


  const onInputChangeHandler = (e) => {
    const field = e.target.id
    const val = e.target.value

    setChatForm({
      ...chatForm,
      [field]: val
    })

  }

  const generateRandomUserName = () => {
    let result = "user-"
    return result + Math.random().toString(16).substr(2, 8);
  }

  const onStartChatButtonClick = () => {
    const { username, chatroom } = chatForm;
    const nameError = validateFormInput(username)
    const roomError = validateFormInput(chatroom)

    if (nameError === "" && roomError === "") {
      setInLobby(false)
      let finalUsername = chatForm.username
      let finalChatroom = chatForm.chatroom
      if (finalUsername === '') {
        finalUsername = generateRandomUserName()
        setChatForm({
          ...chatForm,
          username: finalUsername
        })
      }
      socket.emit("join_room", { username: finalUsername, chatroom: finalChatroom });
    } else {
      alert(nameError || roomError)
    }

  }

  const onLeaveChatButtonClick = async () => {
    await socket.emit("leave_room", { username: chatForm.username, chatroom: chatForm.chatroom })
    setInLobby(true)
    setChatForm(InitialChatForm)
  }

  require('./App.css')
  return (
    <div className="App">

      {
        inLobby ?
          <Lobby
            onInputChangeHandler={onInputChangeHandler}
            onStartChatButtonClick={onStartChatButtonClick} /> :
          <Chat socket={socket} onLeaveChatButtonClick={onLeaveChatButtonClick} />
      }
    </div>
  );
}

export default App;
