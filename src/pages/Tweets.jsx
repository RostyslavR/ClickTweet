import { TweetList } from "../components/TweetList/TweetList";
import { TweetFilter } from "../components/TweetFilter/TweetFilter";
import { ButtonLM } from "../components/ButtonLM/ButtonLM";
import { useUserList } from "../services/store";

const Tweets = () => {
  const eofList = useUserList((state) => state.eofList);

  return (
    <div className="tweets-page">
      <TweetFilter />
      <TweetList />
      {!eofList && <ButtonLM />}
    </div>
  );
};

export default Tweets;
