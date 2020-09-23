import React from "react";

export default function Alert({ alertMessage, alertState }) {
    return alertMessage.length ? (
        <div
            className={
                alertState === "success"
                    ? "alertt alertt--visible alertt--success"
                    : "alertt alertt--visible alertt--danger"
            }
        >
            {alertMessage}
        </div>
    ) : (
        <div
            className={
                alertMessage === "success"
                    ? "alertt alertt--success"
                    : "alertt alertt--danger"
            }
        >
            {alertMessage}
        </div>
    );
}
