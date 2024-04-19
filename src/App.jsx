import { Route, Routes } from "react-router-dom";
import NpsLiteScale from "./pages/NpsLiteScale";

function App() {
  return (
    <>
      <Routes>
        <Route path="/dowellscale/npslitescale" Component={NpsLiteScale} />
      </Routes>
    </>
  );
}

export default App;
