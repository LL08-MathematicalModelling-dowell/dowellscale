import { Route, Routes } from "react-router-dom";
import NpsLiteScale from "./pages/NpsLiteScale";
import HomePage from "./pages/HomePage";
import ReportPage from "./pages/ReportPage";
// import DowellScaleForCollege from "./pages/DowellScaleForCollege11";
import DowellScaleForCollegeReport from "./pages/CollegeScaleReport";
import DowellScaleForCollege from "./pages/DowellScaleForCollege";
import Evaluate from "./pages/Evaluate";
import TeacherReport from "./pages/teacher/TeacherReport";
import MVJReport from "./pages/MVJReport"
function App() {
  return (
    <>
      <Routes>
        <Route path="/dowellscale" element={<HomePage />} />
        <Route path="/dowellscale/npslitescale" Component={NpsLiteScale} />
        <Route path="/dowellscale/report" Component={ReportPage} />
        {/* {routes for questions} */}

        <Route path="/dowellscale/dowellscaleforcollege" Component={DowellScaleForCollege} />
        <Route path="/dowellscale/dowellscaleforcollege/report" Component={MVJReport} />


        <Route path="/dowellscale/dowellscalecollegereport" Component={DowellScaleForCollegeReport} />
        
        {/* routes for 0-10 ratings */}
        <Route path="/dowellscale/teacherevaluation" Component={Evaluate} />
        <Route path="/dowellscale/teacherevaluationreport" Component={TeacherReport} />
      </Routes>
    </>
  );
}

export default App;
