import { iUser } from "../../services/iAxios";
import { useUserList, useCurrentUser } from "../../services/store";
import { Loader } from "../Loader/Loader";
import "./ButtonLM.css";

export const ButtonLM = () => {
  const currentUser = useCurrentUser((state) => state.currentUser);
  const { addUserList, getPage, isLoading, setIsLoading, setEofList } =
    useUserList();

  const handleLoadMore = async () => {
    const page = getPage() + 1;
    setIsLoading(true);

    try {
      const { data } = await iUser.get("/users", {
        params: { page, l: 3 },
      });
      if (data.length > 0) {
        const list = data.map((user) => {
          user.following = currentUser.follow_list.includes(user.id);
          return user;
        });
        addUserList(list);
      } else {
        setEofList(true);
      }
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <button className="buttonLM" type="button" onClick={handleLoadMore}>
      Load more
    </button>
  );
};
