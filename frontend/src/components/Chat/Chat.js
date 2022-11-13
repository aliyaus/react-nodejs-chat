import React, { useEffect, useRef, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { chatFormState } from '../../store/atoms/chatFormAtom';
import { validateMessage } from '../../utils/validators';
import Message from './Message';
import moment from 'moment';
import Filter from 'bad-words';

function Chat({ socket, onLeaveChatButtonClick }) {

    const bottomRef = useRef(null);
    const chatForm = useRecoilValue(chatFormState)
    const [roomUsers, setRoomUsers] = useState([])
    const [message, setMessage] = useState('')
    const [messageList, setMessageList] = useState([])

    const scrollToBottom = () => {
        setTimeout(() => {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
    }

    const sendMessage = async () => {
        const error = validateMessage(message)

        if (error !== 'Invalid input') {

            const filter = new Filter()
            const sanitizedMessage = filter.clean(message)

            const messageData = {
                chatroom: chatForm.chatroom,
                author: chatForm.username,
                message: sanitizedMessage,
                timestamp: moment.now(),
            }

            await socket.emit("send_message", messageData)
            setMessageList((list) => [...list, messageData])
            setMessage('')

            scrollToBottom()
        } else {
            alert("You didn't say anything/:")
        }
    }

    // implement a debounce on input change using React useEffect
    useEffect(() => {
        const sendMessageInProgress = setTimeout(async () => {
            await socket.emit("message_inprogress", { username: chatForm.username })
        }, 500)

        return () => clearTimeout(sendMessageInProgress)

    }, [message])

    // execute whenever there is a change in the socket
    useEffect(() => {

        socket.on("update_room_users", (data) => {
            console.log("update room users emitted in client")
            setRoomUsers(data.users)
        })

        socket.on("receive_message", (data) => {
            console.log("receive message emitted in client")
            setMessageList((list) => [...list, data]);
            scrollToBottom()
        });

    }, [socket]);

    require('./Chat.css')
    return (
        <div className="chatroom">

            {/* users pane */}
            <div className="users-pane">
                <h1>users</h1>
                {
                    roomUsers.map((user, i) => (
                        <p>{user.username === chatForm.username ? "You" : user.username}</p>
                    ))
                }
            </div>

            {/* chatroom pane  */}
            <div className="chatroom-pane">

                <div className="chatroom-header">
                    <h1>welcome to {chatForm.chatroom}</h1>
                    <button className="leave-btn" onClick={onLeaveChatButtonClick}>leave?</button>
                </div>

                <div className="messages-container">
                    {
                        messageList.map((message, i) => (
                            <Message
                                id={i}
                                isAuthor={message.author === chatForm.username}
                                message={message.message}
                                author={message.author}
                                timestamp={message.timestamp} />

                        ))
                    }
                    <div ref={bottomRef} />
                </div>

                <div className="chatroom-message-footer">
                    <input
                        onChange={(event) => {
                            setMessage(event.target.value);
                        }}
                        onKeyPress={(event) => {
                            event.key === "Enter" && sendMessage();
                        }}
                        value={message}
                        className="chatroom-input"
                        type="text" id="chatroom"
                        name="chatroom" placeholder="say something..."
                    />
                    <button onClick={sendMessage} className="send-btn">send</button>
                </div>
            </div>

        </div>
    )
}

export default Chat