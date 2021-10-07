import Link from "next/link";

export default function AuthForgot() {
  return (
    <>
      <div className="flex items-center justify-center pt-16 pb-8">
        <p className="font-medium text-2xl">Forgot Password</p>
      </div>
      <div className="px-8 space-y-6">
        <div>
          <InputLabel title="Email" />
          <Input />
        </div>
      </div>
      <div className="px-8 space-y-6 pt-4">
        <button className="bg-successGreen rounded w-full text-center text-white h-12 ">
          Send Reset Link
        </button>
        <p className="text-center text-sm text-gray-700">
          Remembered?
          <span>
            {" "}
            <Link href="/login">
              <a className="text-successGreen"></a>
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
