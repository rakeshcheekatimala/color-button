import { useState } from "react";
import { OrderEntry, OrderSummary, OrderConfirmation } from "./pages";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import Container from "react-bootstrap/Container";

function App() {
  const [orderPhase, setOrderPhase] = useState("InProgress");

  let Component = OrderEntry;

  switch (orderPhase) {
    case "InProgress":
      Component = OrderEntry;
      break;
    case "Review":
      Component = OrderSummary;
      break;
    case "completed":
      Component = OrderConfirmation;
      break;
    default:
  }
  return (
    <OrderDetailsProvider>
      <Container>{<Component setOrderPhase={setOrderPhase} />}</Container>
    </OrderDetailsProvider>
  );
}

export default App;
