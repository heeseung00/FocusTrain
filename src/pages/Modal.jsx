import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '../context/TripContext.jsx';
import { stationList } from '../utils/stationList.js';
import { getArriveTime } from '../utils/time.js';
import { getTrainInfo } from '../utils/getTrainInfo.js';

function Modal() {
    // ---- 선택 상태 ----
    const { modal, setModal, elapsed, setTimerState } = useTrip();

    const navigate = useNavigate();

    const TimerformatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    if (!modal) return null;

    const modalContent = {
        departure: {
            title: '출발지를 선택해주세요.',
            confirmText: '확인',
        },

        arrival: {
            title: '도착지를 선택해주세요.',
            confirmText: '확인',
        },

        rest: {
            title: '정차역에 도착했습니다.',
            description: '20분간 정차합니다.',
            confirmText: '확인',
        },

        end: {
            title: '여행을 종료할까요?',
            confirmText: '종료하기',
            cancelText: '돌아가기',
        },
    };

    const content = modalContent[modal];

    const handleConfirm = () => {
        if (modal === 'end') {
            setModal(false);
            setTimerState(false);
            navigate('/result');
            return;
        }

        if (modal === 'rest') {
            setModal(false);
            setTimerState(true);
            return;
        }

        // 출발지/도착지 미선택
        setModal(false);
    };

    const handleCancel = () => {
        setModal(false);
        setTimerState(true);
        // navigate('/result');
    };

    return (
        <div className="modal">
            <div className="modal-content item">
                {/* <h2>여행을 종료할까요?</h2> */}
                <h2>{content.title}</h2>

                {content.description && <p>{content.description}</p>}
                {modal === 'end' && (
                    <div className="now">
                        <h4>현재 집중 시간</h4>
                        <h1>{TimerformatTime(elapsed)}</h1>
                    </div>
                )}

                <div className="button-group">
                    {content.cancelText && (
                        <button type="button" onClick={handleCancel}>
                            {content.cancelText}
                        </button>
                    )}

                    <button type="button" className={modal === 'end' ? 'end' : ''} onClick={handleConfirm}>
                        {content.confirmText}
                    </button>
                </div>
            </div>
            <div className="modal-background"></div>
        </div>
    );
}

export default Modal;
