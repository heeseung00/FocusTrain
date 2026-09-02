import React, { useEffect, useState, useRef } from 'react';
import { useTrip } from '../context/TripContext.jsx';
import { stationList } from '../utils/stationList.js';
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

// 참고: https:coding-god-life.tistory.com/129

// ┌─────────────────────────────────────┐
// │                                     │
// │             FOCUS TRIP              │
// │                                     │
// │                                     │
// │                24:37                │
// │               집중 중               │
// │                                     │
// │        ━━━━━━━━━━━━━━━━━             │
// │                 62%                 │
// │                                     │
// │                                     │
// │      🚉 대전              대구 🚉    │
// │       ●━━━━━━━━🚂━━━━━━━━●          │
// │                                     │
// │              다음 정차역             │
// │                 대구역              │
// │                                     │
// │             정차까지 12:34           │
// │                                     │
// │                                     │
// │        [ Ⅱ 멈춤 ]   [ ■ 종료 ]      │
// │                                     │
// │                                     │
// │             정차역 14개 ˅            │
// │                                     │
// └─────────────────────────────────────┘

// ┌──────────────────────────┐
// │                          │
// │      여행을 종료할까요?   │
// │                          │
// │      현재 집중 시간       │
// │         24분 37초         │
// │                          │
// │   [ 계속하기 ] [ 종료 ]   │
// │                          │
// └──────────────────────────┘

function TimerPage() {
    // ---- 선택 상태 ----
    const {
        train,
        setTrain,
        selected,
        setSelected,
        isToggleOn,
        setIsToggleOn,
        focusTime,
        setFocusTime,
        departure,
        seats,
        setActiveCoach,
        setSelectedSeat,
    } = useTrip();

    const trainKey = train === '무궁화' ? 'mugunghwa' : train.toLowerCase();
    const selectedStation = stationList.find((item) => item.city === selected);
    const travelTime = selectedStation ? selectedStation.times[trainKey] : 0;
    // 이동시간에 따른 휴식 횟수 (중간 정차역)
    const restCount = travelTime >= 20 ? Math.floor(travelTime / 20) : 0;

    const [initialtimer, setinitalTimer] = useState({
        focusetime: travelTime,
        shortbreak: 5,
        sections: 4,
    });

    const [isPaused, setIsPaused] = useState(false);
    // 타이머가 지금 움직이는지 상태 확인
    const [timerState, setTimerState] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    return (
        <>
            <div className="pomodoroMainText">
                <h1>FOCUS TRIP</h1>
                <>
                    {/*
                // progress바 기존 위치 -  ProgressTimer안으로 위치변경
                <ProgressTimer
                    totalTime={timerValue.focusetime * 60}
                    remainingTime={totalSeconds}
                    // onComplete={() => {
                    //     if (swiperRef.current && swiperRef.current.activeIndex < reviews.length - 1) {
                    //         // 5초 카운트 완료 후 다음 슬라이드 이동
                    //         swiperRef.current.slideNext();
                    //     } else {
                    //         // 마지막 슬라이드
                    //         navigate(-1);
                    //     }
                    // }}
                /> */}
                </>
            </div>
            <div className="pomodoroTimerSet">
                <p>Timer Set</p>
            </div>
            <div className="pomodoroTimerSetList">
                <PomodoroTimerSettings initialtimer={initialtimer} setinitalTimer={setinitalTimer} />
            </div>
            <PomodoroMain
                timerValue={initialtimer}
                timerState={timerState}
                setTimerState={setTimerState}
                restCount={restCount}
                departure={departure}
                selectedStation={selectedStation}
            />
        </>
    );

    // 타이머 세팅: PomodoroTimerSettings
    function PomodoroTimerSettings({ initialtimer, setinitalTimer }) {
        const [focuseTimer, setFocuseTimer] = useState(initialtimer.focusetime);
        const [shortBreak, setShortBreak] = useState(initialtimer.shortbreak);
        const [sectionsTerms, setSectionsTerms] = useState(initialtimer.sections);

        const handleTimerSave = () => {
            setinitalTimer({
                focusetime: Number(focuseTimer),
                shortbreak: Number(shortBreak),
                sections: Number(sectionsTerms),
            });
        };
        return (
            <div className="setting">
                <div className="TimerSetting">
                    <p>focus time</p>
                    <select name="focusetimer" className="selectlist" onChange={(e) => setFocuseTimer(e.target.value)}>
                        <option value={20}>20 min</option>
                        <option value={25}>25 min</option>
                        <option value={30}>30 min</option>
                    </select>
                </div>
                <div className="TimerSetting">
                    <p>break time</p>
                    <select name="shortbreak" className="selectlist" onChange={(e) => setShortBreak(e.target.value)}>
                        <option value={5}>5 min</option>
                        <option value={10}>10 min</option>
                        <option value={15}>15 min</option>
                    </select>
                </div>
                <div className="TimerSetting">
                    <p>term</p>
                    <select
                        name="sections"
                        className="selectlist"
                        defaultValue={4}
                        onChange={(e) => setSectionsTerms(e.target.value)}>
                        <option value={3}>3 term</option>
                        <option value={4}>4 term</option>
                        <option value={5}>5 term</option>
                        <option value={6}>6 term</option>
                    </select>
                </div>
                <button className="saveButton" onClick={handleTimerSave}>
                    save
                </button>
            </div>
        );
    }
}

// 타이머가 보여지는 부분: PomodoroMain
function PomodoroMain({ timerValue, timerState, setTimerState, restCount, departure, selectedStation }) {
    const [totalSeconds, setTotalSeconds] = useState(parseInt(timerValue.focusetime) * 60);
    const [timerReset, setTimerReset] = useState(false);
    const [pomodoroTerms, setPomodoroTerms] = useState(0);
    const timeminute = parseInt(timerValue.focusetime);
    const [termArray, setTermArray] = useState(new Array(timerValue.sections).fill('○'));

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

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

    // 재생 - 일시정지 토글
    const handleTimerToggle = () => {
        if (timerState) {
            handleTimerStop();
        } else {
            handleTimerStart();
        }
    };
    const handleTimerReset = () => {
        setTotalSeconds(parseInt(timerValue.focusetime) * 60);
        setTimerState(false);
    };
    const handleTimerSet = (minutes) => {
        setTotalSeconds(parseInt(minutes) * 60);
    };

    // 페이지가 로드 될 때 타이머 바로 start 실행
    useEffect(() => {
        handleTimerStart();
    }, []);

    useEffect(() => {
        setTotalSeconds(parseInt(timerValue.focusetime) * 60);
        setTermArray(new Array(timerValue.sections).fill('○'));
    }, [timerValue]);

    useEffect(() => {
        if (!timerState) return;

        const countdown = setInterval(() => {
            // [1] 타이머 리셋 될 때
            setTotalSeconds((prev) => {
                if (prev <= 1) {
                    clearInterval(countdown);
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, [timerState, timerValue, pomodoroTerms]);

    return (
        <div className="pomodoroMain">
            <ProgressTimer
                totalTime={parseInt(timerValue.focusetime) * 60}
                remainingTime={totalSeconds}
                departure={departure}
                selectedStation={selectedStation}
            />

            <div className="pomodoroTimer">
                <div className="pomodoroTimerText">
                    <div className="pomodoroTimes">
                        <p>
                            {hours < 10 ? `0${hours}` : hours}:{minutes < 10 ? `0${minutes}` : minutes}:
                            {seconds < 10 ? `0${seconds}` : seconds}
                        </p>
                        <div>
                            {/* 임시 주석 - 타이머 시작, 멈춤, 리셋 이미지
                                <img src={playIcon} alt="play" width={20} height={20} onClick={handleTimerStart}></img>
                                <img src={pauseIcon} width={20} height={20} onClick={handleTimerStop}></img>
                                <img src={resetIcon} width={20} height={20} onClick={handleTimerReset}></img> */}
                            <button onClick={handleTimerToggle}>{timerState ? '❚❚일시정지' : '▶재생'}</button>
                            <button onClick={handleTimerReset}>⭮다시 </button>
                        </div>
                    </div>
                    <div className="pomodoroStation">정차역{restCount}개</div>
                </div>
            </div>
            <div className="termList">
                {termArray.map((term, index) => (
                    <span key={index}>{term}</span>
                ))}
            </div>
        </div>
    );
}

// 소요시간과 progress연결
function ProgressTimer({ totalTime, remainingTime, departure, selectedStation }) {
    const progress = ((totalTime - remainingTime) / totalTime) * 100;
    const percent = Math.min(Math.max(progress, 0), 100);
    const percentResult = Math.floor(percent);

    return (
        <div className="progress-bar">
            <div>{departure}</div>
            <ProgressBar
                completed={Math.min(progress, 100)}
                height="8px"
                width="100%"
                isLabelVisible={false}
                animateOnRender={false}
            />
            <div className="percent">{percentResult}%</div>
            <div>{selectedStation?.city}</div>
        </div>
    );
}

export default TimerPage;
