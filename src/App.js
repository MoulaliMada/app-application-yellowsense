import { useState } from "react";
import Jobs from "./components/Jobs";
import Bookmarks from "./components/Bookmarks";
import "./App.css";

function App() {
  const [navigationPage, setNavigationPage] = useState("Jobs");
  const onClickJobs = () => setNavigationPage("Jobs");
  const onClickBookmarks = () => setNavigationPage("Bookmarks");
  return (
    <div className="app">
      {navigationPage === "Jobs" ? <Jobs /> : <Bookmarks />}
      <div className="bottom-nav-bar">
        <button
          onClick={onClickJobs}
          className={
            navigationPage === "Jobs" ? "active-nav-buttons" : "nav-buttons"
          }
        >
          Jobs
        </button>
        <button
          onClick={onClickBookmarks}
          className={
            navigationPage === "Bookmarks"
              ? "active-nav-buttons"
              : "nav-buttons"
          }
        >
          Bookmarks
        </button>
      </div>
    </div>
  );
}
export default App;
