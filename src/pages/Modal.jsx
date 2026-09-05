import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '../context/TripContext.jsx';
import { stationList } from '../utils/stationList.js';
import { getArriveTime } from '../utils/time.js';
import { getTrainInfo } from '../utils/getTrainInfo.js';

function Modal() {
    // ---- 선택 상태 ----
    const {
        train,
        selected,
        isToggleOn,
        focusTime,
        departure,
        setActiveCoach,
        setSelectedSeat,
        totalTime,
        elapsed,
        setElapsed,
        resultPercent,
        modal,
        setModal,
        setTimerState,
    } = useTrip();

    const navigate = useNavigate();

    const TimerformatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    if (!modal) return null;

    const handleBack = () => {
        setModal(false);
        setTimerState(true);
    };

    const handleEnd = () => {
        setModal(false);
        setTimerState(false);
        navigate('/result');
    };

    return (
        <>
            {modal && (
                <div className="modal">
                    <div className="modal-content item">
                        <h2>여행을 종료할까요?</h2>

                        <div className="now">
                            <h4>현재 집중 시간</h4>
                            <h1>{TimerformatTime(elapsed)}</h1>
                        </div>

                        <div className="button-group">
                            <button className="" onClick={handleBack}>
                                돌아가기
                            </button>
                            <button className="end" onClick={handleEnd}>
                                종료하기
                            </button>
                        </div>
                    </div>
                    <div className="modal-background"></div>
                </div>
            )}
        </>
    );
}

export default Modal;
