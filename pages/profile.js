import React from "react";
import { useAuth } from "@/utils/auth";
import Layout from "@/components/Layout";
import { PageContainer } from "@/components/pageUtils";
const Profile = () => {
  //   const { signout } = useAuth();

  return (
    <Layout>
      <PageContainer>
        {/* MOBILE */}
        <div className="sm:hidden">
          <div className="flex flex-col items-center justify-center">
            <ProfileName name="Matthew Mayfield" />
            <Default url="/me.png" />
            <SocialLink link="@gainthetics" />
            <div className="space-y-3 py-1 w-full">
              <UserInfoContainer>
                <ProfileData title="Programs" value="5" />
                <ProfileData title="Programs" value="5" />
                <ProfileData title="Programs" value="5" />
                <ProfileData title="Programs" value="5" />
                <ProfileData title="Programs" value="5" />
                <ProfileData title="Programs" value="5" />
              </UserInfoContainer>
              <UserInfoContainer>
                <ProfileData title="Programs" value="5" />
                <ProfileData title="Programs" value="5" />
                <ProfileData title="Programs" value="5" />
                <ProfileData title="Programs" value="5" />
                <ProfileData title="Programs" value="5" />
                <ProfileData title="Programs" value="5" />
              </UserInfoContainer>
            </div>
            <FollowButton />

            <p className="text-xs text-center py-2">
              Lorem Ipsum is simply dummy text of the printing and type setting
              industry.
            </p>
          </div>
          <div className="space-y-4 pt-4">
            <ListItems title="Programs" />
            <ListItems title="Certifications" />
          </div>
          {/* <div className="flex items-center justify-between">
            <ProfileName name="Matthew Mayfield" />
            <FollowButton />
          </div>
          <SocialLink link="@gainthetics" />

          <div className="flex items-center justify-between space-x-4">
            <Default url="/me.png" />
            <UserInfoContainer>
              <ProfileData title="Programs" value="5" />
              <ProfileData title="Programs" value="5" />
              <ProfileData title="Programs" value="5" />
              <ProfileData title="Programs" value="5" />
              <ProfileData title="Programs" value="5" />
              <ProfileData title="Programs" value="5" />
            </UserInfoContainer>
          </div>

          <Occupation occupation="Gym Owner" />

          <div className="space-y-5 pt-4 ">
            <InfoContainer>
              <ProfileData title="Programs" value="5" />
              <ProfileData title="Programs" value="5" />
              <ProfileData title="Programs" value="5" />
              <ProfileData title="Programs" value="5" />
            </InfoContainer>

            <InfoContainer>
              <p className="text-xs">
                Lorem Ipsum is simply dummy text of the printing and type
                setting industry.
              </p>
            </InfoContainer>
          </div>

          <div className="space-y-4 pt-4">
            <ListItems title="Programs" />
            <ListItems title="Certifications" />
          </div>
        </div> */}
        </div>
      </PageContainer>

      {/* DESKTOP */}
      <div className="hidden sm:block h-full">
        <div className="mx-auto max-w-4xl h-full">
          <div className="flex items-center justify-between space-x-6 h-full ">
            <div className="flex space-x-6">
              <div className="flex flex-col items-center flex-shrink-0 ">
                <ProfileName name="Matthew Mayfield" />
                <SocialLink link="@gainthetics" />
                <Default url="/me.png" />
                <Occupation occupation="Gym Owner" />
              </div>
              <div className="mt-1">
                <FollowButton />
              </div>
            </div>

            <div className="flex flex-col space-y-6 items-center w-full">
              <UserInfoContainer>
                <ProfileData title="Programs" value="5" />
                <ProfileData title="Programs" value="5" />
                <ProfileData title="Programs" value="5" />
                <ProfileData title="Programs" value="5" />
                <ProfileData title="Programs" value="5" />
                <ProfileData title="Programs" value="5" />
              </UserInfoContainer>
              <UserInfoContainer>
                <ProfileData title="Programs" value="5" />
                <ProfileData title="Programs" value="5" />
                <ProfileData title="Programs" value="5" />
                <ProfileData title="Programs" value="5" />
                <ProfileData title="Programs" value="5" />
              </UserInfoContainer>
            </div>
          </div>

          <div className="pt-8 ">
            <BioContainer>
              <p className="text-xs">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </BioContainer>
          </div>

          <div className="space-y-8 pt-8">
            <ListItems title="Programs" />
            <ListItems title="Certifications" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

const ProfileName = ({ name }) => (
  <div className="text-2xl font-medium">
    <p>{name}</p>
  </div>
);

const SocialLink = ({ link }) => (
  <div>
    <p>{link}</p>
  </div>
);

const Default = ({ url }) => (
  <div className="flex-shrink-0">
    <img
      src={url}
      className="object-cover rounded-full w-20 h-20 sm:w-40 sm:h-40 cursor-pointer"
    />
  </div>
);
const FollowButton = ({ isFollowing }) => (
  <button
    className={`${
      isFollowing ? "bg-disabledGrey" : "bg-successGreen"
    } px-6 py-0.5 rounded w-full`}
  >
    {isFollowing ? "Unfollow" : "Follow"}
  </button>
);

const UserInfoContainer = ({ children }) => (
  <div className="px-2 sm:px-4 py-2 border border-disabledGrey rounded grid grid-cols-3 w-full max-w-sm">
    {children}
  </div>
);

const InfoContainer = ({ children }) => (
  <div className="px-2 sm:px-4 py-2 border border-disabledGrey rounded grid grid-cols-5 ">
    {children}
  </div>
);

const BioContainer = ({ children }) => (
  <div className="px-2 sm:px-4 py-2 border border-disabledGrey rounded ">
    {children}
  </div>
);

const ProfileData = ({ title, value }) => (
  <p className="mr-3 text-[10px] sm:text-base whitespace-nowrap">
    <span className="font-semibold">{title}:</span> {value}
  </p>
);

const Occupation = ({ occupation }) => <p>{occupation}</p>;

const ListTitle = ({ title }) => (
  <div className="text-base sm:text-xl font-medium pb-1">
    <p>{title}</p>
  </div>
);

const ListItem = () => (
  <div className="bg-disabledGrey h-24 w-24 md:h-24 md:w-24 cursor-pointer hover:opacity-50 flex-shrink-0" />
);

const ListItems = ({ title, items }) => (
  <div>
    <ListTitle title={title} />

    <div className="flex space-x-4 overflow-x-scroll no-scrollbar">
      {[...Array(20).keys()].map((item, itemIndex) => (
        <ListItem />
      ))}
    </div>
  </div>
);
