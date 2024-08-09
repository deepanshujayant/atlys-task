import React, {
  useState,
  Fragment,
  lazy,
  startTransition,
  Suspense,
} from "react";
import { useAuth } from "../../Auth.tsx";
import postsData from "../../constants/data.ts";
import { registerFields } from "../signup/index.tsx";
import { loginFields } from "../login/login.tsx";
import Create from "../../components/CreatePost.tsx";

const Card = lazy(() => import("../../components/Card.tsx"));
const Popup = lazy(() => import("../../components/Popup.tsx"));
const RegisterForm = lazy(() => import("../../components/Register.tsx"));
const LoginForm = lazy(() => import("../../components/Login.tsx"));

type PopupType = "login" | "signup";

const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const [isPopupOpen, setPopupOpen] = useState<boolean>(false);
  const [popupChild, setPopupChild] = useState<PopupType>("signup");

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
        <Create openPopup={openPopup} />
        <div className="posts mb-10">
          {posts.map((post) => {
            return (
              <Suspense fallback={<p>Loading...</p>}>
                <Card key={post.postId} post={post} />
              </Suspense>
            );
          })}
        </div>
      </div>
      <Popup isOpen={isPopupOpen}>
        {popupChild == "signup" ? (
          <RegisterForm
            isModal={true}
            onClose={closePopup}
            fields={registerFields}
            setPopupChild={setPopupChild}
          />
        ) : (
          <LoginForm
            isModal={true}
            onClose={closePopup}
            setPopupChild={setPopupChild}
            fields={loginFields}
          />
        )}
      </Popup>
    </Fragment>
  );
};

export default Home;
