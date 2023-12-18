import { BrowserRouter } from 'react-router-dom';
import PublicRoutes from './routes';
import { ChakraProvider } from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <BrowserRouter className="App">
      <ChakraProvider>
        <PublicRoutes />
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
