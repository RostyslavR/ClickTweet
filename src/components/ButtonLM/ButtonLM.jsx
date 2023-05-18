import { iUser } from "../../services/iAxios";
import { useUserList, useCurrentUser } from "../../services/store";
import "./ButtonLM.css";

export const ButtonLM = () => {
  const currentUser = useCurrentUser((state) => state.currentUser);
  const addUserList = useUserList((state) => state.addUserList);
  const getPage = useUserList((state) => state.getPage);
  const isLoading = useUserList((state) => state.isLoading);
  const setIsLoading = useUserList((state) => state.setIsLoading);

  const handleLoadMore = async () => {
    const page = getPage() + 1;
    setIsLoading(true);

    try {
      const { data } = await iUser.get("/users", {
        params: { page, l: 3 },
      });
      const list = data
        .filter((user) => user.id !== currentUser.id)
        .map((user) => {
          user.following = currentUser.follow_list.includes(user.id);
          return user;
        });
      addUserList(list);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return isLoading ? (
    <div>Loadin...</div>
  ) : (
    <button className="buttonLM" type="button" onClick={handleLoadMore}>
      Load more
    </button>
  );
};
