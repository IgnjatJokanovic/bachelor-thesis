import React from 'react'
import axios from 'axios'
import Friends from "./Friends";

export default function User({ match }) {
  const [user, setuser] = React.useState({});

  React.useEffect(() => {
    if (match.params.slug) {
      axios.get(`/api/user/${match.params.slug}`).then(res => {
        setuser(res.data);
      }).catch(err => { console.log(err) })
    }
  }, [])
  return (


    <div className="container">
      <div className="user-wrapper">
        <div className="user-wrapper--cover">
          <img src="/img/default/default_profile.png" alt="" />
        </div>
        <div className="user-wrapper--name-holder">
          <h2>{user.name + ' ' + user.surname}</h2>
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

  )
}
