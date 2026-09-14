import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { TripProvider, useTrip } from './context/TripContext.jsx';
import { TimerProvider, useTimer } from './context/TimerContext.jsx';

import './App.css';
import './styles/button.css';
import RoutePage from './pages/RoutePage.jsx';
import SeatPage from './pages/SeatPage.jsx';
import TicketPage from './pages/TicketPage.jsx';
import TimerPage from './pages/TimerPage.jsx';
import ResultPage from './pages/ResultPage.jsx';

function App() {
    // 새로고침으로 들어온 경우
    const navigation = performance.getEntriesByType('navigation')[0];
    const isReload = navigation?.type === 'reload';

    // 메인이 아닌 페이지에서 새로고침했으면
    // React 렌더링 전에 메인으로 이동
    if (isReload && window.location.pathname !== '/') {
        window.location.replace('/');
        return null;
    }
    return (
        <>
            <TripProvider>
                <TimerProvider>
                    <BrowserRouter>
                        <AppRoutes />
                    </BrowserRouter>
                </TimerProvider>
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

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </section>
    );
}

export default App;
