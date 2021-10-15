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
} from "@/components/Auth/AuthPageUtils";

export default function AuthReset() {
  const auth = useAuth();

  const [oldPassword, setOldPassword] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();

    if (!oldPassword) {
      auth.setError("Please enter current password");
      return true;
    }
    if (passwordOne !== passwordTwo) {
      auth.setError("Password do not match");
      return true;
    }
    auth.reauthenticateUser(credential, passwordOne);
  };

  return (
    <AuthLayout>
      <form onSubmit={onSubmit}>
        <AuthTitle title="Reset Password" />
        <AuthInputContainer>
          <AuthInput
            title="Current Password"
            type={showPassword ? "text" : "password"}
            name="oldPassword"
            value={oldPassword}
            onChange={(event) => setOldPassword(event.target.value)}
            id="resetOldPassword"
          />
          <AuthInput
            title="New Password"
            type={showPassword ? "text" : "password"}
            name="passwordOne"
            value={passwordOne}
            onChange={(event) => setPasswordOne(event.target.value)}
            id="resetNewPassword1"
          />
          <AuthInput
            title="Confirm New Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={passwordTwo}
            onChange={(event) => setPasswordTwo(event.target.value)}
            id="resetNewPassword2"
          />
        </AuthInputContainer>
        <div className="px-8 space-y-6 pt-4">
          <AuthShowPassword
            onClick={() => setShowPassword((prevState) => !prevState)}
            showPassword={showPassword}
          />

          <AuthSubmit
            title="Reset"
            disabled={!oldPassword || !passwordOne || !passwordTwo}
          />
          <AuthError error={auth.error} />
        </div>
      </form>
    </AuthLayout>
  );
}
