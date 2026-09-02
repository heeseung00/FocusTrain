import { Children, createContext, useContext, useState } from 'react';
import { stationList } from '../utils/stationList.js';

const TripContext = createContext(null);

export function TripProvider({ children }) {
    //  ---- 선택 상태 (역 선택)----
    const [train, setTrain] = useState('KTX');
    // 역(도착지) 선택
    const [selected, setSelected] = useState('선택');
    // 토글 버튼
    const [isToggleOn, setIsToggleOn] = useState(true);
    // 휴식시간 조절할 수 있게 (중간 정차역)
    const [focusTime, setFocusTime] = useState(0);

    const [departure, setDeparture] = useState('서울');

    // ---- 좌석 선택 ----
    // 세로 한줄 최대 갯수 5개(row <= 5).
    const createCoachSeats = () => {
        const rows = {};

        for (let row = 0; row <= 5; row++) {
            rows[row] = { LeftSeat1: null, LeftSeat2: null, RightSeat1: null, RightSeat2: null };
        }
        return rows;
    };
    // 호차별 좌석 데이터
    const [seats, setSeats] = useState({
        1: createCoachSeats(),
        2: createCoachSeats(),
        3: createCoachSeats(),
        4: createCoachSeats(),
        5: createCoachSeats(),
    });
    // 현재 선택된 호차
    const [activeCoach, setActiveCoach] = useState(1);
    // 현재 선택된 좌석
    const [selectedSeat, setSelectedSeat] = useState(null);

    // 타이머 경과시간 표시
    const [elapsed, setElapsed] = useState(0);

    // 타이머 퍼센트
    const [resultPercent, setResultPercent] = useState(0);

    // 공통 context 초기화
    const resetTrip = () => {
        setTrain('KTX');
        setSelected('선택');
        setIsToggleOn(true);
        setFocusTime(0);

        setDeparture('서울');
        setSeats({
            1: createCoachSeats(),
            2: createCoachSeats(),
            3: createCoachSeats(),
            4: createCoachSeats(),
            5: createCoachSeats(),
        });
        setActiveCoach(1);
        setSelectedSeat(null);
        setElapsed(0);
        setResultPercent(0);

        console.log('reset 실행 - activeCoach = 1');
    };

    return (
        <TripContext.Provider
            value={{
                train,
                setTrain,
                selected,
                setSelected,
                isToggleOn,
                setIsToggleOn,
                focusTime,
                setFocusTime,
                departure,
                setDeparture,
                seats,
                setSeats,
                activeCoach,
                setActiveCoach,
                selectedSeat,
                setSelectedSeat,
                elapsed,
                setElapsed,
                resultPercent,
                setResultPercent,

                // 공통 context 초기화
                resetTrip,
            }}>
            {children}
        </TripContext.Provider>
    );
}

export function useTrip() {
    return useContext(TripContext);
}
