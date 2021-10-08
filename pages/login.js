import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/utils/auth";

export default function Login() {
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const onSubmit = (event) => {
    setError(null);
    auth.signinWithEmail(email, password);
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex items-center justify-center pt-16 pb-8">
        <p className="font-medium text-2xl">Login</p>
      </div>
      <div className="px-8 space-y-6">
        <Input
          title="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          name="email"
          id="signUpEmail"
        />
        <Input
          title="Password"
          type="password"
          name="passwordOne"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          id="signUpPassword"
        />
      </div>
      <div className="px-8 space-y-6 pt-4">
        <div className="flex items-center space-x-2">
          <p className="text-gray-500 text-xs">Show Password</p>
          <input type="checkbox" />
        </div>

        <button className="bg-successGreen rounded w-full text-center text-white h-12 mt-6">
          Login
        </button>
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
    </form>
  );
}

const Input = (props) => (
  <div>
    <p className="text-gray-500 text-sm">{props.title}</p>
    <input {...props} className="border rounded w-full h-9" />
  </div>
);
