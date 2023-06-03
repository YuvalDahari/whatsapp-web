function Message({text, time, side}) {
    let messageClass = 'message message-' + side;
    return (
        <div className={messageClass}>
            <div className="text">{text}</div>
            <div className="time">{time}</div>
        </div>
    );
}

export default Message;