import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeProtected from "./components/Home";
import Results from "./components/Results";
import FullTable from "./components/FullTable";
import Access from "./components/All";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Protected from "./components/Protected";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SignedOut>
                    <Access />
                  </SignedOut>
                  <SignedIn>
                    <HomeProtected />
                  </SignedIn>
                </>
              }
            />
            <Route
              path="/result"
              element={
                <>
                  <SignedOut>
                    <Protected />
                  </SignedOut>
                  <SignedIn>
                    <Results />
                  </SignedIn>
                </>
              }
            />
            <Route
              path="/table"
              element={
                <>
                  <SignedOut>
                    <Protected />
                  </SignedOut>
                  <SignedIn>
                    <FullTable />
                  </SignedIn>
                </>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
