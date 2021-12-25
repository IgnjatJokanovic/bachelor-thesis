import React from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import { fetchUser } from "../Helpers";
import { EmojiContext } from "../app";


export default function NewPost() {
    const   {emojiList, emotions}  = React.useContext(EmojiContext);
    const [article, setArticle] = React.useState({
        creator: fetchUser().id,
        body: "",
        image: "",
        emotion: 0,
        taged: []
    });
    const [activeModal, setActiveModal] = React.useState(0);
    const refModal = React.useRef();
    const toogleModal = e => {
        if (refModal.current.contains(e.target)) {
            return;
        }
        setActiveModal(0);
    }
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
        // axios.get("/api/reactions", {
        //     headers: { Accept: "application/json" }
        // }).then(res => {
        //     console.log(res);
        //     setEmotions(res.data);
        // })

        console.log("emotions", emotions);

        document.addEventListener("mousedown", toogleModal);

        return () => {
            document.removeEventListener("mousedown", toogleModal);
        };
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
                          <i key={i} title={emotion.placeholder} className={emotion.code + " fs-big"}/>
                      ))}
                    </div>

                </div>)
                :""}
                <div className="row justify-content-md-center">
                    <div className="col-2">
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
                    <div className="col-10">
                        <textarea rows="2" cols="56" placeholder={`What are you think about, ${fetchUser().name} ?`} onChange={e => setArticle({ ...article, body: e.target.value })}></textarea>
                    </div>


                </div>
                <div className="row justify-content-md-center mt-2 new-post-insert">


                            <div className="col-3">
                                Add to post
                            </div>
                            <div className="col-9">
                                <div className="row insert-icons">
                                    <div className="col-2 text-center">
                                        <div className="insert-icons--icon">
                                            <div className="insert-icons--icon--description">
                                                Add image
                                            </div>

                                            <i className="fas fa-image image-icon" onClick={() => openFile()}></i>
                                            <input ref={refFile} type="file" className="d-none" onChange={e => handleFileRead(e)}/>
                                        </div>
                                    </div>
                                    <div className="col-2 text-center">
                                        <div className="insert-icons--icon second">
                                            <div className="insert-icons--icon--description">
                                                Tag a friend
                                            </div>
                                            <i className="fas fa-user-tag" onClick={() => setActiveModal(1)}></i>
                                        </div>
                                    </div>
                                    <div className="col-2 text-center">
                                        <div className="insert-icons--icon second">
                                            <div className="insert-icons--icon--description">
                                                Feeling
                                            </div>
                                            <i className="fas fa-smile-beam" onClick={() => setActiveModal(2)}></i>
                                        </div>
                                    </div>
                                    <div className="col-2 text-center">
                                        <div className="insert-icons--icon second">
                                            <div className="insert-icons--icon--description">
                                                Location
                                            </div>
                                            <i className="fas fa-map-marker-alt" onClick={() => setActiveModal(3)}></i>
                                        </div>
                                    </div>
                                </div>
                            </div>



                </div>
                <div className="row justify-content-md-center mt-2">
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary btn-lg btn-block">Post</button>
                    </div>
                </div>
            </form>
            <div ref={refModal} className={activeModal === 2 ? "modal fade show d-block" : "modal fade"} id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center font-weight-bold" id="exampleModalLabel">How are you feeling?</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setActiveModal(0)}>
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className='row'>
                            {Object.keys(emotions).length && emotions.length ? emotions.map((emotion, i) => (
                                <div className='col-6'>
                                    <span className='emoji' dangerouslySetInnerHTML={{ __html: emotion.code }}></span> {emotion.desctiption}
                                </div>
                            )) : null}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div ref={refModal} className={activeModal === 1 ? "modal fade show d-block" : "modal fade"} id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center font-weight-bold" id="exampleModalLabel">Tag friends</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setActiveModal(0)}>
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                    </div>
                </div>
            </div>

            <div ref={refModal} className={activeModal === 3 ? "modal fade show d-block" : "modal fade"} id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center font-weight-bold" id="exampleModalLabel">Choose an location</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setActiveModal(0)}>
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
