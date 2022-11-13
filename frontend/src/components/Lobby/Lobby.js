import React from 'react'

require('./Lobby.css')
function Lobby({ onInputChangeHandler, onStartChatButtonClick }) {
    return (
        <div className="lobby">
            <h1>react-nodejs-chat</h1>
            <label for="username">what do you want to be called? <p>We can give you a nickname if you don't want to tell us...</p></label>
            <input type="text" id="username" name="username" onChange={onInputChangeHandler} />
            <label for="chatroom">what do you want to talk about? <p>Don't know? no problem! we'll put you in general chat!</p></label>
            <input type="text" id="chatroom" name="chatroom" onBlur={onInputChangeHandler} />
            <button className="primary-btn" onClick={onStartChatButtonClick}>start chatting</button>
        </div>
    )
}

export default Lobby