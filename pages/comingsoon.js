import Layout from "@/components/Layout";
import { useAuth } from "@/utils/auth";
import { createUser } from "@/utils/db";
// stripe stuff TODO

export default function comingsoon() {
  const { signout, user } = useAuth();
  return (
    <Layout>
      <div className="flex items-center justify-center pt-64 text-successGreen text-lg sm:text-3xl">
        COMING SOON
      </div>
      <button className="text-black" onClick={() => signout()}>
        Sign out
      </button>
      <button
        className="text-black"
        onClick={() => createUser(user.uid, { ...user })}
      >
        add user {user?.uid}
      </button>
    </Layout>
  );
}
