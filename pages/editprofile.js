import React, { useState } from "react";
import { useAuth } from "@/utils/auth";
import Layout from "@/components/Layout";
import { PageContainer, Default } from "@/components/pageUtils";
import Router from "next/router";
import Header from "@/components/Header";
import { BsChevronRight } from "react-icons/bs";

const EditProfile = () => {
  const { user, emailUpdate, signout } = useAuth();
  // console.log(user);

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    // email: "",
    default: "",
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
      <PageContainer>
        <form onSubmit={onSubmit}>
          <div className="flex items-center justify-between text-successGreen">
            <button onClick={() => Router.push("/profile")}>Cancel</button>
            <button>Save</button>
          </div>
          <div className="flex flex-col items-center justify-center pb-4 sm:pb-6 space-y-1">
            <Default url="/me.png" />
            <p>Change profile picture</p>
          </div>
          <div className="space-y-4">
            <InputContainer label="Personal Information">
              <EditInput
                title="First Name"
                type="text"
                value={state.firstName}
                //   required
                onChange={(event) =>
                  setState((prevState) => ({
                    ...prevState,
                    firstName: event.target.value,
                  }))
                }
                name="firstName"
                id="firstName"
              />
              <EditInput
                title="Last Name"
                type="text"
                value={state.lastName}
                //   required
                onChange={(event) =>
                  setState((prevState) => ({
                    ...prevState,
                    lastName: event.target.value,
                  }))
                }
                name="lastName"
                id="lastName"
              />
              <EditInput
                title="Bio"
                type="text"
                value={state.bio}
                //   required
                onChange={(event) =>
                  setState((prevState) => ({
                    ...prevState,
                    bio: event.target.value,
                  }))
                }
                name="bio"
                id="bio"
              />
              {/* <EditInput
                title="Email"
                type="email"
                value={state.email}
                required
                onChange={(event) =>
                  setState((prevState) => ({
                    ...prevState,
                    email: event.target.value,
                  }))
                }
                name="email"
                id="email"
              /> */}

              <EditInput
                title="Profession"
                type="text"
                value={state.profession}
                //   required
                onChange={(event) =>
                  setState((prevState) => ({
                    ...prevState,
                    profession: event.target.value,
                  }))
                }
                name="profession"
                id="profession"
              />
            </InputContainer>
            <InputContainer label="Associations">
              <EditInput
                title="Link"
                type="text"
                value={state.socialLink}
                onChange={(event) =>
                  setState((prevState) => ({
                    ...prevState,
                    socialLink: event.target.value,
                  }))
                }
                name="socialLink"
                id="socialLink"
              />
              <EditInput
                title="Link Name"
                type="text"
                value={state.socialLinkText}
                onChange={(event) =>
                  setState((prevState) => ({
                    ...prevState,
                    socialLinkText: event.target.value,
                  }))
                }
                name="socialLinkText"
                id="socialLinkText"
              />
            </InputContainer>

            <InputContainer label="Metrics">
              <EditInput
                title="Weight"
                type="text"
                value={state.weight}
                //   required
                onChange={(event) =>
                  setState((prevState) => ({
                    ...prevState,
                    weight: event.target.value,
                  }))
                }
                name="weight"
                id="weight"
              />
              <EditInput
                title="Height"
                type="text"
                value={state.height}
                //   required
                onChange={(event) =>
                  setState((prevState) => ({
                    ...prevState,
                    height: event.target.value,
                  }))
                }
                name="height"
                id="height"
              />
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
                className="flex items-center h-9 sm:h-10 px-2 justify-between text-negativeRed cursor-pointer "
              >
                <p className="whitespace-nowrap">Log Out</p>
              </div>
            </InputContainer>

            <InputContainer>
              <div
                onClick={() => Router.push(link)}
                className="flex items-center h-9 sm:h-10 px-2 justify-between text-negativeRed cursor-pointer "
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

export default EditProfile;

const InputContainer = ({ children, label }) => (
  <div className="max-w-xl mx-auto">
    <p className="text-disabledGrey pl-2">{label}</p>
    <div className="bg-white pl-3 py-1 divide-y divide-lightBackgroundColor rounded ">
      {children}
    </div>
  </div>
);

export const EditInput = (props) => (
  <div className="flex items-center h-9 sm:h-10 px-2 relative space-x-3">
    <p className="text-disabledGrey whitespace-nowrap">{props.title}</p>
    <input {...props} className="h-full w-full focus:outline-none" />
  </div>
);

const EditSensativeInfo = ({ label, link }) => (
  <div
    onClick={() => Router.push(link)}
    className="flex items-center h-9 sm:h-10 px-2 justify-between text-disabledGrey cursor-pointer "
  >
    <p className="whitespace-nowrap">{label}</p>
    <BsChevronRight />
  </div>
);
