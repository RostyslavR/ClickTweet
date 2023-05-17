import { TweetList } from "../components/TweetList/TweetList";
import { TweetFilter } from "../components/TweetFilter/TweetFilter";
import { ButtonLM } from "../components/ButtonLM/ButtonLM";

const Tweets = () => {
  return (
    <div>
      <TweetFilter />
      <TweetList />
      <ButtonLM />
    </div>
  );
};

export default Tweets;
