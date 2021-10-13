import { useState } from "react";
import { useAuth } from "@/utils/auth";
import _ from "lodash";
import {
  AuthError,
  AuthLayout,
  AuthInput,
  AuthShowPassword,
  AuthSubmit,
  AuthInputContainer,
  AuthTitle,
  AuthRedirect,
} from "@/components/Auth/AuthPageUtils";

export default function Register() {
  const auth = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();

    if (!firstName || !lastName) {
      auth.setError("Please enter first and last name");
      return true;
    }
    if (passwordOne !== passwordTwo) {
      auth.setError("Password do not match");
      return true;
    }
    auth.createUser(email, passwordOne);
  };

  return (
    <AuthLayout>
      <form onSubmit={onSubmit}>
        <AuthTitle title="Register" />
        <AuthInputContainer>
          <AuthInput
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            name="lastName"
            id="signUpFirstName"
            title="First Name"
          />
          <AuthInput
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            name="firstName"
            id="signUpLastName"
            title="Last Name"
          />
          <AuthInput
            title="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            name="email"
            id="signUpEmail"
          />
          <AuthInput
            title="Password"
            type={showPassword ? "text" : "password"}
            name="passwordOne"
            value={passwordOne}
            onChange={(event) => setPasswordOne(event.target.value)}
            id="signUpPassword"
          />
          <AuthInput
            title="Confirm Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={passwordTwo}
            onChange={(event) => setPasswordTwo(event.target.value)}
            id="signUpPassword2"
          />
        </AuthInputContainer>
        <div className="px-8 space-y-6 pt-4">
          <AuthShowPassword
            onClick={() => setShowPassword((prevState) => !prevState)}
            showPassword={showPassword}
          />

          <AuthSubmit
            title="Create Account"
            disabled={
              !firstName || !lastName || !email || !passwordOne || !passwordTwo
            }
          />
          <AuthError error={auth.error} />
          <AuthRedirect
            text="Already have an account?"
            link="/"
            linkText="Login"
          />
        </div>
      </form>
    </AuthLayout>
  );
}
