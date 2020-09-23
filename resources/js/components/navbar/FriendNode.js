import React from "react";
import { Link } from "react-router-dom";

export default function FriendNode({
    src,
    name,
    surname,
    slug,
    accept,
    decline
}) {
    return (
        <div className="row">
            <Link className="col-6 row" to={`/user/${slug}`}>
                <div className="col-6">
                    <img
                        src={
                            src == null
                                ? "/img/default/default_profile.png"
                                : src
                        }
                        alt={name + surname}
                    />
                </div>
                <div className="col-6">
                    <p>{name + " " + surname}</p>
                </div>
            </Link>
            <div className="col-6 row">
                <span className="btn btn-primary col-4" onClick={accept}>
                    Accept
                </span>
                <span className="btn btn-primary col-4" onClick={decline}>
                    Decline
                </span>
            </div>
        </div>
    );
}
