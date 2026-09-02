import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '../context/TripContext.jsx';
import { stationList } from '../utils/stationList.js';
import { getTrainInfo } from '../utils/getTrainInfo.js';

function ResultPage() {
    // ---- 선택 상태 ----
    const {
        train,
        selected,
        focusTime,
        departure,
        resultPercent,
        elapsed,

        resetTrip,
    } = useTrip();

    const { trainKey, selectedStation, travelTime, restCount } = getTrainInfo(train, selected, stationList);

    const [initialtimer, setinitalTimer] = useState({
        focusTime: travelTime,
        shortbreak: 5,
    });

    // // 집중시간
    // const totalSecondsTime = parseInt(initialtimer.focusTime) * 60;

    const TimerformatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const navigate = useNavigate();
    // 처음으로 돌아가기 버튼
    const navigateGoToFirst = () => {
        // 공통 context 초기화
        resetTrip();
        navigate('/');
    };

    return (
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
    );
}

export default ResultPage;
