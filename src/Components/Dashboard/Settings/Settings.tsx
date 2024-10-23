import Navbar from "../Navbar/Navbar";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import { getLocalDetails } from "@/assets/Data/userData";
import MobileModal from "../UpdateMobile";
import { ref, update } from "firebase/database";
import { db } from "../../../../firebase";
import CircularProgress from "@mui/material/CircularProgress";

export default function Settings() {
  const [showNameInput, setshowNameInput] = useState(false);
  const personlInfo = getLocalDetails();

  // Mobile Modal
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Change name function
  const [newName, setNewName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const changeName = async () => {
    if (newName.length > 0) {
      setIsUpdating(true);
      const user = getLocalDetails();
      const uid = user.uid;

      const userRef = ref(db, `users/${uid}`);
      try {
        await update(userRef, { name: newName });
        const personalInfo = {
          uid: user.uid,
          name: newName,
          email: user.email,
        };
        localStorage.setItem("details", JSON.stringify(personalInfo));
        setNewName(newName);
      } catch (error) {
        console.log(error);
        alert(error);
      } finally {
        setTimeout(() => {
          setIsUpdating(false);
          setshowNameInput(false);
        }, 1000);
      }
    }
  };
  return (
    <>
      <Navbar />
      <MobileModal
        visibility={showModal}
        cancelBtn={true}
        onHide={handleCloseModal}
      />
      <div className="px-4">
        <p className="subTitle mb-2">Settings</p>
        <ul className="border rounded bg-white px-3">
          <li className="py-3 border-b">
            {!showNameInput ? (
              <>
                <div className="flex items-center justify-between">
                  <p>{personlInfo.name}</p>
                  <p
                    className="text-xs text-blue-700"
                    onClick={() => setshowNameInput(true)}
                  >
                    change
                  </p>
                </div>
              </>
            ) : (
              <InputGroup>
                <Form.Control
                  placeholder="Full Name"
                  aria-label="Full Name"
                  aria-describedby="fullname"
                  className="shadow-none"
                  onChange={(e) => setNewName(e.target.value)}
                />
                <InputGroup.Text id="fullnamesubmit" onClick={changeName}>
                  {isUpdating ? <CircularProgress size="10px" /> : "Submit"}
                </InputGroup.Text>
              </InputGroup>
            )}
          </li>
          <li className="py-3 border-b">
            <div className="flex items-center justify-between">
              <p>{personlInfo.mobile ? personlInfo.mobile : "00000 00000"}</p>
              <p className="text-xs text-blue-700" onClick={handleOpenModal}>
                change
              </p>
            </div>
          </li>
          <li className="py-3 border-b">
            <p>{personlInfo.email}</p>
          </li>
        </ul>
      </div>
    </>
  );
}
