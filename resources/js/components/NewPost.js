import React from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import { fetchUser } from "../Helpers";


export default function NewPost() {
    const [emotions, setEmotions] = React.useState([]);
    const [article, setArticle] = React.useState({
        creator: fetchUser().id,
        body: "",
        image: "",
        emotion: 0,
        taged: []
    });
    const refFile = React.useRef(null);
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
        console.log(base64);
        setArticle({ ...article, image: base64});
    };
    const openFile = () => {
        refFile.current.click();
    }
    const submitPost = () => {
        axios.post("/api/post/create", article, {
            headers: { Accept: "application/json" }
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
    };
    const resetEmotion = () => {
        console.log("pocetak", article.emotion);
        setArticle({...article, emotion: 0});
        console.log("IZMENA", article.emotion);
    };
    React.useEffect(() => {
        axios.get("/api/reactions", {
            headers: { Accept: "application/json" }
        }).then(res => {
            console.log(res);
            setEmotions(res.data);
        })
    }, []);
    return (
        <div className="container new-post">
            <form onSubmit={e => {
                e.preventDefault();
                submitPost();
            }}>
                {article.emotion != 0 ? (
                <div className="row justify-content-md-center mb-1">
                    <div className="col-7">
                      <span onClick={() => setArticle({...article, emotion: 0})} className="font-weight-bold text-danger fs-big cur">&times;</span>  Feeling: {emotions.filter(item => item.id == article.emotion).map((emotion, i) => (
                          <i key={i} title={emotion.placeholder} className={emotion.icon + " fs-big"}/>
                      ))}
                    </div>

                </div>)
                :""}
                <div className="row justify-content-md-center">
                    <div className="col-1">
                        <Link to={`/user/${fetchUser().slug}`}>
                            <img
                                className="float-right"
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
                    <div className="col-6">
                        <textarea rows="2" cols="56" placeholder={`What are you think about, ${fetchUser().name} ?`} onChange={e => setArticle({ ...article, body: e.target.value })}></textarea>
                    </div>


                </div>
                <div className="row justify-content-md-center mt-2">
                    <div className="col-2">
                        Add to post
                    </div>
                    <div className="col-5">
                        <div className="row insert-icons">
                            <div className="col-2 text-center">
                                <div className="insert-icons--icon">
                                    <div className="insert-icons--icon--description">
                                        Add image
                                    </div>

                                    <i className="fas fa-image" onClick={() => openFile()}></i>
                                    <input ref={refFile} type="file" className="d-none" onChange={e => handleFileRead(e)}/>
                                </div>
                            </div>
                            <div className="col-2 text-center">
                                <div className="insert-icons--icon second">
                                    <div className="insert-icons--icon--description">
                                        Tag a friend
                                    </div>
                                    <i className="fas fa-tags"></i>
                                </div>
                            </div>
                            <div className="col-2 text-center">
                                <div className="insert-icons--icon second">
                                    <div className="insert-icons--icon--description emotions">
                                        {emotions.map((item, i) => (
                                            <i key={i} title={item.placeholder} className={item.icon} onClick={() => setArticle({...article, emotion: item.id})}/>
                                        ))}
                                    </div>

                                    <button type="button" className="btn btn-primary">Emotion</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-md-center mt-2">
                    <div className="col-7">
                        <button type="submit" className="btn btn-primary btn-lg btn-block">Post</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
