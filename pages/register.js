import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/utils/auth";
import _ from "lodash";

export default function Register() {
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [error, setError] = useState(null);

  const onSubmit = (event) => {
    setError(null);
    if (passwordOne === passwordTwo) auth.createUser(email, passwordOne);
    else setError("Password do not match");
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex items-center justify-center pt-16 pb-8">
        <p className="font-medium text-2xl">Register</p>
      </div>
      <div className="px-8 space-y-6">
        <Input title="First Name" />
        <Input title="Last Name" />
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
          value={passwordOne}
          onChange={(event) => setPasswordOne(event.target.value)}
          id="signUpPassword"
        />
        <Input
          title="Confirm Password"
          type="password"
          name="password"
          value={passwordTwo}
          onChange={(event) => setPasswordTwo(event.target.value)}
          id="signUpPassword2"
        />
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
          <Link href="/login" className="text-successGreen">
            <a className="text-successGreen"> Login</a>
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
