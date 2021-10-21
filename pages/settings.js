import { useState } from "react";
import { Switch } from "@headlessui/react";
import { useAuth } from "@/utils/auth";
import Layout from "@/components/Layout";
import { PageContainer, InputContainer } from "@/components/pageUtils";
import Router from "next/router";
import { BsChevronRight } from "react-icons/bs";
import DeleteAccountModal from "@/components/Auth/DeleteAccountModal";

const Settings = () => {
  const {
    user,

    signout,
    error,
    setError,
    deleteAccount,
    emailAuthProv,
  } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  let [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [disableDeleteButton, setDisableDeleteButton] = useState(false);
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

  const deleteModalHandler = () => {
    deleteModalIsOpen ? setPassword("") : null;
    setDeleteModalIsOpen((prevState) => !prevState);
    setDisableDeleteButton(false);
    setError(null);
    setShowPassword(false);
  };

  const permanentlyDeleteAccountHandler = () => {
    setDisableDeleteButton(true);
    if (!password) {
      setError("Enter password to delete account");
      setDisableDeleteButton(false);
      return true;
    }
    const credential = emailAuthProv(user?.email, password);
    setPassword("");
    deleteAccount(credential);
  };

  return (
    <Layout>
      <PageContainer className="max-w-xl mx-auto">
        <form onSubmit={onSubmit}>
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
        </form>
      </PageContainer>

      <DeleteAccountModal
        deleteModalIsOpen={deleteModalIsOpen}
        deleteModalHandler={deleteModalHandler}
        permanentlyDeleteAccountHandler={permanentlyDeleteAccountHandler}
        password={password}
        setPassword={setPassword}
        error={error}
        disableDeleteButton={disableDeleteButton}
        setShowPassword={setShowPassword}
        showPassword={showPassword}
      />
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
