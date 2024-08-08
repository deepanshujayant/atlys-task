import React, { useState, Fragment, lazy, startTransition } from "react";
import { useAuth } from "../../Auth.tsx";
import postsData from "../../constants/data.ts";
import { loginFields } from "../login/login.tsx";
import LoginForm from "../../components/Login.tsx";
import Popup from "../../components/Popup.tsx";
// import RegisterForm from "../../components/Register.tsx";

const Card = lazy(() => import("../../components/Card.tsx"));

const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    startTransition(() => setPopupOpen(true));
  };
  const closePopup = () => {
    startTransition(() => {
      setPopupOpen(false);
    });
  };
  const { posts } = postsData;
  if (!user) {
    return <p>Please login to access this page.</p>;
  }
  return (
    <Fragment>
      <button
        onClick={logout}
        className="text-red-400 border-2 border-red-500 text-sm float-right p-2 rounded-md"
      >
        Logout
      </button>
      <div className="container md:w-2/3 lg:w-6/12 sm:py-1 lg:mt-10 lg:h-full mx-auto">
        <div className="user-greeting mb-4">
          <h1 className="text-[28px] font-medium mb-3">
            Hello {user?.username.toUpperCase()}
          </h1>
          <p className="text-[#7F8084]">
            How are you doing today? Would you like to share something with the
            community 🤗
          </p>
        </div>
        <div className="create-post">
          <div className="bg-[#26292D] border-2 border-[#35373B] sm:p-3 lg:p-5 mb-4 rounded-lg">
            <p className="text-[#C5C7CA] text-lg mb-3">Create Post</p>
            <div
              className={`content mb-4 bg-[#191920] p-4 rounded-lg flex items-center`}
            >
              <div className="image mr-3 bg-[#27292D] w-[44px] h-[44px] align-middle rounded-full">
                💬
              </div>
              <textarea
                className="sm:text-sm bg-transparent w-full lg:text-base"
                rows={1}
                placeholder="How are you feeling today?"
              ></textarea>
            </div>
            <div className="interactions flex justify-end items-center">
              <button
                onClick={openPopup}
                className="bg-[#4A96FF] text-base px-10 py-3 rounded-md"
              >
                Post
              </button>
            </div>
          </div>
        </div>
        <div className="posts mb-10">
          {posts.map((post) => {
            return <Card key={post.postId} post={post} />;
          })}
        </div>
      </div>
      <Popup isOpen={isPopupOpen}>
        <LoginForm isModal={true} onClose={closePopup} fields={loginFields} />
      </Popup>
    </Fragment>
  );
};

export default Home;
