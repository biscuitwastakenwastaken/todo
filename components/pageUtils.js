import React from "react";

export function PageContainer({ children }) {
  return <div className="w-full px-4">{children}</div>;
}

export const Default = ({ url }) => (
  <div className="flex-shrink-0">
    <img
      src={url}
      className="object-cover rounded-full w-[100px] h-[100px] sm:w-40 sm:h-40 cursor-pointer border-[0.5px] border-black"
    />
  </div>
);
