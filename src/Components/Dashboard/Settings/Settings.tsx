import Navbar from "../Navbar/Navbar";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import { getLocalDetails } from "@/assets/Data/userData";
import MobileModal from "../UpdateMobile";

export default function Settings() {
  const [showNameInput, setshowNameInput] = useState(false);
  const personlInfo = getLocalDetails();

  // Mobile Modal
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
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
                />
                <InputGroup.Text id="fullnamesubmit">Submit</InputGroup.Text>
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
