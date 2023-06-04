import React, { useEffect, useState } from 'react';
import { fetchWithToken } from "../tokenManager/tokenManager";

function ConversationsHeader() {
    const [profilePic, setProfilePic] = useState('');
    const [displayName, setDisplayName] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            const user = JSON.parse(localStorage.getItem('currentUser'));
            const currentUser = user ? user.username : '';

            const req = {
                path: `Users/${currentUser}`,
                method: 'GET',
                headers: {
                    'Accept': 'text/plain',
                },
            };

            const response = await fetchWithToken(req);
            const userData = await response.json();

            setProfilePic(userData.profilePic);
            setDisplayName(userData.displayName);
        };

        fetchUserData();
    }, []);

    return (
        <header className="left-header">
            <div className="media">
                <img className="avatar" src={profilePic} alt="avatar" />
                <div className="name">{displayName}</div>
                <div className="icon">
                    <svg data-bs-toggle="modal" data-bs-target="#newModal" width="32" height="32"
                        className="bi bi-person-add" viewBox="0 0 16 16">
                        <path
                            d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                        <path
                            d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
                    </svg>
                </div>
            </div>
        </header>
    );
}

export default ConversationsHeader;
