import React from 'react';
import { ImageContext } from "../app";

export default function ImageModal({open, src, togleFun, refImg}) {
    // const { setImgObj, imgObj } = React.useContext(ImageContext);



    return (
        <div className={open ? "custom-modal active" : "custom-modal"}>
            <span className="custom-modal--close" onClick={() => togleFun()}>&times;</span>
            <img ref={refImg} className="custom-modal--content" src={src} />
        </div>
    )
}
