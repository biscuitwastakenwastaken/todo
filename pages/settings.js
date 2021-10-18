import { useState } from "react";
import { Switch } from "@headlessui/react";
import { useAuth } from "@/utils/auth";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import { PageContainer, Default, InputContainer } from "@/components/pageUtils";
import Router from "next/router";
import { BsChevronRight } from "react-icons/bs";

const Settings = () => {
  const { user, emailUpdate, signout } = useAuth();

  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    // email: "",

    socialLink: "",
    socialLinkText: "",
    profession: "",
    bio: "",
    weight: "",
    height: "",
  });

  const onSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(state));
    // if (!email) {
    //   auth.setError("Please enter email");
    //   return true;
    // }
    // if (!password) {
    //   auth.setError("Please enter password");
    //   return true;
    // }
    // emailUpdate(state.email);
  };

  return (
    <Layout>
      <PageContainer className="max-w-xl mx-auto">
        {/* <Header title="Settings" subtitle="my Settings" /> */}
        <form onSubmit={onSubmit}>
          <div className="flex items-center justify-between text-successGreen">
            <button onClick={() => Router.push("/profile")}>Cancel</button>
            <button>Save</button>
          </div>

          <div className="space-y-8 pt-4">
            <InputContainer label="App Appearance">
              <DarkMode
                darkModeEnabled={darkModeEnabled}
                setDarkModeEnabled={setDarkModeEnabled}
              />
              {/* <EditSensativeInfo link={"updateemail"} label="Change Email" /> */}
            </InputContainer>
            <InputContainer label="Account Info">
              <EditSensativeInfo
                link={"/updatepassword"}
                label="Change Password"
              />
              <EditSensativeInfo link={"updateemail"} label="Change Email" />
            </InputContainer>
            <InputContainer>
              <div
                onClick={() => signout()}
                className="flex items-center h-9 sm:h-10 px-2 justify-between text-negativeRed font-light cursor-pointer "
              >
                <p className="whitespace-nowrap">Log Out</p>
              </div>
            </InputContainer>

            <InputContainer>
              <div
                onClick={() => Router.push(link)}
                className="flex items-center h-9 sm:h-10 px-2 justify-between text-negativeRed font-light cursor-pointer "
              >
                <p className="whitespace-nowrap">Delete Account</p>
              </div>
            </InputContainer>
          </div>
        </form>
      </PageContainer>
    </Layout>
  );
};

export default Settings;

export const EditInput = (props) => (
  <div className="flex items-center h-9 sm:h-10 px-2 relative space-x-3">
    <p className="text-disabledGrey whitespace-nowrap">{props.title}</p>
    <input {...props} className="h-full w-full focus:outline-none" />
  </div>
);

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
