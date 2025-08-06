import * as React from "react";
import Header from "./Header";
import HeroList, { HeroListItem } from "./HeroList";
import TextInsertion from "./TextInsertion";
import { makeStyles } from "@fluentui/react-components";
import { Ribbon24Regular, LockOpen24Regular, DesignIdeas24Regular } from "@fluentui/react-icons";
import { insertText } from "../taskpane";
import { Link, MemoryRouter, Route, Routes } from "react-router-dom";
import InsertTextToSelection from "./InsertTextToSelection";
import { insertSelectedArea } from "../insertselectedarea";
import { readSelectedArea } from "../readselectedarea";
import ReadSelectedArea from "./ReadSelectedArea";

import SendNow from "./SendNow";
import Test from "./Test";
import { highlightTest } from "../test";
import BatchSend from "./BatchSend";
import { batchSend } from "../batchsend";
import SendScheduled from "./SendScheduled";
import {setDate } from "../setdate";
import SetDate from "./SetDate";
import { getDate } from "../getdate";
import GetDate from "./GetDate";
import { listUsedcolumns } from "../listusedcolumns";


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
      <div className={styles.root}>
        
        <nav>
          <Link to="/">Home</Link> |
          <Link to="/insert-text">Insert Text To Area</Link> |
          <Link to="/read-selected-text">Read Selected Text</Link> |
          <Link to="/send-now">Send Now</Link> |
          <Link to="/batch-send">Batch Send</Link> |       
          <Link to="/Test">Test</Link> |
          <Link to="/send-scheduled">Send Scheduled</Link> |
          <Link to="/set-date">Set Date</Link> |
          <Link to="/get-date">Get Date</Link>

        </nav>
        <Routes>
          <Route path="/" element={<TextInsertion insertText={insertText} />} />
          <Route path="/insert-text" element={<InsertTextToSelection insertSelectedArea={insertSelectedArea} />} />
          <Route path ="/read-selected-text" element={<ReadSelectedArea readSelectedArea={readSelectedArea} />} />
          <Route path="/send-now" element={<SendNow />} />
          <Route path="/Test" element={<Test highlightTest={highlightTest}/>}/>
          <Route path ="/batch-send" element={<BatchSend />} />
          <Route path = "/send-scheduled" element={<SendScheduled />} />
          <Route path = "/set-date" element={<SetDate setDate={setDate} />} />
          <Route path="/get-date" element={<GetDate getDate={getDate} listUsedColumns={listUsedcolumns} />} />

        </Routes>
      
      
    </div>

    </MemoryRouter>
    
  );
};

export default App;
