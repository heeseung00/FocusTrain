import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { TripProvider, useTrip } from './context/TripContext.jsx';

import './App.css';
import './styles/button.css';
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
    const { pathname } = useLocation();

    const pageTitle = {
        '/': '메인',
        '/seat': '좌석 선택',
        '/ticket': '티켓 발권',
        '/timer': '타이머',
        '/result': '도착 안내',
    }[pathname];
    return (
        <section id="wrapper">
            <div className="container">
                <h1 className="title-text">Focus Train</h1>
                <div className="page">{pageTitle}</div>
            </div>

            <Routes>
                <Route path="/" element={<RoutePage />}></Route>
                <Route path="/seat" element={train && selected ? <SeatPage /> : <Navigate to="/" replace />}></Route>
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
    );
}

export default App;
