function Conversation({ name, time, message: lastMessage, img: image, current}) {
    let mediaClass = 'media' + (current ? ' current-conversation' : '');
  
    return (
      <div className={`${mediaClass}`}>
        <img className="avatar" src={image} alt="avatar" />
          <div className="name">{name}</div>
          <div className="time">{time}</div>
          <div className="last-msg">{lastMessage}</div>
      </div>
    );
  }
  
  export default Conversation;
  