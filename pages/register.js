import Link from "next/link";

export default function Register() {
  return (
    <>
      <div className="flex items-center justify-center pt-16 pb-8">
        <p className="font-medium text-2xl">Register</p>
      </div>
      <div className="px-8 space-y-6">
        <div>
          <InputLabel title="First Name" />
          <Input />
        </div>
        <div>
          <InputLabel title="Last Name" />
          <Input />
        </div>
        <div>
          <InputLabel title="Email" />
          <Input />
        </div>
        <div>
          <InputLabel title="Password" />
          <Input />
        </div>
        <div>
          <InputLabel title="Confirm Password" />
          <Input />
        </div>{" "}
      </div>
      <div className="px-8 space-y-6 pt-4">
        <div className="flex items-center space-x-2">
          <p className="text-gray-500 text-xs">Show Password</p>
          <input type="checkbox" />
        </div>

        <button className="bg-successGreen rounded w-full text-center text-white h-12 ">
          Create Account
        </button>
        <p className="text-center text-sm text-gray-700">
          Already have an account?
          <span>
            {" "}
            <Link href="/login" className="text-successGreen">
              Login
            </Link>
          </span>
        </p>
      </div>
    </>
  );
}

const Input = () => <input className="border rounded w-full h-9" />;
const InputLabel = ({ title }) => (
  <p className="text-gray-500 text-sm">{title}</p>
);
