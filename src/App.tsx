import { RouterProvider } from "react-router-dom";
import "@styles/common.scss";
import axios from "axios";
import Router from "./utils/Router";
import { MediaQueryProvider } from "./hooks/useMediaQuery";

axios.defaults.baseURL = "https://api.yeoyeo.co.kr";

function App() {
  return (
    <div className="App">
      <MediaQueryProvider>
        <RouterProvider router={Router} />
      </MediaQueryProvider>
    </div>
  );
}

export default App;
