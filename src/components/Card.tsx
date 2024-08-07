import React from "react";
import { timeAgo } from "../utils";
import { Post } from "../constants/data";

interface PostCardProps {
  post: Post;
  type: string;
}

const PostCard: React.FC<PostCardProps> = ({ post = {}, type = "post" }) => {
  const { emoji, userName, content, commentCount, timestamp } = post;
  const { relative, date } = timeAgo(timestamp);
  return (
    // border: 2px solid #35373B
    <div className="bg-[#26292D] border-2 border-[#35373B] sm:p-3 lg:p-5 mb-4 rounded-lg">
      <div className="mb-4 flex justify-between">
        {type == "post" ? (
          <div className="flex">
            <div
              title={userName}
              className="image bg-gray-400 text-black text-2xl w-[44px] h-[44px] rounded-full"
            >
              {userName.charAt(0)}
            </div>
            <div className="user-name ml-3">
              <p className="text-[#C5C7CA] text-base">{userName}</p>
              <span title={date} className="text-sm">
                {relative}
              </span>
            </div>
          </div>
        ) : (
          <>
            <p className="text-[#C5C7CA] text-lg">Create Post</p>
          </>
        )}

        {type == "post" && <button className="text-3xl mb-4">...</button>}
      </div>
      <div
        className={`content mb-4 bg-[#191920] p-4 rounded-lg flex ${
          type == "create" ? "items-center" : ""
        }`}
      >
        {type == "post" ? (
          <>
            <div className="image bg-[#27292D] w-[44px] h-[44px] rounded-full">
              {emoji}
            </div>
            <p className="sm:text-sm lg:text-base ml-3 w-fit grow-0">{content}</p>
          </>
        ) : (
          <>
            <div className="image mr-3 bg-[#27292D] w-[44px] h-[44px] align-middle rounded-full">
              💬
            </div>
            <p className="sm:text-sm lg:text-base">How are you feeling today?</p>
          </>
        )}
      </div>
      {type == "post" && (
        <div className="interactions flex items-center">
          <p className="inline-flex">
            <img src="/comment.svg" className="mr-2" alt="" />
            {commentCount} comments
          </p>
        </div>
      )}
      {type == "create" && (
        <div className="interactions flex justify-end items-center">
          <button className="bg-[#4A96FF] text-base px-10 py-3 rounded-md">
            Post
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCard;
