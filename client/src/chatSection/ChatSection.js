import Chat from "./Chat";
import ChatFooter from "./ChatFooter";

function ChatSection({refreshMessages, setRefreshMessages, refresh, setRefresh}) {
    return (
        <div id="messages-section">
            <Chat refreshMessages={refreshMessages} setRefreshMessages={setRefreshMessages}
            refresh = {refresh} setRefresh = {setRefresh} />
            <ChatFooter refreshMessages={refreshMessages} setRefreshMessages={setRefreshMessages}
            refresh = {refresh} setRefresh = {setRefresh} />
        </div>
    );
}

export default ChatSection;