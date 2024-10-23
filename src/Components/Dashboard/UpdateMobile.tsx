import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useForm, SubmitHandler } from "react-hook-form";

interface VisibilityProps {
  visibility: boolean;
  cancelBtn: boolean;
  onHide: () => void; // Include onHide prop
}

interface Inputs {
  mobile: string;
  otp: string;
}

export default function MobileModal({
  visibility,
  cancelBtn,
  onHide, // Destructure onHide
}: VisibilityProps) {
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [OTP, setOTP] = useState("");
  const [OTPSent, setOTPSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setWhatsappNumber(data.mobile);
    setOTPSent(true);
  };

  return (
    <Modal show={visibility} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Body>
        {!OTPSent ? (
          <>
            <p>
              Please enter the number associated with your WhatsApp account to
              receive reminders:
            </p>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <InputGroup className="mt-3">
                <Form.Control
                  placeholder="WhatsApp Number"
                  aria-label="mobile"
                  aria-describedby="mobilenumber"
                  type="tel" // Use 'tel' for phone numbers
                  maxLength={10}
                  inputMode="numeric"
                  className={`${errors.mobile && "errorBorder"} shadow-none`}
                  {...register("mobile", {
                    required: "Please fill this field.",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Invalid Mobile Number. Must be numbers only.",
                    },
                    validate: (value) => {
                      if (value.length !== 10) {
                        return "Invalid Mobile Number. Must be 10 digits";
                      }
                      return true;
                    },
                  })}
                />
              </InputGroup>
              {errors.mobile && (
                <span className="errorMessage">{errors.mobile.message}</span>
              )}
              <div className="flex items-center gap-2 mt-3">
                <Button
                  type="submit"
                  variant="contained"
                  className="flex-1"
                  disableElevation
                >
                  Get OTP
                </Button>
                {cancelBtn && (
                  <Button
                    variant="contained"
                    className="flex-1"
                    color="error"
                    disableElevation
                    onClick={onHide} // Close the modal on Cancel
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </>
        ) : (
          <>
            <p
              style={{ fontSize: "13px" }}
              className="flex items-center gap-1 text-blue-600"
            >
              <ArrowBackIcon sx={{ fontSize: "15px" }} />
              <span>Change Number</span>
            </p>
            <p className="text-sm pt-3">
              Enter the 6 digit One-Time Password (OTP) sent to your WhatsApp
              number: {whatsappNumber}
            </p>
            <InputGroup className="my-3">
              <Form.Control
                placeholder="OTP"
                type="num"
                maxLength={6}
                inputMode="numeric"
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
              />
            </InputGroup>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}
