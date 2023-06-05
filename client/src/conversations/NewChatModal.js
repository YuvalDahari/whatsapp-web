import React, { useEffect, useState, useContext } from "react";
import { fetchWithToken } from "../tokenManager/tokenManager";
import { RefreshContext } from '../messages/Messages';

function NewChatModal() {
    const { refresh, setRefresh } = useContext(RefreshContext);
    const [error, setError] = useState('');

    useEffect(() => {
        const closeButton = document.getElementsByClassName("btn-close")[0];
        closeButton.addEventListener("click", () => {
            setError("");
            document.getElementById('friend_name').value = "";
        });

        return () => {
            closeButton.removeEventListener("click", () => {
                setError("");
                document.getElementById('friend_name').value = "";
            });
        };
    }, []);

    function handleInputChange() {
        setError("");
    }

    async function addFriend() {
        setError(''); 

        const friend = document.getElementById('friend_name').value;
        const reqBody = {
            username: friend,
        }

        const check = {
            path: `Chats`,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        };
        const response = await fetchWithToken(check);
        let chats = await response.json();

        let isExist = chats.find(chat => chat.user.username === friend);

        if (isExist) {
            setError('You already have a chat with this user');
        }else if (friend ===  JSON.parse(localStorage.getItem('currentUser')).username) {
            setError('You cant add yourself as a chat');
        } else {
            const req = {
                path: `Chats`,
                method: 'POST',
                headers: {
                    'accept' : '*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reqBody),
            };
            const res = await fetchWithToken(req);
            if (res.status === 401) {
                setError('There is no such user');
                return;
            }
            setRefresh(!refresh);
            document.getElementsByClassName("btn-close")[0].click();
            document.getElementById('friend_name').value = "";
            setError("");
        }
    }

    return (
        <>
            <div className="modal fade" id="newModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="newModalLabel">Add new contact</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group mb-3">
                                <input
                                    id="friend_name"
                                    type="text"
                                    className="form-control"
                                    placeholder="Contact's Identifier"
                                    aria-label="Contact's Identifier"
                                    onChange={handleInputChange}
                                />
                            </div>
                            {error && <p className="text-danger">{error}</p>}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn-modal" onClick={addFriend}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewChatModal;
