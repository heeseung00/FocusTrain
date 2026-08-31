import { useState } from 'react';
import './App.css';
// import { stationList } from './utils/stationList.js';
import RoutePage from './pages/RoutePage.jsx';

function App() {
    return (
        <>
            <section id="center">
                <RoutePage></RoutePage>
            </section>
        </>
    );
}

export default App;
