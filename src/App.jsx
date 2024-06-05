import { Route, Routes } from "react-router-dom";
import NpsLiteScale from "./pages/NpsLiteScale";
import HomePage from "./pages/HomePage";
import ReportPage from "./pages/ReportPage";
// import DowellScaleForCollege from "./pages/DowellScaleForCollege11";
import DowellScaleForCollegeReport from "./pages/CollegeScaleReport";
import DowellScaleForCollege from "./pages/DowellScaleForCollege";
import DowellScaleNew from "./pages/DowellScaleNew";
import Evaluate from "./pages/Evaluate";
import TeacherReport from "./pages/teacher/TeacherReport";
import MVJReport from "./pages/MVJReport"
import ExhibitionPage from "./pages/ExhibitionPage";
import ExhibitionReport from "./pages/ExhibitionReport";
import NpxLite from "./templates/NpxLite"
import Nps from "./templates/Nps"
import Likert from "./templates/Likert"
import Stapel from "./templates/Stapel"
import Llx from "./templates/Llx"
import RegistrationPage from "./pages/RegistrationPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/dowellscale" element={<HomePage />} />
        <Route path="/dowellscale/npslitescale" Component={NpsLiteScale} />
        <Route path="/dowellscale/report" Component={ReportPage} />
        {/* {routes for questions} */}

        <Route path="/dowellscale/dowellscaleforcollege" Component={DowellScaleForCollege} />

        <Route path="/dowellscale/dowellscaleforcollege/mvj" Component={DowellScaleNew} />
        <Route path="/dowellscale/dowellscaleforcollege/report" Component={MVJReport} />


        <Route path="/dowellscale/dowellscalecollegereport" Component={DowellScaleForCollegeReport} />

        {/* routes for 0-10 ratings */}
        <Route path="/dowellscale/teacherevaluation" Component={Evaluate} />
        <Route path="/dowellscale/teacherevaluation/report" Component={TeacherReport} />
        <Route path="/dowellscale/plex-exhibition" Component={ExhibitionPage}/>
        <Route path="/dowellscale/plex-exhibition/report" Component={ExhibitionReport}/>

        <Route path="/dowellscale/shop/registration" Component={RegistrationPage}/>

          {/* templates */}
        <Route path="/dowellscale/templates/npslite" Component={NpxLite}/>
        <Route path="/dowellscale/templates/nps" Component={Nps}/>
        <Route path="/dowellscale/templates/likert" Component={Likert}/>
        <Route path="/dowellscale/templates/stapel" Component={Stapel}/>
        <Route path="/dowellscale/templates/llx" Component={Llx}/>
      </Routes>
    </>
  );
}

export default App;
