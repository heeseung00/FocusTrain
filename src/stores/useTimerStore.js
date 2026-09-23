import { create } from 'zustand';

const useTimerStore = create((set) => ({
    // 타이머 경과시간 표시
    elapsed: 0,
    setElapsed: (elapsed) => set({ elapsed }),

    // 타이머 퍼센트
    resultPercent: 0,
    setResultPercent: (resultPercent) => set({ resultPercent }),

    // 타이머가 지금 움직이는지 상태 확인 - 타이머 페이지 진입시 바로 시작하기 위해 true로 설정
    timerState: true,
    setTimerState: (timerState) => set({ timerState }),

    // 휴식시간 카운트 관리
    isResting: false,
    setIsResting: (isResting) => set({ isResting }),

    // 휴식시간 설정 (중간 정차역)
    restSeconds: 10 * 60,
    setRestSeconds: (restSeconds) => set({ restSeconds }),

    // 정차 1회 당 총 휴식시간
    restTime: 10 * 60,
    setRestTime: (restTime) => set({ restTime }),

    resetTimer: () => set({ elapsed: 0, resultPercent: 0, timerState: true, isResting: false, restSeconds: 10 * 60 }),
}));

export default useTimerStore;
