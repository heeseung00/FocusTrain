import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useTripStore from '../stores/useTripStore.js';
import useTimerStore from '../stores/useTimerStore.js';
import { stationList } from '../utils/stationList.js';
import { formatDurationTime, getArriveTime } from '../utils/time.js';
import { getTrainInfo } from '../utils/getTrainInfo.js';
import Modal from './Modal.jsx';
import ProgressBarModule from '@ramonak/react-progress-bar';
const ProgressBar = ProgressBarModule.default ?? ProgressBarModule;
import resetIcon from '../assets/reset-icon.svg';
// import { number } from 'framer-motion';

function TimerPage() {
    // ---- 선택 상태 ----
    const { train, selected, isToggleOn, focusTime, departure, setModal } = useTripStore();
    const {
        setElapsed,
        resultPercent,
        setResultPercent,
        timerState,
        setTimerState,
        setRestSeconds,
        isResting,
        setIsResting,
    } = useTimerStore();

    const { selectedStation, restCount, trainLabel } = getTrainInfo(train, selected, stationList);

    const navigate = useNavigate();

    // 중간 정차 시간 관리
    const [currentIndex, setCurrentIndex] = useState(0);
    // 중간 정차역 리스트 관리
    const [showStationList, setShowStationList] = useState(false);

    // pomodoro-main
    const triggeredStopsRef = useRef(new Set()); //주석

    // 모달 열기
    const handleModalOpen = () => {
        setTimerState(false); //타이머 정지
        setModal('end'); // 모달 열기
    };

    // 전체 목표 시간
    const totalTimeSeconds = Number(focusTime) * 60;

    // 현재 남은 시간
    const [remainingTime, setRemainingTime] = useState(totalTimeSeconds);

    // 타이머 경과시간 표시 (전체 - 남은 시간)
    const elapsed = totalTimeSeconds - remainingTime;

    const handleTimerStart = () => {
        setIsResting(false); // 휴식 상태 진입
        setTimerState(true);
    };
    const handleTimerStop = () => {
        setTimerState(false);
    };
    const handleTimerReset = () => {
        setRemainingTime(Number(focusTime) * 60);
        // 즉시시작
        handleTimerStart();
        // 중간정차 list 초기화
        setCurrentIndex(0);
        // 중간정차 모달 초기화
        triggeredStopsRef.current.clear();
    };
    // 재생 - 일시정지 토글 버튼
    const handleTimerToggle = () => {
        if (timerState) {
            handleTimerStop();
        } else {
            handleTimerStart();
        }
    };

    // 타이머 종류 후 결과 페이지로 이동
    useEffect(() => {
        if (remainingTime !== 0) return;

        setTimerState(false);
        setElapsed(elapsed);
        setResultPercent(100);

        // 100%까지 완전히 도달하는게 보인 후 다음 페이지로 이동
        const timer = setTimeout(() => {
            navigate('/result');
        }, 500);

        return () => clearTimeout(timer);
    }, [remainingTime, elapsed, navigate, setElapsed, setResultPercent, setTimerState]);

    // 1초가 지날 때 마다 남은 시간 1초씩 감소
    useEffect(() => {
        if (!timerState || isResting) return;

        const countdown = setInterval(() => {
            setRemainingTime((prev) => Math.max(prev - 1, 0));
        }, 1000);

        return () => clearInterval(countdown);
    }, [timerState, isResting]);

    // 중간 정차 - 집중시간이 20분 마다 도달하면 중간 정차 처리
    useEffect(() => {
        if (!timerState || isResting) return;

        const currentElapsed = totalTimeSeconds - remainingTime;
        const stopUnit = Math.floor(currentElapsed / 5);
        // 집중 구간 시간 설정: 10분 설정시 10분 후 중간정차모달 열림
        const isStopTime = currentElapsed > 0 && currentElapsed % (20 * 60) === 0;
        // const isStopTime = currentElapsed > 0 && currentElapsed % 5 === 0; //테스트용
        const alreadyTriggered = triggeredStopsRef.current.has(stopUnit);

        if (isToggleOn && isStopTime && !alreadyTriggered && currentIndex < restCount) {
            triggeredStopsRef.current.add(stopUnit);

            setTimerState(false);
            setIsResting(true);
            setRestSeconds(10 * 60); // 휴식 시간 설정
            // setRestSeconds(5); // 휴식 시간 5초 설정 - 테스트용
            setModal('rest');
            setCurrentIndex((prev) => prev + 1);
        }
    }, [remainingTime, totalTimeSeconds, timerState, isResting, isToggleOn, currentIndex, restCount]);

    return (
        <div className="pomodoro">
            {/* 타이머가 보여지는 부분: Pomodoro-main */}
            <div className="pomodoro-main">
                <div className="pomodoro-wrap">
                    <div className="pomodoroMain item">
                        <div className="pomodoroMainText">
                            <p>
                                {departure} → {selectedStation?.city} · {trainLabel}
                            </p>

                            <p className="percent">{resultPercent}%</p>
                        </div>

                        <div className="pomodoroTimer">
                            <div className="pomodoroTimerText">
                                <div className="pomodoroTimes">
                                    <div className="timer-main">
                                        <div className="elapsed-timer">{formatDurationTime(elapsed)}</div>
                                        <p className="arrive">도착 {getArriveTime(focusTime)}</p>
                                    </div>

                                    <ProgressTimer
                                        totalTime={totalTimeSeconds}
                                        remainingTime={remainingTime}
                                        setResultPercent={setResultPercent}
                                        departure={departure}
                                        selectedStation={selectedStation}
                                    />

                                    <div className="remaining">
                                        <h4>남은시간</h4>
                                        <div className="remaining-time">{formatDurationTime(remainingTime)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {isToggleOn && restCount > 0 && (
                            <div className="pomodoroStation">
                                <div className="station-text" onClick={() => setShowStationList((prev) => !prev)}>
                                    <p>{isToggleOn ? `전체 여정 보기` : null}</p>
                                    <img
                                        src="src/assets/arrow.svg"
                                        className={showStationList ? 'arrow' : 'arrow-up'}
                                        alt="화살표 아이콘"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    {isToggleOn && showStationList && <StationList restCount={restCount} currentIndex={currentIndex} />}

                    <div className="button-group">
                        <button onClick={handleTimerToggle}>
                            {timerState ? (
                                <>
                                    <span className="time-icon">❚❚</span>일시정지
                                </>
                            ) : (
                                <>
                                    <span className="time-icon">▶</span>재생
                                </>
                            )}
                        </button>

                        <button onClick={handleTimerReset}>
                            <span className="time-icon">
                                <img src={resetIcon} alt="리셋 아이콘" />
                            </span>
                            다시
                        </button>
                        <button className="end" onClick={handleModalOpen}>
                            <span className="time-icon">■</span>종료
                        </button>
                    </div>
                </div>
            </div>

            <Modal />
        </div>
    );
}

// 소요시간과 progress연결
function ProgressTimer({ totalTime, remainingTime, setResultPercent, departure, selectedStation }) {
    const progress = ((totalTime - remainingTime) / totalTime) * 100;
    const percent = Math.min(Math.max(progress, 0), 100);
    const percentResult = Math.floor(percent);

    useEffect(() => {
        setResultPercent(percentResult);
    }, [percentResult, setResultPercent]);

    return (
        <div className="progress-bar">
            <div className="station-wrap">
                <div>{departure}</div>
                <div>{selectedStation?.city}</div>
            </div>
            <div className="progress-track">
                <div className="train" style={{ left: `${percent}%`, transition: 'left 1s linear' }}>
                    🚂
                </div>
            </div>
            <ProgressBar
                completed={percent}
                height="8px"
                width="100%"
                isLabelVisible={false}
                baseBgColor="#E7E7EC" // 배경색
                bgColor="#4B3FE0" // 진행바 색상
                animateOnRender={false}
                transitionDuration="1s"
                transitionTimingFunction="linear"
            />
        </div>
    );
}

// 중간 정차 목록
function StationList({ restCount, currentIndex }) {
    // 남은 높이를 계산하여 .station-list 높이로 지정 (브라우저 전체 기준)
    const containerHeight = document.querySelector('.container')?.offsetHeight ?? 0;
    const pomodoroHeight = document.querySelector('.pomodoroMain')?.offsetHeight ?? 0;

    const maxStationHeight = window.innerHeight - containerHeight - pomodoroHeight;

    return (
        <>
            {/* 정차역 갯수에 따라 list 갯수 나오도록 */}
            <div className="station-list item" style={{ maxHeight: maxStationHeight }}>
                <ul>
                    {Array.from({ length: restCount }).map((_, index) => {
                        let status;

                        if (index < currentIndex) {
                            status = '완료 · 20분';
                        } else if (index === currentIndex) {
                            status = '진행중';
                        } else {
                            status = '예정';
                        }

                        return (
                            <li
                                key={index}
                                className={
                                    index < currentIndex ? 'passed' : index === currentIndex ? 'current' : 'coming'
                                }>
                                <div className="station-title">
                                    <span></span>
                                    <h5>정차{index + 1}</h5>
                                </div>

                                <p>{status}</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}

export default TimerPage;
