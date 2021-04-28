import React from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import { fetchUser } from "../Helpers";

export default function NewPost() {
    const [article, setArticle] = React.useState({
        creator: fetchUser().id,
        body: "",
        image: "",
        taged: []
    });
    const submitPost = () => {
        axios.post("/api/post/create", article, {
            headers: { Accept: "application/json" }
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-3">
                    <Link to={`/user/${fetchUser().slug}`}>
                        <img
                            src={
                                fetchUser().profile == null
                                    ? "/img/default/default_profile.png"
                                    : fetchUser().profile
                            }
                            alt={
                                fetchUser().name + " " + fetchUser().surname
                            }
                        />
                    </Link>
                </div>
                <div className="col-9">
                    <textarea rows="3" placeholder={`What are you think about, ${fetchUser().name} ?`} onChange={e => setArticle({ ...article, body: e.target.value })}></textarea>
                </div>


            </div>
            <div className="row">
                <div className="col-5">
                    Add to post
                </div>
                <div className="col-7">
                    <div className="row insert-icons">
                        <div className="col-2">
                            <div className="insert-icons--icon">
                                <div className="insert-icons--icon--description">
                                    Add image
                                </div>
                                <i class="fal fa-image"></i>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="insert-icons--icon">
                                <div className="insert-icons--icon--description">
                                    Tag a friend
                                </div>
                                <i class="fal fa-user-tag"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" class="btn btn-primary btn-lg btn-block">Post</button>
        </div>
    )
}
