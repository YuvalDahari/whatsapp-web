import Chat from "./Chat";
import ChatFooter from "./ChatFooter";

function ChatSection({users, setUsers, currentUser, setCurrentUser}) {
    return (
        <div id="messages-section">
            <Chat currentUser={currentUser}/>
            <ChatFooter users={users} setUsers={setUsers} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        </div>
    );
}

export default ChatSection;