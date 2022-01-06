import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Autocomplete from "react-google-autocomplete";

export default function AddLocation({activeModal, updateModal, updateAddress}) {
    const hideModal = () => {
        updateModal(0);
    }
    return (
        <>
            <div className="col-2 text-center">
                <div className="insert-icons--icon second">
                    <div className="insert-icons--icon--description">
                        Location
                    </div>
                    <i className="fas fa-map-marker-alt" onClick={() => updateModal(3)}></i>
                </div>
            </div>

            <Modal show={activeModal === 3} onHide={() => hideModal()}>
                <Modal.Header closeButton>
                <Modal.Title>Choose an location</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Autocomplete
                        className='z-index-10'
                        apiKey={process.env.MIX_GOOGLE_MAPS_KEY}
                        onPlaceSelected={(value) => {
                            updateAddress(value);
                        }}
                    />

                </Modal.Body>
            </Modal>
        </>
    )
}
