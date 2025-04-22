import axios from "axios";
import { useEffect } from "react";
import { useRef } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Firebase instances
const auth = getAuth();
const db = getFirestore();

const Form = () => {
  const Ref = useRef(null);
  const user = auth.currentUser;

  useEffect(() => {
    async function fetchdata() {
      const res = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBzTz45cN1TkXStJ_HeGJ00t4OQJ8uY6wY",
        {
          idToken: localStorage.getItem("token"),
        }
      );
      Ref.current.value = res.data.users[0].displayName;
      let name = document.getElementById("name");
      name.value = res.data.users[0].displayName;
      console.log(res.data.users[0].displayName);
    }
    fetchdata();
  }, []);
  async function submitandler(e) {
    e.preventDefault();
    const uid = user.uid;
    try {
      const userData = {
        idToken: localStorage.getItem("token"),
        displayName: e.target.name.value,
        photourl: e.target.link.value,
        returnSecureToken: true,
      };
      // Save data to Firestore under a document named with the user's UID
      await setDoc(doc(db, "users", uid), userData);
    } catch (error) {
      console.error("Error writing user data: ", error);
    }
  }

  return (
    <>
      <h3>Winner never quits quitters never win </h3>
      <hr></hr>
      <form onSubmit={submitandler}>
        <label htmlFor="name" ref={Ref}>
          Name
        </label>
        <input id="name"></input>
        <label htmlFor="link">Image Url</label>
        <input id="link"></input>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
export default Form;
