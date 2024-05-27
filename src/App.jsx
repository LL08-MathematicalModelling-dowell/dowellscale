import { Route, Routes } from "react-router-dom";
import NpsLiteScale from "./pages/NpsLiteScale";
import HomePage from "./pages/HomePage";
import ReportPage from "./pages/ReportPage";
import DowellScaleForCollege from "./pages/DowellScaleForCollege";
import DowellScaleForCollegeReport from "./pages/CollegeScaleReport";
import Demo from "./pages/Demo";
import Evaluate from "./pages/Evaluate";
import TeacherReport from "./pages/teacher/TeacherReport";

function App() {
  return (
    <>
      <Routes>
        <Route path="/dowellscale" element={<HomePage />} />
        <Route path="/dowellscale/npslitescale" Component={NpsLiteScale} />
        <Route path="/dowellscale/report" Component={ReportPage} />
        <Route path="/dowellscale/dowellscaleforcollege" Component={DowellScaleForCollege} />
        <Route path="/dowellscale/dowellscalecollegereport" Component={DowellScaleForCollegeReport} />
        <Route path="/dowellscale/teacher" Component={Demo} />
        <Route path="/dowellscale/teacherevaluation" Component={Evaluate} />
        <Route path="/dowellscale/teacherevaluationreport" Component={TeacherReport} />
      </Routes>
    </>
  );
}

export default App;
