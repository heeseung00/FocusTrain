import { create } from 'zustand';

// 좌석 선택에 사용
// 세로 한줄 최대 갯수 5개(row <= 5).
const createCoachSeats = () => {
    const rows = {};

    for (let row = 0; row <= 5; row++) {
        rows[row] = { LeftSeat1: null, LeftSeat2: null, RightSeat1: null, RightSeat2: null };
    }
    return rows;
};

// 호차 만들기
const createSeats = () => {
    return Object.fromEntries(Array.from({ length: 5 }, (_, index) => [index + 1, createCoachSeats()]));
};

const useTripStore = create((set) => ({
    // 기차 종류 선택
    train: 'KTX',
    setTrain: (train) => set({ train }),

    // 역(도착지) 선택
    selected: '선택',
    setSelected: (selected) => set({ selected }),

    // 토글 버튼
    isToggleOn: true,
    setIsToggleOn: (isToggleOn) => set({ isToggleOn }),

    // 출발지 기본값 입력
    departure: '서울',
    setDeparture: (departure) => set({ departure }),

    // 휴식시간 조절 (중간 정차역)
    focusTime: 0,
    setFocusTime: (focusTime) => set({ focusTime }),

    // 좌석 선택
    seats: createSeats(),
    setSeats: (seats) => set({ seats }),

    // 현재 선택된 호차
    activeCoach: 1,
    setActiveCoach: (activeCoach) => set({ activeCoach }),

    // 현재 선택된 좌석
    selectedSeat: false,
    setSelectedSeat: (selectedSeat) => set({ selectedSeat }),

    // 모달
    modal: false,
    setModal: (modal) => set({ modal }),

    resetTripInfo: () =>
        set({
            train: 'KTX',
            selected: '선택',
            isToggleOn: true,
            departure: '서울',
            focusTime: 0,
            seats: createSeats(),
            activeCoach: 1,
            selectedSeat: false,
            modal: false,
        }),
}));

export default useTripStore;
