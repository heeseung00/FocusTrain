import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
// import { stationList } from './utils/stationList.js';
import RoutePage from './pages/RoutePage.jsx';
import TicketPage from './pages/TicketPage.jsx';

function App() {
    return (
        <>
            <BrowserRouter>
                {/* <Header /> */}
                <section id="center">
                    <Routes>
                        <Route path="/" element={<RoutePage />}></Route>
                        <Route path="/ticket" element={<TicketPage />}></Route>
                    </Routes>
                </section>
            </BrowserRouter>
        </>
    );
}

export default App;
