import Link from "next/link";
import Router from "next/router";
import { useAuth } from "@/utils/auth";
// import Logo from "/public/logo.svg";

const navItems = [
  {
    id: "0",
    label: "Home",
    link: "/",
  },
  {
    id: "1",
    label: "Search",
    link: "/comingsoon",
  },
  {
    id: "3",
    label: "Settings",
    link: "/settings",
  },
];

function NavBar() {
  const { user } = useAuth();
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="border-t-[5px] border-successGreen" />
      <div className="px-8 2xl:px-0  max-w-6xl mx-auto flex items-center justify-between h-[60px] -mb-px">
        {/* Header: Left side */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          {/* Logo */}
          <Link exact href="/">
            <div className="w-7 h-7 mr-2 rounded-full bg-successGreen cursor-pointer" />
          </Link>
          {navItems.map((item) => (
            <Link key={item.id} exact href={item.link}>
              <p className="text-base font-light hover:underline text-black cursor-pointer">
                {item.label}
              </p>
            </Link>
          ))}
        </div>
        {/* Header: Right side */}
        {/* Default */}
        <div onClick={() => Router.push("/profile")}>
          {user?.photoUrl ? (
            <img
              src={user?.photoUrl}
              className="object-cover rounded-full w-8 h-8 cursor-pointer"
            />
          ) : (
            <div className="grid place-items-center w-8 h-8 rounded-full bg-successGreen text-white cursor-pointer">
              <p className="text-xs">
                {user?.firstName[0]}
                {user?.lastName[0]}
              </p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default NavBar;
