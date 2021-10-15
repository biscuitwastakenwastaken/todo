import { useState } from "react";
import { useAuth } from "@/utils/auth";
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

export default function Login() {
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    if (!email) {
      auth.setError("Please enter email");
      return true;
    }
    if (!password) {
      auth.setError("Please enter password");
      return true;
    }
    auth.signinWithEmail(email, password);
  };

  return (
    <AuthLayout>
      <form onSubmit={onSubmit}>
        <AuthTitle title="Login" />
        <AuthInputContainer>
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
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            id="signUpPassword"
          />
        </AuthInputContainer>
        <div className="px-8 space-y-6 pt-4">
          <AuthShowPassword
            onClick={() => setShowPassword((prevState) => !prevState)}
            showPassword={showPassword}
          />
          <AuthSubmit title="Login" disabled={!email || !password} />
        </div>
        <AuthError error={auth.error} />
        <div className="pt-6 space-y-2">
          <AuthRedirect
            text="Forgot password?"
            link="/forgot"
            linkText="Reset Password"
          />
          <AuthRedirect
            text="Do not have an account?"
            link="/register"
            linkText="Register"
          />
        </div>
      </form>
    </AuthLayout>
  );
}
