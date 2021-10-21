import { useState } from "react";
import { Switch } from "@headlessui/react";
import { useAuth } from "@/utils/auth";
import Layout from "@/components/Layout";
import { PageContainer, InputContainer } from "@/components/pageUtils";
import Router from "next/router";
import { BsChevronRight } from "react-icons/bs";
import DeleteAccountModal from "@/components/Auth/DeleteAccountModal";

const Settings = () => {
  const { user, signout, error, setError } = useAuth();

  let [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const deleteModalHandler = () => {
    deleteModalIsOpen ? setPassword("") : null;
    setDeleteModalIsOpen((prevState) => !prevState);
    setError(null);
  };

  return (
    <Layout>
      <PageContainer className="max-w-xl mx-auto">
        <div className="space-y-8 pt-4">
          <InputContainer label="App Appearance">
            <DarkMode
              darkModeEnabled={darkModeEnabled}
              setDarkModeEnabled={setDarkModeEnabled}
            />
            {/* <EditSensativeInfo link={"updateemail"} label="Change Email" /> */}
          </InputContainer>
          <InputContainer label="Account Info">
            <EditSensativeInfo link={"/emailUpdate"} label="Change Email" />
            <EditSensativeInfo link={"/reset"} label="Change Password" />
          </InputContainer>
          <InputContainer>
            <div
              onClick={() => signout()}
              className="flex items-center h-9 sm:h-10 px-2 justify-between text-negativeRed cursor-pointer "
            >
              <p className="whitespace-nowrap">Log Out</p>
            </div>
          </InputContainer>

          <InputContainer>
            <div
              onClick={deleteModalHandler}
              className="flex items-center h-9 sm:h-10 px-2 justify-between text-negativeRed cursor-pointer "
            >
              <p className="whitespace-nowrap">Delete Account</p>
            </div>
          </InputContainer>
        </div>
      </PageContainer>

      <DeleteAccountModal
        deleteModalIsOpen={deleteModalIsOpen}
        deleteModalHandler={deleteModalHandler}
      />
    </Layout>
  );
};

export default Settings;

const EditSensativeInfo = ({ label, link }) => (
  <div
    onClick={() => Router.push(link)}
    className="flex items-center h-9 sm:h-10 px-2 justify-between text-black cursor-pointer "
  >
    <p className="whitespace-nowrap">{label}</p>
    <BsChevronRight />
  </div>
);

const DarkMode = ({ darkModeEnabled, setDarkModeEnabled }) => (
  <div className="flex items-center h-9 sm:h-10 px-2 justify-between text-black cursor-pointer ">
    <p className="whitespace-nowrap">Dark Mode</p>
    <Switch
      checked={darkModeEnabled}
      onChange={setDarkModeEnabled}
      className={`${darkModeEnabled ? "bg-successGreen" : "bg-gray-200"} 
          relative inline-flex flex-shrink-0 h-[30px] w-[50px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${darkModeEnabled ? "translate-x-5" : "translate-x-0"}
            pointer-events-none inline-block h-[26px] w-[26px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
      />
    </Switch>
  </div>
);
