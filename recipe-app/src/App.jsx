import Pages from "../pages/Pages";
import Category from "../Components/Category";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Category />
      <Pages />
    </BrowserRouter>
  );
};

export default App;
