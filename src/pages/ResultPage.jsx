import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '../context/TripContext.jsx';
import { stationList } from '../utils/stationList.js';

//      도착 안내

//        부산역
//        BUSAN

//    서울역에서 출발하여
//    부산역에 도착했습니다.

//    ──────────────────

//    집중 시간       2h 10m
//    진행률             100%

//         [ 새로운 여행 ]

function ResultPage() {
    // ---- 선택 상태 ----
    const {
        train,
        selected,
        focusTime,
        setFocusTime,
        departure,
        totalTime,
        remainingTime,
        resultPercent,
        setResultPercent,
        elapsed,
        setElapsed,
    } = useTrip();

    const trainKey = train === '무궁화' ? 'mugunghwa' : train.toLowerCase();
    const selectedStation = stationList.find((item) => item.city === selected);
    const travelTime = selectedStation ? selectedStation.times[trainKey] : 0;

    const [initialtimer, setinitalTimer] = useState({
        focusTime: travelTime,
        shortbreak: 5,
    });

    // 집중시간
    const totalSecondsTime = parseInt(initialtimer.focusTime) * 60;

    const TimerformatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const navigate = useNavigate();
    // 처음으로 돌아가기 버튼
    const navigateGoToFirst = () => {
        navigate('/');
    };

    return (
        <section id="center">
            <>
                <h1>도착 안내</h1>

                <div className="depart">{selectedStation?.city}</div>

                <p>
                    {departure}에서 출발하여
                    <br />
                    {selectedStation?.city}에 도착했습니다.
                </p>

                <div className="focus">집중시간: {TimerformatTime(elapsed)}</div>
                <div className="focus-percent">진행률: {resultPercent}%</div>

                <button className="go-to-frist" onClick={navigateGoToFirst}>
                    새로운 여행 시작하기
                </button>
            </>
        </section>
    );
}

export default ResultPage;
