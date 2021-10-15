import React from "react";

const Header = ({ title, subtitle }) => {
  return (
    <div className="mx-4 flex items-center justify-between mb-4 sm:mb-8">
      <div>
        <p className="text-base">{subtitle}</p>
        <p className="text-3xl md:text-4xl font-medium text-gray-800">
          {title}
        </p>
      </div>
    </div>
  );
};

export default Header;
