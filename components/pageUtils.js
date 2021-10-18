import React from "react";

export function PageContainer({ children, className }) {
  return <div className={`${className} w-full px-4`}>{children}</div>;
}

export const Default = ({ url }) => (
  <div className="flex-shrink-0">
    <img
      src={url}
      className="object-cover rounded-full w-[100px] h-[100px] sm:w-40 sm:h-40 cursor-pointer border-[0.5px] border-black"
    />
  </div>
);

export const InputContainer = ({ children, label }) => (
  <div>
    <p className="text-[#929297] pl-2 font-extralight sm:font-light text-xs uppercase pb-1">
      {label}
    </p>
    <div className="bg-white pl-3 py-1 divide-y divide-lightBackgroundColor rounded ">
      {children}
    </div>
  </div>
);
