function ChatHeader({name, img}) {
    if(!img) {
        return (
            <header className="right-header">
                <div className="text">Add a friend to start chating</div>
            </header>
        );
    }
    return (
        <header className="right-header">
                <img className="avatar" src={img} alt="avatar" />
                <div className="media-body">
                    {name}
            </div>
        </header>
    );
}

export default ChatHeader;