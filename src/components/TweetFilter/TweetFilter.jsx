import { useNavigate } from "react-router-dom";
import { useFilter } from "../../services/store";
import "./TweetFilter.css";

export const TweetFilter = () => {
  const navigate = useNavigate();
  const setFilter = useFilter((state) => state.setFilter);
  return (
    <div className="filter">
      <button
        className="buttonBack"
        onClick={() => {
          navigate("/");
        }}
      >
        Back
      </button>
      <select
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      >
        <option value="all" label="Show all" />
        <option value="follow" label="Follow" />
        <option value="following" label="Following" />
      </select>
    </div>
  );
};
