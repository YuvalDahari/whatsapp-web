import Chat from "./Chat";
import ChatFooter from "./ChatFooter";

function ChatSection() {
    return (
        <div id="messages-section">
            <Chat />
            <ChatFooter />
        </div>
    );
}

export default ChatSection;