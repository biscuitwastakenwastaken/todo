import { useState } from "react";
import { useAuth } from "@/utils/auth";
import _ from "lodash";
import {
  AuthError,
  AuthInput,
  AuthShowPassword,
  AuthSubmit,
} from "@/components/Auth/AuthPageUtils";
import Layout from "@/components/Layout";
import { PageContainer } from "@/components/pageUtils";
import Router from "next/router";

export default function EmailUpdate() {
  const { user, error, setError, emailAuthProv, emailUpdate } = useAuth();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();

    if (!password) {
      setError("Please enter password");
      return true;
    }
    if (!email) {
      setError("Please enter email");
      return true;
    }
    const credential = emailAuthProv(user?.email, password);
    emailUpdate(credential, email);
  };

  return (
    <Layout>
      <PageContainer className="max-w-xl mx-auto">
        <form onSubmit={onSubmit}>
          <div className="space-y-6">
            <div className="flex items-center  text-successGreen">
              <button onClick={() => Router.push("/settings")}>Back</button>
            </div>
            <AuthInput
              title="Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              name="email"
              id="forgotPasswordEmail"
            />
            <AuthInput
              title="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              id="password"
            />
          </div>

          <div className="space-y-6 pt-4">
            <AuthShowPassword
              onClick={() => setShowPassword((prevState) => !prevState)}
              showPassword={showPassword}
            />

            <AuthSubmit title="Reset" disabled={!password || !email} />
            <AuthError error={error} />
          </div>
        </form>
      </PageContainer>
    </Layout>
  );
}
