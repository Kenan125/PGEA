import * as React from "react";

import TextInsertion from "./components/TextInsertion";
import { makeStyles } from "@fluentui/react-components";
import { insertText } from "./taskpane";
import { Link, MemoryRouter, Route, Routes } from "react-router-dom";
import InsertTextToSelection from "./components/InsertTextToSelection";
import { insertSelectedArea } from "./insertselectedarea";
import { readSelectedArea } from "./readselectedarea";
import ReadSelectedArea from "./components/ReadSelectedArea";

import SendNow from "./components/SendNow";
import Test from "./components/Test";
import { highlightTest } from "./test";
import BatchSend from "./components/BatchSend";
import SendScheduled from "./components/SendScheduled";
import { setDate } from "./setdate";
import SetDate from "./components/SetDate";
import { getDate } from "./getdate";
import GetDate from "./components/GetDate";

import Send from "./components/Send";
import ReadColumn from "./components/ReadColumn";

import Header from "./pages/Header";
import Formikp from "./pages/Formikp";
import  Settings  from "./pages/Settings"
import TestMessage from "./testsome/TestMessage";





interface AppProps {
  title: string;
}

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const App: React.FC<AppProps> = () => {
  const styles = useStyles();

  return (
    <MemoryRouter>
      <Header logo="./assets/postaguvercinilogodaire.png" message="Posta Güvercini" />
      <div className={styles.root}>
        {/* <nav>
          <Link to="/insert-text">Insert Text To Area</Link> |
          <Link to="/send">Send</Link> | <Link to="/formikp">Formik</Link>
          <Link to="/">Home</Link> | |
          <Link to="/read-selected-text">Read Selected Text</Link> |
          <Link to="/send-now">Send Now</Link> |<Link to="/batch-send">Batch Send</Link> |
          <Link to="/Test">Test</Link> |<Link to="/send-scheduled">Send Scheduled</Link> |
          <Link to="/set-date">Set Date</Link> |<Link to="/get-date">Get Date</Link> |
          <Link to="/send">Send</Link>
            | <Link to="/read-column">Read Column</Link> |
            <Link to="/Settings">Settings</Link>
            | <Link to="/TestMessage">test message</Link>

        </nav> */}
        <Routes>
           <Route path="/" element={<Formikp />} />
          <Route
            path="/insert-text"
            element={<InsertTextToSelection insertSelectedArea={insertSelectedArea} />}
          />
          <Route path="/" element={<TextInsertion insertText={insertText} />} />
          
          <Route
            path="/read-selected-text"
            element={<ReadSelectedArea readSelectedArea={readSelectedArea} />}
          />
          <Route path="/send-now" element={<SendNow />} />
          <Route path="/Test" element={<Test highlightTest={highlightTest} />} />
          <Route path="/batch-send" element={<BatchSend />} />
          <Route path="/send-scheduled" element={<SendScheduled />} />
          <Route path="/set-date" element={<SetDate setDate={setDate} />} />
          <Route path="/get-date"  element={<GetDate getDate={getDate}  />} />
          <Route path="/send"  element={<Send  /> } />
          <Route path="/formikp"  element={<Formikp  /> } />
          <Route path ="/read-column" element={<ReadColumn />} />
          <Route path="/Settings" element={<Settings/>} />
          <Route path="/TestMessage" element={<TestMessage/>} />
        </Routes>
      </div>
    </MemoryRouter>
  );
};

export default App;
