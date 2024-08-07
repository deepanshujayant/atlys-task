import { Fragment, lazy } from "react";
import postsData from "../../constants/data.ts";

const Card = lazy(() => import("../../components/Card.tsx"));

const Home: React.FC = () => {
  const { posts } = postsData;
  return (
    <Fragment>
      <div className="container lg:w-6/12 sm:py-1 lg:mt-10 lg:h-full mx-auto">
        <div className="user-greeting mb-4">
          <h1 className="text-[28px] font-medium mb-3">Hello DJ</h1>
          <p className="text-[#7F8084]">
            How are you doing today? Would you like to share something with the
            community 🤗
          </p>
        </div>
        <div className="create-post">
          <Card post={{}} type="create" />
        </div>
        <div className="posts mb-10">
          {posts.map((post) => {
            return <Card key={post.postId} post={post} type="post" />;
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
