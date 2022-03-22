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
                <Modal.Body>
                    <div className='row'>
                        <div className='col-8 friend-search-bar'>
                            <span className='friend-search-bar--search-icon'>
                                <i className="fas fa-search"></i>
                            </span>
                            <input type='text' className='friend-search-bar--input' placeholder='Search for friends'/>
                        </div>
                        <div className='col-4'>
                            <button className='btn btn-primary text-center'>
                                Add
                            </button>
                        </div>
                    </div>

                </Modal.Body>
            </Modal>
        </>
    )
}
