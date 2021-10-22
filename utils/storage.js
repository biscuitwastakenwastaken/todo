import { storage } from "@/utils/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const handleUpload = async (file) => {
  try {
    const storageRef = ref(storage, `/images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log("File available at", url);
          // setFile(null);
          // setState((prevState) => ({
          //   ...prevState,
          //   photoUrl: url,
          // }));
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const getFile = async (givenRef, path) => {
  const url = await getDownloadURL(givenRef);

  // const xhr = new XMLHttpRequest();
  // xhr.responseType = "blob";
  // xhr.onload = (event) => {
  //   const blob = xhr.response;
  // };
  // xhr.open("GET", url);
  // xhr.send();

  console.log(url);
  return url;
};
