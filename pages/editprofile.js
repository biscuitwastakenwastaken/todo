import React, { useState, useEffect } from "react";
import { useAuth } from "@/utils/auth";
import Layout from "@/components/Layout";
import { PageContainer, Default, InputContainer } from "@/components/pageUtils";
import Router from "next/router";
import { BsChevronRight, BsPlus } from "react-icons/bs";
import { AiFillMinusCircle } from "react-icons/ai";
import { updateUser, getDocument } from "@/utils/db";
import { toast } from "react-toastify";

const EditProfile = () => {
  const { user, setError, setUser } = useAuth();

  const [state, setState] = useState(user);

  useEffect(() => {
    setState(user);
  }, [user]);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!state?.firstName) {
      setError("Please enter email");
      return true;
    }
    if (!state?.lastName) {
      setError("Please enter password");
      return true;
    }
    updateUser(user.uid, state).then(() => {
      setUser(state);
      toast.success("Profile Updated!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1800,
        closeButton: false,
      });
    });
  };

  return (
    <Layout>
      <PageContainer className="max-w-xl mx-auto">
        <form onSubmit={onSubmit}>
          <div className="flex items-center justify-between text-successGreen">
            <button onClick={() => Router.push("/profile")}>Cancel</button>
            <button>Save</button>
          </div>
          <div className="flex flex-col items-center justify-center pb-4 sm:pb-6 space-y-1">
            <Default url="/me.png" />
            <p className="text-successGreen">Change profile picture</p>
          </div>
          <div className="space-y-4">
            <InputContainer label="Personal Information">
              <EditInput
                title="First Name"
                type="text"
                value={state?.firstName}
                required
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
                value={state?.lastName}
                required
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
                value={state?.bio}
                onChange={(event) =>
                  setState((prevState) => ({
                    ...prevState,
                    bio: event.target.value,
                  }))
                }
                name="bio"
                id="bio"
              />

              <EditInput
                title="Profession"
                type="text"
                value={state?.profession}
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
                value={state?.socialLink}
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
                value={state?.socialLinkText}
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
                value={state?.weight}
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
                value={state?.height}
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
            <div className="space-y-4 pt-6">
              <ListItems title="Certifications" />
            </div>
          </div>
        </form>
      </PageContainer>
    </Layout>
  );
};

export default EditProfile;

export const EditInput = (props) => (
  <div className="flex items-center h-9 sm:h-10 px-2 relative space-x-3">
    <p className="text-disabledGrey whitespace-nowrap">{props.title}</p>
    <input {...props} className="h-full w-full focus:outline-none" />
  </div>
);

const AddListItem = () => (
  <div className="bg-white border-2 cursor-pointer border-black h-[25px] w-[25px]  flex-shrink-0 flex items-center text-center justify-center text-3xl">
    <BsPlus />
  </div>
);

const ListItem = () => (
  <div className="bg-disabledGrey h-24 w-24 mt-4 cursor-pointer hover:opacity-50 flex-shrink-0" />
);

const ListItems = ({ title, items }) => (
  <div>
    <p className="text-disabledGrey pl-2">{title}</p>
    <div className="flex items-center space-x-4">
      <AddListItem />
      <div className="flex space-x-8 overflow-x-scroll no-scrollbar">
        {[...Array(20).keys()].map((item, itemIndex) => (
          <div class="flex flex-grow items-center space-x-1 transition duration-150">
            <span class="relative">
              <ListItem key={itemIndex} />
              <span class="mt-4 absolute top-0 right-0 inline-flex items-center justify-center w-[30px] h-[30px] text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                -
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
