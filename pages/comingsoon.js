import Layout from "@/components/Layout";
import { useAuth } from "@/utils/auth";

export default function comingsoon() {
  const { signout } = useAuth();
  return (
    <Layout>
      <div className="flex items-center justify-center pt-64 text-successGreen text-lg sm:text-3xl">
        COMING SOON
      </div>
      <button className="text-black" onClick={() => signout()}>
        Sign out
      </button>
    </Layout>
  );
}
