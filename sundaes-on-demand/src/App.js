import { SummaryForm, OrderEntry } from "./pages";
import {OrderDetailsProvider} from './contexts/OrderDetails';
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
      <OrderEntry />
      </OrderDetailsProvider>
      <SummaryForm />
    </Container>
  );
}

export default App;
