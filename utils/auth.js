import React, { useState, useEffect, useContext, createContext } from "react";
import Router from "next/router";
import cookie from "js-cookie";
import { auth } from "@/utils/firebase";
// import { createUser } from "./db";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onIdTokenChanged,
} from "firebase/auth";

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      const { token, ...userWithoutToken } = user;

      //   createUser(user.uid, userWithoutToken);
      setUser(user);

      cookie.set("biscuit-auth", true, {
        expires: 1,
      });

      setLoading(false);
      return user;
    } else {
      setUser(false);
      cookie.remove("biscuit-auth");

      setLoading(false);
      return false;
    }
  };

  const createUser = (email, password) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        console.log(authUser);
        Router.push("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
      });
  };

  const signinWithEmail = (email, password) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        const user = userCredential.user;
        handleUser(user);
        Router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const signout = () => {
    Router.push("/");
    signOut(auth)
      .then(() => {
        handleUser(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    createUser,
    signinWithEmail,
    signout,
  };
}

const formatUser = async (user) => {
  const token = await user.getIdToken();
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    // stripeRole: await getStripeRole(),
    token,
  };
};
