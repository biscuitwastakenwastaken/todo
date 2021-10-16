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

        <div className="flex flex-col items-center justify-center w-full mx-auto">
          <ProfileName name="Matthew Mayfield" />
          <SocialLink link="@gainthetics" />
          <Default url="/me.png" />

          <FollowButton />
          <div className="space-y-3 py-1 w-full mt-4">
            <div className="flex flex-wrap items-center justify-center space-x-2">
              <ProfileData title="Programs" value="456k" />
              <ProfileData title="Completed" value="126k" />
              <ProfileData title="Following" value="879k" />
              <ProfileData title="Followers" value="123.6k" />
              {/* <ProfileData title="Made" value="122" /> */}
              <ProfileData title="Sold" value="2,225" />
            </div>

            <div className="flex flex-col items-center">
              <p className="text-sm">Metrics</p>
              <div className="flex items-center w-full justify-center pb-4 space-x-6">
                <ProfileData title="Height" value="5'6" />
                <ProfileData title="Weight" value="150" />
              </div>
            </div>
          </div>

          <p className="text-xs text-center py-2">
            Lorem Ipsum is simply dummy text of the printing and type setting
            industry.
          </p>
        </div>
        <div className="space-y-4 pt-4">
          <ListItems title="Programs" />
          <ListItems title="Certifications" />
        </div>
      </PageContainer>

      {/* DESKTOP */}
      {/* <div className="hidden sm:block h-full">
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
      </div> */}
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
    } px-6 py-0.5 sm:py-1 mt-2 rounded w-full max-w-[90px]`}
  >
    {isFollowing ? "Unfollow" : "Follow"}
  </button>
);

const ProfileData = ({ title, value }) => (
  <div className="text-center">
    <p className="text-2xl  font-bold mb-0 ">{value}</p>
    <p className="text-[10px] sm:text-base ">{title}</p>
  </div>
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
