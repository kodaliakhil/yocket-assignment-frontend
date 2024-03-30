import { useEffect, useState } from "react";
import Header from "./components/Header";
import CriminalCard from "./components/CriminalCard";
import CopsCards from "./components/CopsCards";

function App() {
  return (
    <>
      {/* <Header /> */}
      <div style={{ padding: "30px" }}>
        <CopsCards />
        <h4>For Testing purpose showing criminal info below</h4>
        <CriminalCard />
      </div>
    </>
  );
}

export default App;
