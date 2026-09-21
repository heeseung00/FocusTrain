import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useTripStore from './stores/useTripStore.js';

import './App.css';
import './styles/button.css';
import Header from './components/Header.jsx';
import RoutePage from './pages/RoutePage.jsx';
import SeatPage from './pages/SeatPage.jsx';
import TicketPage from './pages/TicketPage.jsx';
import TimerPage from './pages/TimerPage.jsx';
import ResultPage from './pages/ResultPage.jsx';

function App() {
    return (
        <>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </>
    );
}

function AppRoutes() {
    const { train, selected, departure } = useTripStore();
    // 각 페이지 접근에 필요한 조건
    const isTripReady = Boolean(train && selected && selected !== '선택' && departure);

    return (
        <section id="wrapper">
            <Header />

            <Routes>
                <Route path="/" element={<RoutePage />}></Route>
                <Route path="/seat" element={isTripReady ? <SeatPage /> : <Navigate to="/" replace />}></Route>
                <Route path="/ticket" element={isTripReady ? <TicketPage /> : <Navigate to="/" replace />}></Route>
                <Route path="/timer" element={isTripReady ? <TimerPage /> : <Navigate to="/" replace />}></Route>
                <Route path="/result" element={isTripReady ? <ResultPage /> : <Navigate to="/" replace />}></Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </section>
    );
}

export default App;
