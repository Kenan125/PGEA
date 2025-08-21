import * as React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Header from "./components/Layouts/Header";
import { useSendForm } from "./hooks/useSendForm";
import Successful from "./pages/Successful";
import { useStyles } from "./style/useStyle";

interface AppProps {
  title: string;
}




const App: React.FC<AppProps> = () => {
  const classes = useStyles();
  
  const { formik } = useSendForm();


  return (
    <MemoryRouter>
      <Header logo="./assets/postaguvercinilogodaire.png" message="Posta Güvercini" />
      <div>
        <Routes>
          <Route path="/" element={<Home formik={formik} classes={classes} />} />
          <Route path="/Settings" element={<Settings formik={formik} />} />
          <Route path="/Successful" element={<Successful  />} />
        </Routes>
      </div>
    </MemoryRouter>
  );
};

export default App;
