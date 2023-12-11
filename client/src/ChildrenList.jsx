import React from "react";

const ChildrenList = ({ child }) => {
  return (
    <>
      <ul>
        <div className="flex gap-1 align-center content-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <input type="hidden" value={child} />
          <li className="text-xl bold">{child} </li>
        </div>
      </ul>
    </>
  );
};

export default ChildrenList;
