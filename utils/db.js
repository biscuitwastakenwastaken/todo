import { db } from "@/utils/firebase";
import { getDoc, addDoc, doc, setDoc, updateDoc } from "firebase/firestore";
// stripe stuff TODO

export const createUserDB = async (uid, data) => {
  console.log(uid, data);
  try {
    const docRef = doc(db, "users", uid);
    await setDoc(docRef, { ...data }, { merge: true });

    console.log("Document written with ID: ", docRef);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const updateUser = async (uid, data) => {
  try {
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, {
      ...data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getDocument = async (collection, document) => {
  try {
    const docRef = doc(db, collection, document);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (error) {}
};
