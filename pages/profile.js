import React from "react";
import { useAuth } from "@/utils/auth";
import Layout from "@/components/Layout";
import { PageContainer, Default } from "@/components/pageUtils";
import Router from "next/router";

const Profile = () => {
  // const { user } = useAuth();
  // console.log(user);
  return (
    <Layout>
      <PageContainer>
        <div className="flex flex-col items-center justify-center w-full mx-auto">
          <ProfileName name="Matthew Mayfield" />
          <SocialLink link="@gainthetics" />
          <Default url="/me.png" />
          <Occupation occupation="Gym Owner" />
          <FollowButton />

          <div className="space-y-3 w-full mt-6">
            <div className="flex flex-wrap items-center justify-center space-x-2">
              <ProfileData title="Programs" value="456k" />
              <ProfileData title="Completed" value="126k" />
              <ProfileData title="Following" value="879k" />
              <ProfileData title="Followers" value="123.6k" />
              {/* <ProfileData title="Made" value="122" /> */}
              <ProfileData title="Sold" value="2,225" />
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center w-full justify-center space-x-6">
                <ProfileData title="Height" value="5'6" />
                <ProfileData title="Weight" value="150" />
              </div>
            </div>
          </div>

          <p className="text-[10px] text-center pt-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text.
            Lorem Ipsum is sim
          </p>
        </div>
        <div className="space-y-4 pt-6">
          <ListItems title="Programs" />
          <ListItems title="Certifications" />
        </div>
      </PageContainer>
    </Layout>
  );
};

export default Profile;

const ProfileName = ({ name }) => (
  <div className="text-2xl font-medium">
    <p>{name}</p>
  </div>
);

const SocialLink = ({ link }) => <p className="text-xs">{link}</p>;

const FollowButton = ({ isFollowing }) => (
  <button
    onClick={() => Router.push("/editprofile")}
    className={`${
      isFollowing ? "bg-disabledGrey" : "bg-successGreen"
    } px-6 py-0.5 sm:py-1 mt-1 rounded w-full max-w-[90px] border-[0.5px] border-black`}
  >
    Edit
    {/* {isFollowing ? "Unfollow" : "Follow"} */}
  </button>
);

const ProfileData = ({ title, value }) => (
  <div className="text-center">
    <p className="text-2xl font-bold mb-0 ">{value}</p>
    <p className="text-[10px] sm:text-base ">{title}</p>
  </div>
);

const Occupation = ({ occupation }) => (
  <p className="text-[10px] mt-1">{occupation}</p>
);

const ListTitle = ({ title }) => (
  <div className="text-base sm:text-xl font-medium">
    <p>{title}</p>
  </div>
);

const ListItem = () => (
  <div className="bg-disabledGrey h-24 w-24 md:h-24 md:w-24 cursor-pointer hover:opacity-50 flex-shrink-0" />
);

const ListItems = ({ title, items }) => (
  <div>
    <ListTitle title={title} />

    <div className="flex space-x-4 overflow-x-scroll no-scrollbar pt-1">
      {[...Array(20).keys()].map((item, itemIndex) => (
        <ListItem key={itemIndex} />
      ))}
    </div>
  </div>
);

const Divider = () => (
  <div className="h-1 w-full border-t border-disabledGrey" />
);
