import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { TripProvider, useTrip } from './context/TripContext.jsx';

import './App.css';
// import { stationList } from './utils/stationList.js';
import RoutePage from './pages/RoutePage.jsx';
import SeatPage from './pages/SeatPage.jsx';
import TicketPage from './pages/TicketPage.jsx';
import TimerPage from './pages/TimerPage.jsx';
import ResultPage from './pages/ResultPage.jsx';

function App() {
    return (
        <>
            <TripProvider>
                <BrowserRouter>
                    <AppRoutes />
                </BrowserRouter>
            </TripProvider>
        </>
    );
}

function AppRoutes() {
    const { train, selected, departure } = useTrip();
    return (
        <>
            {/* <Header /> */}
            <section id="warpper">
                <Routes>
                    <Route path="/" element={<RoutePage />}></Route>
                    <Route
                        path="/seat"
                        element={train && selected ? <SeatPage /> : <Navigate to="/" replace />}></Route>
                    <Route
                        path="/ticket"
                        element={train && selected && departure ? <TicketPage /> : <Navigate to="/" replace />}></Route>
                    <Route
                        path="/timer"
                        element={train && selected && departure ? <TimerPage /> : <Navigate to="/" replace />}></Route>
                    <Route
                        path="/result"
                        element={train && selected && departure ? <ResultPage /> : <Navigate to="/" replace />}></Route>
                    {/* <Route path="*" element={<Navigate to="/" />} /> */}
                </Routes>
            </section>
        </>
    );
}

export default App;
