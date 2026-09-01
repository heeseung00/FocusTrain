import { Children, createContext, useContext, useState } from 'react';

const TripContext = createContext();

export function TripProvider({ children }) {
    //  ---- 선택 상태 ----
    const [train, setTrain] = useState('KTX');
    // 역(도착지) 선택
    const [selected, setSelected] = useState('선택');
    // 토글 버튼
    const [isToggleOn, setIsToggleOn] = useState(true);
    // 휴식시간 조절할 수 있게 (중간 정차역)
    const [focusTime, setFocusTime] = useState(0);

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
            }}>
            {children}
        </TripContext.Provider>
    );
}

export function useTrip() {
    return useContext(TripContext);
}
