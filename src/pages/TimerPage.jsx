import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '../context/TripContext.jsx';
import { stationList } from '../utils/stationList.js';
import { getArriveTime } from '../utils/time.js';
import { getTrainInfo } from '../utils/getTrainInfo.js';
import Modal from './Modal.jsx';
import ProgressBarModule from '@ramonak/react-progress-bar';
const ProgressBar = ProgressBarModule.default ?? ProgressBarModule;
// 짧은 효과음 사용을 위한 react hook
import useSound from 'use-sound';
// import './pomodoroMain.css';
// import playIcon from './img/play.png';
// import pauseIcon from './img/pause.png';
// import resetIcon from './img/reset.png';
// import focusSound from './alarm/focus.mp3';
// import breakSound from './alarm/break.mp3';

function TimerPage() {
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
        timerState,
        setTimerState,
        modal,
        setModal,
    } = useTrip();

    const { trainKey, selectedStation, travelTime, restCount, trainLabel } = getTrainInfo(train, selected, stationList);

    const [initialtimer, setinitalTimer] = useState({
        focusTime: travelTime,
        shortbreak: 5,
        // sections: 4,
    });

    const [isPaused, setIsPaused] = useState(false);

    const [currentSlide, setCurrentSlide] = useState(0);

    // 중간 정차 시간 관리
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isResting, setIsResting] = useState(false);
    const [restSeconds, setRestSeconds] = useState(20 * 60);

    const handleEndClick = () => {
        setModal('end');
    };

    return (
        <div className="pomodoro">
            <PomodoroMain
                timerValue={initialtimer}
                timerState={timerState}
                setTimerState={setTimerState}
                restCount={restCount}
                departure={departure}
                selectedStation={selectedStation}
                focusTime={focusTime}
                isToggleOn={isToggleOn}
                elapsed={elapsed}
                setElapsed={setElapsed}
                resultPercent={resultPercent}
                trainLabel={trainLabel}
                stationList={stationList}
            />

            <StationList restCount={restCount} currentIndex={currentIndex} />
            <Modal />
        </div>
    );
}

// 타이머가 보여지는 부분: PomodoroMain
function PomodoroMain({
    timerValue,
    timerState,
    setTimerState,
    restCount,
    departure,
    selectedStation,
    focusTime,
    isToggleOn,
    elapsed,
    setElapsed,
    resultPercent,
    trainLabel,
    stationList,

    isResting,
    setIsResting,
    currentIndex,
    setCurrentIndex,
    setRestSeconds,
}) {
    // 모달 열기
    const { setModal } = useTrip();
    const handleModalOpen = () => {
        setTimerState(false);
        setModal('end');
    };

    // 전체 시간 표시
    const [totalSeconds, setTotalSeconds] = useState(parseInt(timerValue.focusTime) * 60);
    const [timerReset, setTimerReset] = useState(false);
    const [pomodoroTerms, setPomodoroTerms] = useState(0);

    const timeminute = parseInt(timerValue.focusTime);

    const totalSecondsTime = parseInt(timerValue.focusTime) * 60;

    const TimerformatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    // 타이머 경과시간 표시
    const currentElapsed = totalSecondsTime - totalSeconds;
    useEffect(() => {
        setElapsed(currentElapsed);
    }, [currentElapsed, setElapsed]);

    const navigate = useNavigate();
    // // 임시 주석 - 소리재생: 타이머 시작할때 시작, 종료음을 위한 코드
    // const [soundPlay] = useSound(focusSound);
    // const [breakSoundPlay] = useSound(breakSound);

    const handleTimerStart = () => {
        setTimerReset(false);
        setTimerState(true);
    };
    const handleTimerStop = () => {
        setTimerReset(false);
        setTimerState(false);
    };

    // 종료 버튼 클릭시 결과 화면으로 이동
    const handleTimerEnd = () => {
        // 확인 창 띄우기
        const result = confirm('여행을 종료할까요?');

        if (result) {
            navigate('/result');
        } else {
            return;
        }
    };

    // 재생 - 일시정지 토글 버튼
    const handleTimerToggle = () => {
        if (timerState) {
            handleTimerStop();
        } else {
            handleTimerStart();
        }
    };
    const handleTimerReset = () => {
        setTotalSeconds(parseInt(timerValue.focusTime) * 60);
        setTimerState(false);
    };
    const handleTimerSet = (minutes) => {
        setTotalSeconds(parseInt(minutes) * 60);
    };

    // 페이지가 로드 될 때 타이머 바로 start 실행
    useEffect(() => {
        handleTimerStart();
    }, []);

    // useEffect(() => {
    //     if (!timerState) return;

    //     const countdown = setInterval(() => {
    //         // [1] 타이머 리셋 될 때
    //         setTotalSeconds((prev) => {
    //             if (prev <= 1) {
    //                 clearInterval(countdown);
    //             }

    //             return prev - 1;
    //         });
    //     }, 1000);

    //     return () => clearInterval(countdown);
    // }, [timerState, timerValue]);

    // 타이머 종류 후 결과 페이지로 이동
    useEffect(() => {
        if (totalSeconds === 0) {
            setTimerState(false);
            // 100%까지 완전히 도달하는게 보인 후 다음 페이지로 이동 되도록.
            setTimeout(() => {
                navigate('/result');
            }, 1000);
        }
    }, [totalSeconds, navigate, setTimerState]);

    useEffect(() => {
        if (!timerState || isResting) return;

        const countdown = setInterval(() => {
            setTotalSeconds((prev) => {
                const next = prev - 1;

                // 20분마다 정차
                const elapsed = totalSecondsTime - next;
                // ======================
                // 집중 시간(테스트용)
                const totalTime = 5;
                // ======================
                const isStopTime = elapsed > 0 && elapsed % (20 * 60) === 0;

                if (isToggleOn && isStopTime && currentIndex < restCount) {
                    setTimerState(false);
                    setIsResting(true);
                    setRestSeconds(20 * 60);
                }

                return next;
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, [timerState, isResting, currentIndex, restCount, totalSecondsTime]);

    return (
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
                            <div className="elapsed-timer">{TimerformatTime(elapsed)}</div>
                            <p className="arrive">도착 {getArriveTime(focusTime)}</p>
                        </div>

                        <ProgressTimer
                            totalTime={parseInt(timerValue.focusTime) * 60}
                            remainingTime={totalSeconds}
                            departure={departure}
                            selectedStation={selectedStation}
                        />

                        <div className="remaining">
                            <h4>남은시간</h4>
                            <div className="remaining-time">
                                {TimerformatTime(totalSeconds)}
                                {/* {hours < 10 ? `0${hours}` : hours}:{minutes < 10 ? `0${minutes}` : minutes}:
                            {seconds < 10 ? `0${seconds}` : seconds} */}
                            </div>
                        </div>
                    </div>

                    <div className="pomodoroStation">{isToggleOn ? `정차역${restCount}개` : null}</div>
                </div>
            </div>

            <div className="button-group">
                {/* 임시 주석 - 타이머 시작, 멈춤, 리셋 이미지
                                <img src={playIcon} alt="play" width={20} height={20} onClick={handleTimerStart}></img>
                                <img src={pauseIcon} width={20} height={20} onClick={handleTimerStop}></img>
                                <img src={resetIcon} width={20} height={20} onClick={handleTimerReset}></img> */}
                <button onClick={handleTimerToggle}>{timerState ? '❚❚일시정지' : '▶재생'}</button>
                <button onClick={handleTimerReset}>⭮다시 </button>
                <button className="end" onClick={handleModalOpen}>
                    ■종료
                </button>
            </div>
        </div>
    );
}

// 소요시간과 progress연결
function ProgressTimer({ totalTime, remainingTime, departure, selectedStation }) {
    const { setResultPercent } = useTrip();

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
                    {/* <img src={trainImage} alt="train" /> */}
                </div>
            </div>
            <ProgressBar
                completed={percent}
                height="8px"
                width="100%"
                isLabelVisible={false}
                animateOnRender={false}
                transitionDuration="1s"
                transitionTimingFunction="linear"
            />
        </div>
    );
}

function StationList({ restCount, currentIndex }) {
    return (
        //정차역 갯수에 따라 list 갯수 나오도록
        <div className="station-list">
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
                        <li key={index}>
                            <span></span>
                            <div>정차{index + 1}</div>

                            <div
                                className={
                                    index < currentIndex ? 'passed' : index === currentIndex ? 'current' : 'coming'
                                }>
                                {status}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default TimerPage;
