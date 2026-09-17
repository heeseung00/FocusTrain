import { createContext, useContext, useState } from 'react';

const TimerContext = createContext();

export function TimerProvider({ children }) {
    // ---- 시간 계산 ----
    // 타이머 경과시간 표시
    const [elapsed, setElapsed] = useState(0);
    // 타이머 퍼센트
    const [resultPercent, setResultPercent] = useState(0);
    // 타이머가 지금 움직이는지 상태 확인 - 타이머 페이지 진입시 바로 시작하기 위해 true로 설정
    const [timerState, setTimerState] = useState(true);

    // 휴식시간 카운트 관리
    const [isResting, setIsResting] = useState(false);
    // const [restSeconds, setRestSeconds] = useState(20 * 60);
    const [restSeconds, setRestSeconds] = useState(5);

    // 공통 context 초기화
    const resetTimer = () => {
        setElapsed(0);
        setResultPercent(0);
        setTimerState(true);
        // setRestSeconds(20 * 60);
        setRestSeconds(5);
        setIsResting(false);
    };

    return (
        <TimerContext.Provider
            value={{
                elapsed,
                setElapsed,
                resultPercent,
                setResultPercent,
                timerState,
                setTimerState,
                isResting,
                setIsResting,
                restSeconds,
                setRestSeconds,

                // 공통 context 초기화
                resetTimer,
            }}>
            {children}
        </TimerContext.Provider>
    );
}

export function useTimer() {
    return useContext(TimerContext);
}
