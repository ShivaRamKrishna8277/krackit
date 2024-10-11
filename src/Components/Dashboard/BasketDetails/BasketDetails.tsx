import { useParams } from "react-router-dom";

export default function BasketDetail() {
  // Get the 'id' param from the URL
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Basket Detail for ID: {id}</h1>
    </div>
  );
}
