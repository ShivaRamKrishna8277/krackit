import { Avatar, Button, Switch } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import demoProfile from "../../../assets/images/demoAvatar.webp";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";

export default function Settings() {
  const [showFileInput, setshowFileInput] = useState(false);
  const [showNameInput, setshowNameInput] = useState(false);
  const [showEmailInput, setshowEmailInput] = useState(false);

  const label = { inputProps: { "aria-label": "Email Notifications" } };
  return (
    <>
      <Navbar />

      <div className="px-4 h-screen">
        <p className="subTitle mb-2">Settings</p>
        <ul className="border rounded bg-white px-3">
          <li className="py-4 text-center border-b">
            <Avatar
              alt=""
              src={demoProfile}
              className="border mx-auto"
              sx={{ width: 150, height: 150 }}
            />
            {!showFileInput ? (
              <p
                className="text-xs mt-3 text-blue-700"
                onClick={() => setshowFileInput(true)}
              >
                Change Image
              </p>
            ) : (
              <>
                <Form.Group controlId="formFileSm" className="mt-3">
                  <Form.Control
                    type="file"
                    size="sm"
                    className="shadow-none mb-2"
                    accept="image/*"
                  />
                </Form.Group>
                <Button
                  size="small"
                  color="success"
                  variant="contained"
                  className="w-full"
                  disableElevation
                >
                  Upload
                </Button>
              </>
            )}
          </li>
          <li className="py-3 border-b">
            {!showNameInput ? (
              <div className="flex items-center justify-between">
                <p>Lewis Hamilton</p>
                <p
                  className="text-xs text-blue-700"
                  onClick={() => setshowNameInput(true)}
                >
                  change
                </p>
              </div>
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
            {!showEmailInput ? (
              <div className="flex items-center justify-between">
                <p>Lewishamilton44@gmail.com</p>
                <p
                  className="text-xs text-blue-700"
                  onClick={() => setshowEmailInput(true)}
                >
                  change
                </p>
              </div>
            ) : (
              <InputGroup>
                <Form.Control
                  placeholder="Email Address"
                  aria-label="Email Address"
                  aria-describedby="email"
                  className="shadow-none"
                />
                <InputGroup.Text id="emailsubmit">Submit</InputGroup.Text>
              </InputGroup>
            )}
          </li>
          <li className="py-2 border-b">
            <div className="flex items-center justify-between">
              <p>Email Notifications</p>
              <Switch {...label} defaultChecked />
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
