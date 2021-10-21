import { db } from "@/utils/firebase";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
// stripe stuff TODO

export const createUserDB = async (uid, data) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSet = await setDoc(docRef, { ...data }, { merge: true });

    console.log(docSet);
    console.log("Document written with ID: ", docRef);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
