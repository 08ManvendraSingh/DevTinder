import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice";
import FeedCard from "./FeedCard";
import no_feed from "../assets/no_feed.jpeg";
import { API_URL } from "../utils/constants";
import ShimmerCard from "./Shimmer";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const fetchFeed = async () => {
    // if (feed) return;
    try {
      const response = await axios.get(`${API_URL}/user/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(response?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if (!feed) return <ShimmerCard/>;

  return (

    <main className="flex-1 flex items-center justify-center overflow-y-auto  p-8">
      {feed.length > 0 ? (
        <FeedCard info={feed[0]} />
      ) : (
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          {/* Image */}
          <img
            src={no_feed}
            alt="Empty Feed"
            className="w-80 h-60 object-cover rounded-lg shadow-md"
          />
          {/* Message */}
          <div>
            <h2 className="text-2xl font-bold">Your feed is empty</h2>
            <p className="mt-2">
              Looks like there are no feed to show right now.
            </p>
          </div>
        </div>
      )}
    </main>
  );
};

export default Feed;
