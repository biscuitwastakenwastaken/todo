import { useEffect, useState } from "react";
import { useAuth } from "@/utils/auth";
import Loading from "@/components/Loading";
import LoginPage from "@/components/Auth/LoginPage";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import { PageContainer } from "@/components/pageUtils";
import { BsPlus } from "react-icons/bs";

const tabs = ["programs", "analytics"];
export default function Home() {
  const { user, signout, loading, setError, sendVerificationEmail, authUser } =
    useAuth();

  const [activeTab, setActive] = useState("programs");
  const [search, setSearch] = useState("");

  const tabHandler = () => {
    if (activeTab === "programs") {
      setActive("analytics");
      return true;
    }
    setActive("programs");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      alert(search.length ? search : "Nothing was entered");
    }
  };

  // console.log(user);
  // console.log(authUser);

  if (loading) {
    return <Loading />;
  }
  if (!authUser) {
    return <LoginPage />;
  }
  if (!authUser.emailVerified) {
    useEffect(() => {
      setError("You have not verified your account.");
      // sendVerificationEmail(authUser);
    }, []);
    return <LoginPage />;
  }
  return (
    <Layout>
      <Header title="My Dashboard" subtitle="Home" />

      <PageContainer>
        <Search
          search={search}
          setSearch={setSearch}
          handleKeyDown={handleKeyDown}
        />
        <Tabs tabs={tabs} activeTab={activeTab} onClick={() => tabHandler()} />

        {activeTab === "programs" ? (
          <div>
            <div className="space-y-8 pt-8">
              <ListItems title="" />
              <ListItems title="Your exercises" />
              <ListItems title="Paid programs" />
              <ListItems title="Saved" />
              <ListItems title="Your followed coaches" />
            </div>
          </div>
        ) : (
          <div>
            <p className="pt-8">cool analytics</p>
          </div>
        )}
      </PageContainer>
    </Layout>
  );
}

const Search = ({ search, setSearch, handleKeyDown }) => (
  <div className="border-2 py-1 px-3 flex justify-between">
    <input
      className="flex-grow outline-none "
      type="text"
      placeholder="Search something cool..."
      value={search}
      onChange={(event) => setSearch(event.target.value)}
      name="search"
      id="search"
      onKeyDown={handleKeyDown}
    />
    <span onClick={() => alert(search)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-disabledGrey hover:text-successGreen transition duration-100 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </span>
  </div>
);

const Tabs = ({ onClick, activeTab, tabs }) => (
  <div className="flex items-center space-x-4 pt-6">
    {tabs.map((tab, tabIndex) => (
      <p
        key={tabIndex}
        onClick={() => (activeTab === tab ? null : onClick())}
        className={`${
          activeTab === tab ? "border-black" : "border-transparent"
        } hover:bg-opacity-50 text-2xl capitalize cursor-pointer border-b `}
      >
        {tab}
      </p>
    ))}
  </div>
);
const ListTitle = ({ title }) => (
  <div className="text-sm sm:text-base font-medium pb-1">
    <p>{title}</p>
  </div>
);

const AddListItem = ({ title }) => (
  <div className="bg-white border-2 cursor-pointer border-black h-16 w-16 md:h-24 md:w-24 flex-shrink-0 flex items-center text-center justify-center text-3xl">
    <BsPlus />
  </div>
);

const ListItem = ({ title }) => (
  <div className="bg-disabledGrey h-16 w-16 md:h-24 md:w-24 cursor-pointer hover:opacity-50 flex-shrink-0" />
);

const ListItems = ({ title, items }) => (
  <div>
    <ListTitle title={title} />
    <div className="flex space-x-4">
      <AddListItem />
      <div className="flex space-x-4 overflow-x-scroll no-scrollbar">
        {[...Array(20).keys()].map((item, itemIndex) => (
          <ListItem key={itemIndex} />
        ))}
      </div>
    </div>
  </div>
);
