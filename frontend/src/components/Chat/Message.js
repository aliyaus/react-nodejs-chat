import React from 'react'
import moment from 'moment';

function Message({ id, message, author, timestamp, isAuthor }) {

    require('./Message.css')
    return (
        <div className="message-box" style={{ marginLeft: isAuthor ? "auto" : 0 }}>
            <div style={{ marginLeft: '1vw' }}>
                <div className="message-box-header">
                    <h5>{isAuthor ? "You" : author}</h5>
                    <p>{moment(timestamp).fromNow()}</p>
                </div>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default Message