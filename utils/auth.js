import React, { useState, useEffect, useContext, createContext } from "react";
import Router from "next/router";
import cookie from "js-cookie";
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
  const [error, setError] = useState(null);

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
    setError(null);
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        console.log(authUser);
        sendEmailVerification(auth.currentUser);
        signinWithEmail(email, password);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);
        setError(errorCodes[errorCode] || errorMessage);
      });
  };

  const signinWithEmail = (email, password) => {
    setLoading(true);
    setError(null);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        const user = userCredential.user;
        handleUser(user);
        // Router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        console.log(errorCode);
        console.log(errorMessage);
        setError(errorCodes[errorCode] || errorMessage);
      });
  };

  const signout = () => {
    setError(null);
    Router.push("/");
    signOut(auth)
      .then(() => {
        handleUser(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorCodes[errorCode] || errorMessage);
      });
  };

  const sendPasswordReset = (email) => {
    setError(null);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("password reset email sent");
        Router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError(errorCodes[errorCode] || errorMessage);
      });
  };

  const emailAuthProv = (email, password) => {
    const credential = EmailAuthProvider.credential(email, password);
    return credential;
  };

  const reauthenticateUser = (credential, newPassword) => {
    setError(null);
    reauthenticateWithCredential(auth.currentUser, credential)
      .then(() => {
        console.log("user authenticated");

        if (newPassword) {
          passwordUpdate(newPassword);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError(errorCodes[errorCode] || errorMessage);
      });
  };

  const passwordUpdate = (newPassword) => {
    setError(null);
    updatePassword(auth.currentUser, newPassword)
      .then(() => {
        console.log("passwordUpdated");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError(errorCodes[errorCode] || errorMessage);
      });
  };

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
    setError,
    createUser,
    signinWithEmail,
    signout,
    sendPasswordReset,
    reauthenticateUser,
    emailAuthProv,
    passwordUpdate,
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
