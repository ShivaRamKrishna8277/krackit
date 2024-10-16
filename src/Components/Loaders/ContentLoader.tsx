import Spinner from "react-bootstrap/esm/Spinner";

export default function Loader() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Spinner animation="border" variant="primary" />
    </div>
  );
}
