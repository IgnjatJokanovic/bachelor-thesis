import React from 'react'

export default function AddImage({refFile, openFile, updateImage}) {

    const getBase46 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        });
    };

    const handleFileRead = async (e) => {
        const file = e.target.files[0];
        const base64 = await getBase46(file);
        updateImage(base64);
    };



    return (
        <div className="col-2 text-center">
            <div className="insert-icons--icon">
                <div className="insert-icons--icon--description">
                    Add image
                </div>
                <i className="fas fa-image image-icon" onClick={() => openFile()}></i>
                <input ref={refFile} type="file" className="d-none" onChange={e => handleFileRead(e)}/>
            </div>
        </div>
    )
}
