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

    // const [isPaused, setIsPaused] = useState(false);
    const [timerState, setTimerState] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);

    return (
        <section id="center">
            <div className="pomodoroMainText">
                <h1>FOCUS TRIP</h1>
                <ProgressTimer
                    travelTime={travelTime}
                    isPaused={!timerState}
                    resetTrigger={currentSlide}
                    onComplete={() => {
                        if (swiperRef.current && swiperRef.current.activeIndex < reviews.length - 1) {
                            // 5초 카운트 완료 후 다음 슬라이드 이동
                            swiperRef.current.slideNext();
                        } else {
                            // 마지막 슬라이드
                            navigate(-1);
                        }
                    }}
                />
            </div>
            <div className="pomodoroTimerSet">
                <p>Timer Set</p>
            </div>
            <div className="pomodoroTimerSetList">
                <PomodoroTimerSettings initialtimer={initialtimer} setinitalTimer={setinitalTimer} />
            </div>
            <PomodoroMain timerValue={initialtimer} timerState={timerState} setTimerState={setTimerState} />
        </section>
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

    // 타이머가 보여지는 부분: PomodoroMain
    function PomodoroMain({ timerValue, timerState, setTimerState }) {
        const [totalSeconds, setTotalSeconds] = useState(parseInt(timerValue.focusetime) * 60);
        // const [hours, sethours] = useState(parseInt(timerValue.focusetime));
        // const [minutes, setMinutes] = useState(parseInt(timerValue.focusetime));
        // const [seconds, setSeconds] = useState(parseInt(0));
        // const [timerState, setTimerState] = useState(false);
        const [timerReset, setTimerReset] = useState(false);
        const [timerList, setTimerList] = useState('focus');
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
        const handleTimerReset = () => {
            setTotalSeconds(parseInt(timerValue.focusetime) * 60);
            // setTimerReset(true);
            setTimerList('focus');
            setTimerState(false);
        };
        const handleTimerSet = (minutes) => {
            setTotalSeconds(parseInt(minutes) * 60);
            // setMinutes(parseInt(minutes));
            // setSeconds(parseInt(seconds));
        };
        const handleTimerList = (minutes, timerlist) => {
            handleTimerSet(minutes);
            handleTimerStop();
            setTimerList(timerlist);
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

                        // 타이머 종료 처리
                        if (timerList === 'focus') {
                            if (pomodoroTerms < timerValue.sections) {
                                setPomodoroTerms((prev) => prev + 1);

                                setTermArray((prev) => {
                                    const newArray = [...prev];
                                    newArray[pomodoroTerms] = '●';
                                    return newArray;
                                });
                            }

                            setTimerList('short');
                            return parseInt(timerValue.shortbreak) * 60;
                        } else {
                            setTimerList('focus');
                            return parseInt(timerValue.focusetime) * 60;
                        }
                    }

                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(countdown);
        }, [timerState, timerList, timerValue, pomodoroTerms]);

        //         if (timerReset) {
        //             clearInterval(countdown);
        //             handleTimerSet(timerValue.focusetime, 0);
        //         }
        //         // [1] 타이머 start, stop을 눌렀을 때
        //         else {
        //             // [2] [타이머 start를 눌렀을 때
        //             if (timerState) {
        //                 // [else문 없음] 타이머 초가 0보다 클 때 -1 해서 내려줌
        //                 if (parseInt(seconds) > 0) {
        //                     setSeconds(parseInt(seconds) - 1);
        //                 }
        //                 // [else문 없음] 타이머 초가 0일 때 (시작값: 0)
        //                 if (parseInt(seconds) === 0) {
        //                     // [3] 타이머 분도 0일 때 (타이머 끝난 시점)
        //                     if (parseInt(minutes) === 0) {
        //                         // [4] 타이머 끝난 시점이 집중시간일 때
        //                         if (timerList == 'focus') {
        //                             // // 임시 주석 - 타이머 끝났으니 집중시간이 끝났다는 집중알림 재생
        //                             // soundPlay();
        //                             //타이머 반복 term 하나 채워주기. 설정해둔 term과 비교
        //                             if (pomodoroTerms < timerValue.sections) {
        //                                 setPomodoroTerms(pomodoroTerms + 1);
        //                                 termArray[pomodoroTerms] = '●';
        //                                 setTermArray(termArray);
        //                             }
        //                             //집중시간이 끝났으므로 휴식시간으로 타이머 셋팅 초기화하기. 휴식시간으로 시점 바꿔주기
        //                             handleTimerList(parseInt(timerValue.shortbreak), 'short');
        //                         }
        //                         // [4] 타이머 끝난 시점이 휴식시간일 때
        //                         else {
        //                             // //임시 주석 - 타이머 끝났으니 휴식시간이 끝났다는 휴식알림 재생
        //                             // breakSoundPlay();
        //                             //휴식시간이 끝났으므로 집중시간으로 타이머 셋팅 초기화. 집중시간으로 시점 바꿔주기
        //                             handleTimerList(parseInt(timerValue.focusetime), 'focus');
        //                         }
        //                     }
        //                     // [3] 타이머 분이 0이 아닐 때 (타이머 동작 시작 시점, 분을 -1 하고, 59초로 셋팅)
        //                     else {
        //                         handleTimerSet(parseInt(minutes) - 1, 59);
        //                     }
        //                 }
        //             }
        //             // [2] 타이머 stop을 눌렀을 때
        //             else {
        //                 clearInterval(countdown);
        //             }
        //         }
        //     }, 1000);
        //     //각각 조건문을 모두 빠져나왔을 때 타이머를 종료시킴
        //     return () => clearInterval(countdown);
        // }, [minutes, seconds, timerState, timerReset, timerValue]);

        return (
            <div className="pomodoroMain">
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
                                <button onClick={handleTimerStart}>▶재생 </button>
                                <button onClick={handleTimerStop}>❚❚정지 </button>
                                <button onClick={handleTimerReset}>⭮다시 </button>
                                {/* <button onClick={handleTimerReset}>종료</button> */}
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

    // 전체시간을 100% 라고 할 때 전체 소요시간에서 남은 시간을 계산하고
    // 그걸 현재 progress 기차 위치로 지정한다.
    function ProgressTimer({ travelTime, isPaused }) {
        const [progress, setProgress] = useState(0);

        const startTimeRef = useRef(null);
        const elapsedRef = useRef(0);

        useEffect(() => {
            if (isPaused) return;

            const totalTime = travelTime * 60 * 1000;
            if (!totalTime) return;

            if (startTimeRef.current === null) {
                startTimeRef.current = Date.now();
            }

            const updateProgress = () => {
                const currentTime = Date.now();

                const elapsed = elapsedRef.current + (currentTime - startTimeRef.current);
                const percent = Math.min((elapsed / totalTime) * 100, 100);

                setProgress(percent);

                if (percent >= 100) {
                    return;
                }
            };

            updateProgress();

            const timer = setInterval(updateProgress, 1000);

            return () => {
                elapsedRef.current += Date.now() - startTimeRef.current;

                // startTimeRef.current = null;

                clearInterval(timer);
            };
        }, [travelTime, isPaused]);

        return (
            <ProgressBar
                completed={progress}
                height="8px"
                width="100%"
                isLabelVisible={false}
                animateOnRender={false}
            />
        );
    }
}

export default TimerPage;
