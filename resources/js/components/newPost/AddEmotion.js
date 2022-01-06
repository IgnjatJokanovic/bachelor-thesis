import React from 'react';
import Modal from 'react-bootstrap/Modal';

export default function AddEmotion({activeModal, updateModal, emotions, updateEmotion}) {
    const hideModal = () => {
        updateModal(0);
    }

    return (
        <>
            <div className="col-2 text-center">
                <div className="insert-icons--icon second">
                    <div className="insert-icons--icon--description">
                        Feeling
                    </div>
                    <i className="fas fa-smile-beam" onClick={() => updateModal(2)}></i>
                </div>
            </div>

            <Modal show={activeModal === 2} onHide={() => hideModal()}>
                <Modal.Header closeButton>
                <Modal.Title>How are you feeling?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        {Object.keys(emotions).length && emotions.length ? emotions.map((emotion, i) => (
                            <div className='col-6 mt-2' key={i} onClick={() => updateEmotion(emotion.id)}>
                                <div className='emoji-holder'>
                                    <span className='emoji' dangerouslySetInnerHTML={{ __html: emotion.code }}></span> {emotion.desctiption}
                                </div>

                            </div>
                        )) : null}
                    </div>

                </Modal.Body>
            </Modal>
        </>

    )
}
