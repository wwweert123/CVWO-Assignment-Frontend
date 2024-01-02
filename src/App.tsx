import Home from "./pages/Home";
// import BasicThreadView from "./pages/BasicThreadView";
// import StyledThreadView from "./pages/StyledThreadView";
import ThreadView from "./pages/ThreadView";
import ThemeProvider from "./theme";
import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
    return (
        <div className="App">
            <ThemeProvider>
                <BrowserRouter>
                    <Routes>
                        {/* <Route path="/thread/1" element={<BasicThreadView />} />
                        <Route path="/thread/1/styled" element={<StyledThreadView />} /> */}
                        <Route path="/" element={<Home />} />
                        <Route path="/forum_threads/:id" element={<ThreadView />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
};

export default App;
