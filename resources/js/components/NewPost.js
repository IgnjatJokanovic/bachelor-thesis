import React from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import { fetchUser } from "../Helpers";
import { EmojiContext } from "../app";
import AddImage from './newPost/AddImage';
import TagFriends from './newPost/TagFriends';
import AddEmotion from './newPost/AddEmotion';
import AddLocation from './newPost/AddLocation';

export default function NewPost() {
    const   {emojiList, emotions}  = React.useContext(EmojiContext);
    const [article, setArticle] = React.useState({
        creator: fetchUser().id,
        body: null,
        image: null,
        emotion: null,
        taged: [],
        address: null,
        wallId: null
    });
    const refFile = React.useRef(null);

    const [activeModal, setActiveModal] = React.useState(0);

    const openFile = () => {
        refFile.current.click();
    }

    const updateAddress = (address) => {
        var newAddress = address === null ? address : address.formatted_address;
        setArticle({...article, address: newAddress});
        setActiveModal(0);
    }

    const updateImage = (image) => {
        setArticle({...article, image: image});
        setActiveModal(0);
    }

    const updateEmotion = (emotion) => {
        setArticle({...article, emotion: emotion});
        setActiveModal(0);
    }

    const updateFriends = (friends) => {

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

    React.useEffect(() => {
        // axios.get("/api/reactions", {
        //     headers: { Accept: "application/json" }
        // }).then(res => {
        //     console.log(res);
        //     setEmotions(res.data);
        // })
    }, []);
    return (
        <div className="container new-post">
            <form onSubmit={e => {
                e.preventDefault();
                submitPost();
            }}>
                <div className="row justify-content-md-center">
                    <div className="col-2 d-flex justify-content-center">
                        <Link to={`/user/${fetchUser().slug}`}>
                            <img
                                className=" user-picture"
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
                    <div className="col-10 no-padding">
                        <div className='col-12 no-padding'>
                            <span>
                                <b>{fetchUser().name} {fetchUser().surname}</b>&nbsp;
                                {article.address !== null ? (
                                    <span>
                                        <span className='remove-link' onClick={() => updateAddress(null)}>&times;</span>&nbsp; is at <span className='editable-link' onClick={() => setActiveModal(3)}>{article.address}</span>&nbsp;
                                    </span>
                                ) : ""}

                                {article.emotion !== null ? (
                                    <span>
                                        <span className='remove-link' onClick={() => updateEmotion(null)}>&times;</span>&nbsp; is feeling {emotions.filter(item => item.id == article.emotion).map((item, i) => (
                                                <span key={i}>
                                                    <span className='editable-link' onClick={() => setActiveModal(2)}> {item.desctiption}</span>&nbsp;
                                                    <span dangerouslySetInnerHTML={{ __html: item.code }}></span>
                                                </span>
                                            ))}
                                    </span>
                                ) : ""}
                            </span>
                        </div>
                        <div className='col-12 mt-3 text-area no-padding'>

                            <div className='text-area--emoji'>
                                <div className='text-area--emoji--emoji-holder'>
                                    <div className='row'>
                                        {emojiList.map((item, i) => (
                                            <div  className='col-2 text-center text-area--emoji--emoji-holder--emoji' key={i}  dangerouslySetInnerHTML={{ __html: item.code }}>

                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <i className="fas fa-smile"></i>
                            </div>
                            <textarea rows="3" dangerouslySetInnerHTML={{ __html: article.body }}  placeholder={`What are you think about, ${fetchUser().name} ?`} onChange={e => setArticle({ ...article, body: e.target.value })}></textarea>
                        </div>

                    </div>


                </div>
                {article.image != null ?(
                    <div className='preview-post-image'>
                        <div className='preview-post-image--controlls'>
                            <div className='preview-post-image--controlls--edit'>
                                <button type='button' className='btn btn-light' onClick={() => openFile()}>Edit</button>
                            </div>
                            <div className='preview-post-image--controlls--close' onClick={() => updateImage(null)}>
                                &times;
                            </div>
                        </div>
                        <img className='preview-upload-image' src={article.image} />
                    </div>
                 )
                : ""}
                <div className="row justify-content-md-center mt-2 new-post-insert">
                    <div className="col-3 my-auto">
                        Add to post
                    </div>
                    <div className="col-9">
                        <div className="row insert-icons">
                            <AddImage refFile={refFile} openFile={openFile} updateImage={updateImage} />
                            <TagFriends activeModal={activeModal} updateModal={setActiveModal} />
                            <AddEmotion activeModal={activeModal} updateModal={setActiveModal} updateEmotion={updateEmotion} emotions={emotions} />
                            <AddLocation activeModal={activeModal} updateModal={setActiveModal} updateAddress={updateAddress} />
                        </div>
                    </div>
                </div>
                <div className="row justify-content-md-center mt-2 ">
                    <div className="col-12 no-padding">
                        <button type="submit" className="btn btn-primary btn-lg btn-block">Post</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
