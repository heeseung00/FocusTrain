import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
// import { stationList } from './utils/stationList.js';
import { TripProvider } from './context/TripContext.jsx';
import RoutePage from './pages/RoutePage.jsx';
import SeatPage from './pages/SeatPage.jsx';
import TicketPage from './pages/TicketPage.jsx';
import TimerPage from './pages/TimerPage.jsx';

function App() {
    return (
        <>
            <TripProvider>
                <BrowserRouter>
                    {/* <Header /> */}
                    <section id="center">
                        <Routes>
                            <Route path="/" element={<RoutePage />}></Route>
                            <Route path="/seat" element={<SeatPage />}></Route>
                            <Route path="/ticket" element={<TicketPage />}></Route>
                            <Route path="/timer" element={<TimerPage />}></Route>
                            {/* <Route path="*" element={<Navigate to="/" />} /> */}
                        </Routes>
                    </section>
                </BrowserRouter>
            </TripProvider>
        </>
    );
}

export default App;
