import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="flex items-center justify-between py-4 px-6 bg-primary text-xl text-white text-bold">
        <div className="flex items-center  gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>

          <Link to={"/"}>Home</Link>
        </div>
        <div>
          <ul className="flex gap-3 cursor-pointer">
            <Link to={""}>Grandparents</Link>
            <Link to={""}>Parents</Link>
            <Link to={""}>Children</Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
