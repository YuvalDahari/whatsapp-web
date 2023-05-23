import { AddFriend } from "../Users/user";

function NewChatModal({users, setUsers, currentUser, setCurrentUser }) {

    const addFriend = () => {
        AddFriend(users, setUsers, currentUser, setCurrentUser, document.getElementById('friend_name').value);
        document.getElementsByClassName("btn-close")[0].click();
        document.getElementById('friend_name').value = "";
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
                                <input id="friend_name" type="text" className="form-control" placeholder="Contact's Identifier"
                                    aria-label="Contact's Identifier"/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={addFriend}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewChatModal;
