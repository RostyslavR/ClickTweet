import { useEffect } from "react";
import { iUser } from "../../services/iAxios";
import { useUserList, useCurrentUser, useFilter } from "../../services/store";

import "./TweetList.css";
import { Card } from "../Card/Card";

export const TweetList = () => {
  const currentUser = useCurrentUser((state) => state.currentUser);
  const { setUserList, setPage, setIsLoading } = useUserList();
  const filter = useFilter((state) => state.filter);
  const userList = useUserList((state) => state.userList);

  const getUserList = async () => {
    if (userList.length === 0) {
      setIsLoading(true);
      setPage(1);
      try {
        const { data } = await iUser.get("/users", {
          params: { page: 1, l: 3 },
        });
        const list = data.map((user) => {
          user.following = currentUser.follow_list.includes(user.id);
          return user;
        });
        setUserList(list);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    getUserList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterUL = (ul) => {
    switch (filter) {
      case "follow":
        return ul.filter((user) => !user.following);
      case "following":
        return ul.filter((user) => user.following);
      default:
        return ul;
    }
  };

  return (
    <ul className="tweetList">
      {filterUL(userList).map((tweet) => (
        <li key={tweet.id}>
          <Card {...tweet} />
        </li>
      ))}
    </ul>
  );
};
