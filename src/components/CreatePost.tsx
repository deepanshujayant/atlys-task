import React from "react";

interface CreateProps {
  openPopup: () => void;
}

const Create: React.FC<CreateProps> = ({ openPopup }) => {
  return (
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
  );
};

export default Create;
