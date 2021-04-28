import React from 'react'

export default function ImageModal({ src, isOpen }) {
    return (
        <div id="myModal" class={isOpen ? "modal active" : "modal"}>
            <span class="close">&times;</span>
            <img class="modal-content" id="img01" src={src} />
            <div id="caption"></div>
        </div>
    )
}
