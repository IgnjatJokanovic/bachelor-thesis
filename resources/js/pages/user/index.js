import React from "react";
import axios from "axios";
import Friends from "./Friends";
import { fetchUser, fetchCookie } from "../../Helpers";
import { useParams } from "react-router-dom";

export default function User() {
    const [user, setuser] = React.useState({});
    let params = useParams();

    const addFriend = () => {
        axios
            .post("/api/user/add", user, {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + fetchCookie()
                }
            })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    React.useEffect(() => {
        if (params.slug) {
            console.log(params.slug);
            axios
                .get(`/api/user/${params.slug}`)
                .then(res => {
                    console.log("data", res.data);
                    setuser(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [params.slug]);
    return (
        <div className="container user-wrapper">
            <div className="user-wrapper">
                <div className="user-wrapper--cover" url={user.cover === null ? "/img/default/default_cover.png":`/img/profile/${user.cover}`}>
                    <div className="user-wrapper--cover--top-bar">

                    </div>
                    <img src="/img/default/default_profile.png" alt="" />
                </div>
                <div className="user-wrapper--name-holder">
                    <h2>{user.name + " " + user.surname}</h2>
                </div>
                <div className="user-wrapper--menu">
                    <p onClick={addFriend}>Add Friend</p>
                </div>
                <div className="user-wrapper--main-grid">
                    <div className="user-wrapper--main-grid--left">
                        <Friends />
                    </div>
                    <div className="user-wrapper--main-grid--right">
                        <div className="user-wrapper--main-grid--right--write">
                            <input type="text" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
