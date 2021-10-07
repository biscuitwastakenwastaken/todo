import Link from "next/link";

export default function Login() {
  return (
    <>
      <div className="flex items-center justify-center pt-16 pb-8">
        <p className="font-medium text-2xl">Login</p>
      </div>
      <div className="px-8 space-y-6">
        <Input title="Email" />
        <Input title="Password" />
      </div>
      <div className="px-8 space-y-6 pt-4">
        <div className="flex items-center space-x-2">
          <p className="text-gray-500 text-xs">Show Password</p>
          <input type="checkbox" />
        </div>
        <Link href="/" passHref>
          <button className="bg-successGreen rounded w-full text-center text-white h-12 mt-6">
            Login
          </button>
        </Link>
      </div>
      <div className="pt-6 space-y-2">
        <p className="text-center text-sm text-gray-700">
          Forgot password?
          <Link href="/forgot" className="text-successGreen">
            <a className="text-successGreen"> Reset Password</a>
          </Link>
        </p>
        <p className="text-center text-sm text-gray-700">
          Do not have an account?
          <Link href="/register">
            <a className="text-successGreen"> Register</a>
          </Link>
        </p>
      </div>
    </>
  );
}

const Input = ({ title }) => (
  <div>
    <p className="text-gray-500 text-sm">{title}</p>
    <input className="border rounded w-full h-9" />
  </div>
);
