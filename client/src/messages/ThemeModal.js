import React, { useState, useContext } from "react";
import { CurrentConversationContext } from '../messages/Messages';

function ThemeModal() {
    const { currConversation, setCurrConversation } = useContext(CurrentConversationContext);
    const [isModalVisible, setIsModalVisible] = useState(false);

    function changeTheme(theme) {
        document.documentElement.className = '';
        document.documentElement.classList.add(theme);
        localStorage.setItem('theme', theme);
        setCurrConversation(currConversation);
        setIsModalVisible(false);
    }

    return (
        <>
            <button type="button" className="btn theme-btn" onClick={() => setIsModalVisible(true)}>Change Theme</button>

            <div className="modal" style={{ display: isModalVisible ? "block" : "none" }} id="themeModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="themeModalLabel">Select Theme</h5>
                            <button type="button" className="btn-close" onClick={() => setIsModalVisible(false)} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <button type="button" className="btn-modal" onClick={() => changeTheme('default')}>Default</button>
                            <button type="button" className="btn-modal" onClick={() => changeTheme('dark')}>Dark</button>
                            <button type="button" className="btn-modal" onClick={() => changeTheme('girly')}>Girly</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ThemeModal;
