import React from 'react';
import Modal from 'react-bootstrap/Modal';


export default function TagFriends({activeModal, updateModal, friends, setFriends}) {
    const hideModal = () => {
        updateModal(0);
    }
    return (
        <>
            <div className="col-2 text-center" >
                <div className="insert-icons--icon second">
                    <div className="insert-icons--icon--description">
                        Tag a friend
                    </div>
                    <i className="fas fa-user-tag" onClick={e => updateModal(1)}></i>
                </div>
            </div>

            <Modal show={activeModal === 1} onHide={() => hideModal()}>
                <Modal.Header closeButton>
                <Modal.Title>Tag friends</Modal.Title>
                </Modal.Header>
                <Modal.Body> ...

                </Modal.Body>
            </Modal>
        </>
    )
}
