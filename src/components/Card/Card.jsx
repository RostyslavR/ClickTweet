import { useState } from "react";
import { iUser } from "../../services/iAxios";
import { useCurrentUser, useUserList } from "../../services/store";
import logo from "../../images/logo.svg";
import decor from "../../images/decor.png";
import "./Card.css";

const { VITE_AVATAR_URL } = import.meta.env;

const Card = (tweet) => {
  const { id, tweets, followers, avatar } = tweet;
  let following = tweet.following;
  const currentUser = useCurrentUser((state) => state.currentUser);
  const setCurrentUser = useCurrentUser((state) => state.setCurrentUser);
  const setFollowing = useUserList((state) => state.setFollowing);
  const aurl = `${VITE_AVATAR_URL}/${avatar}`;
  const [notActive, setNotActive] = useState(false);

  const handleFollowing = async () => {
    following = !following;
    let followList;
    await setFollowing({ id, following });
    following
      ? (followList = [...currentUser.follow_list, id])
      : (followList = currentUser.follow_list.filter((el) => el !== id));
    await setCurrentUser({ ...currentUser, follow_list: followList });
    try {
      const { data: s1 } = await iUser.put(`/owners/${currentUser.id}`, {
        follow_list: followList,
      });
      const { data: s2 } = await iUser.put(`/users/${id}`, {
        followers,
      });
      !(!s2 || !s1) && setNotActive(false);
    } catch (e) {
      console.log(e);
      setNotActive(false);
    }
  };

  return (
    <div className="card">
      <img src={logo} className="card-logo" alt="card logo" width={76} />
      <img src={decor} className="decor" alt="decor" width={308} />
      <div className="avatar-line">
        <img src={aurl} className="avatar" alt="avatar" width={63} />
      </div>
      <p className="tweets">{tweets.toLocaleString()} TWEETS</p>
      <p className="followers">{followers.toLocaleString()} FOLLOWERS</p>
      <button
        className={`button ${following ? "isFollowing" : ""} ${
          notActive ? "notActive" : ""
        }`}
        onClick={handleFollowing}
      >
        {following ? "FOLLOWING" : "FOLLOW"}
      </button>
    </div>
  );
};

export { Card };
