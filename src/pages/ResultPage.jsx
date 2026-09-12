import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '../context/TripContext.jsx';
import { stationList } from '../utils/stationList.js';
import { formatTime, formatElapsedTime } from '../utils/time.js';
import { getTrainInfo } from '../utils/getTrainInfo.js';
import noticeIcon from '../assets/notice-icon.svg';
// import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import useDebouncedWinSize from '../hooks/useDebouncedWinSize.jsx';

function ResultPage() {
    // ---- 선택 상태 ----
    const {
        train,
        selected,
        departure,
        resultPercent,
        elapsed,

        resetTrip,
    } = useTrip();

    const { selectedStation, trainLabel } = getTrainInfo(train, selected, stationList);

    const { width, height } = useDebouncedWinSize(); // 커스텀 훅 사용

    const navigate = useNavigate();
    // 처음으로 돌아가기 버튼
    const navigateGoToFirst = () => {
        // 공통 context 초기화
        resetTrip();
        navigate('/');
    };

    // 진행률에 따라 다른 결과 텍스트 출력
    const parcentText = () => {
        if (resultPercent === 100) {
            return '목표 시간을 달성했습니다! 멋지게 해내셨네요👏';
        }
        if (resultPercent >= 70 && resultPercent <= 99) {
            return '거의 다 왔어요! 조금만 더 힘내봐요🔥';
        } else if (resultPercent >= 30 && resultPercent <= 69) {
            return '차근차근 잘 가고 있어요. 지금처럼만 계속해봐요🌱';
        } else {
            return '첫 발을 내딛은 것만으로도 충분해요! 가볍게 시작해볼까요 ✨';
        }
    };

    return (
        <div className="result">
            {resultPercent === 100 && <Confetti width={width} height={height} recycle={false} numberOfPieces={200} />}
            <div className="result-content item">
                <div className="result-title">
                    <h2 className="depart">{selectedStation?.city}</h2>

                    <p className="info">
                        {departure} → {selectedStation?.city} · {trainLabel}
                    </p>
                </div>

                <hr />

                <div className="result-metric">
                    <div className="metric">
                        <h4>집중시간</h4>
                        <div className="metric-text focus">{formatElapsedTime(elapsed)}</div>
                    </div>
                    <div className="metric">
                        <h4>진행률</h4>
                        <div className="metric-text percent">{resultPercent}%</div>
                    </div>
                </div>
                <div className="result-notice">
                    <img src={noticeIcon} alt="트로피 이미지" className="notice-img"></img>
                    <p className="notice-text">{parcentText()}</p>
                </div>
            </div>

            <div className="button-group">
                <button className="restart accent" onClick={navigateGoToFirst}>
                    새로운 여정 시작하기
                </button>
            </div>
        </div>
    );
}

export default ResultPage;
