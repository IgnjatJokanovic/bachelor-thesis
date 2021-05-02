import React from 'react';
import { ImageContext } from "../app";


export default function OpenableImage({src, alt = "Placeholdrer"}) {
    const  imagePreview  = React.useContext(ImageContext);
    return (
        <img src={src}  onClick={() => imagePreview(src)} />
    )
}
