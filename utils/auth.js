import React, { useState, useEffect, useContext, createContext } from "react";
import Router from "next/router";
import { auth } from "@/utils/firebase";
import { errorCodes } from "@/utils/errorCodes";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onIdTokenChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateEmail,
  deleteUser,
} from "firebase/auth";
import { createUserDB } from "./db";

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
  const [error, setError] = useState(null);

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      const { token, ...userWithoutToken } = user;

      createUserDB(user.uid, userWithoutToken);
      setUser(user);

      // cookie.set("biscuit-auth", true, {
      //   expires: 1,
      // });

      setLoading(false);
      return user;
    } else {
      setUser(false);
      // cookie.remove("biscuit-auth");

      setLoading(false);
      return false;
    }
  };

  const handleError = (error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // console.log(error);
    // console.log(errorCode);
    // console.log(errorMessage);
    setLoading(false);
    setError(errorCodes[errorCode] || errorMessage);
  };

  const sendVerificationEmail = (authUser) => {
    sendEmailVerification(authUser)
      .then((response) => {
        console.log(response);
        console.log("email sent");
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const formatCreateUser = (user) => {
    return {
      uid: user.uid,
      email: user.email,
      provider: user.providerData[0].providerId,

      // stripeRole: await getStripeRole(),
      emailVerified: user.emailVerified,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  };

  const createUser = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await createUserDB(user.uid, formatCreateUser({ ...user, ...data }));
      sendVerificationEmail(auth.currentUser);
      signout();
    } catch (error) {
      handleError(error);
    }
  };

  const signinWithEmail = (email, password) => {
    setLoading(true);
    setError(null);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        const user = userCredential.user;
        handleUser(user);
        Router.push("/");
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const signout = () => {
    setError(null);
    Router.push("/login");
    signOut(auth)
      .then(() => {
        handleUser(false);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const emailUpdate = async (credential, email) => {
    setError(null);
    const { status } = await reauthenticateUser(credential);
    if (status && email) {
      updateEmail(auth.currentUser, email);
      Router.push("/");
    }
  };

  const sendPasswordReset = (email) => {
    setError(null);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Router.push("/login");
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const emailAuthProv = (email, password) => {
    const credential = EmailAuthProvider.credential(email, password);
    return credential;
  };

  const passwordReset = async (credential, newPassword) => {
    setError(null);
    const { status } = await reauthenticateUser(credential);
    if (status && newPassword) {
      passwordUpdate(newPassword);
      Router.push("/settings");
    }
  };

  const reauthenticateUser = async (credential) => {
    setError(null);
    try {
      const response = await reauthenticateWithCredential(
        auth.currentUser,
        credential
      );
      return { status: true };
    } catch (error) {
      handleError(error);
      return { status: false };
    }
  };

  const deleteAccount = async (credential) => {
    setError(null);
    const { status } = await reauthenticateUser(credential);
    if (status) {
      const deleteThisUser = await deleteUser(auth.currentUser);
      handleUser(false);
      Router.push("/login");
    }
  };

  const passwordUpdate = (newPassword) => {
    setError(null);
    updatePassword(auth.currentUser, newPassword)
      .then(() => {
        // console.log("passwordUpdated");
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const authUser = auth.currentUser;

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, handleUser);

    Router.events.on("routeChangeComplete", (url) => {
      setError(null);
    });

    return () => {
      Router.events.off("routeChangeComplete", (url) => {
        setError(null);
      });
      unsubscribe();
    };
  }, []);

  return {
    user,
    loading,
    error,
    sendVerificationEmail,
    setError,
    createUser,
    signinWithEmail,
    signout,
    sendPasswordReset,
    reauthenticateUser,
    passwordReset,
    emailAuthProv,
    authUser,
    passwordUpdate,
    emailUpdate,
    deleteAccount,
  };
}

const formatUser = async (user) => {
  const token = await user?.getIdToken();
  return {
    uid: user.uid,
    email: user.email,
    // name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    // stripeRole: await getStripeRole(),
    token,
    emailVerified: user.emailVerified,
    // firstName,
    // lastName
  };
};
