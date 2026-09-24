// 시간을 분 단위로 출력(소요시간)
export function formatTime(time, restCount = 0, restSeconds = 0, restOff = 0) {
    const totalRestSeconds = restCount * restSeconds;
    const usedRestSeconds = Math.max(0, totalRestSeconds - restOff);

    const restMinutes = Math.floor(usedRestSeconds / 60);
    const totalTime = Number(time) + restMinutes;

    const hour = Math.floor(totalTime / 60);
    const minute = totalTime % 60;

    if (hour === 0) {
        return `${minute}분`;
    }

    if (minute === 0) {
        return `${hour}시간`;
    }

    return `${hour}시간 ${minute}분`;
}

// 결과 페이지 출력
// 시간을 초 단위로 출력
export function formatElapsedTime(seconds) {
    const hour = Math.floor(seconds / 3600);
    const minute = Math.floor((seconds % 3600) / 60);
    const second = seconds % 60;

    if (hour === 0 && minute === 0) {
        return `${second}초`;
    }

    if (hour === 0 && second === 0) {
        return `${minute}분`;
    }

    if (minute === 0 && second === 0) {
        return `${hour}시간`;
    }

    if (hour === 0) {
        return `${minute}분 ${second}초`;
    }

    if (minute === 0) {
        return `${hour}시간 ${second}초`;
    }

    return `${hour}시간 ${minute}분 ${second}초`;
}

// 중간정차 시간 출력
// 00:00:00 단위로 시간 출력
export function formatDurationTime(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// 전체 소요시간 계산(분)
export function getTotalTime(focusTime, restCount, restSeconds, isToggleOn, restOff = 0) {
    if (!isToggleOn) {
        return Number(focusTime);
    }

    const totalRestSeconds = restCount * restSeconds;
    const usedRestSeconds = Math.max(0, totalRestSeconds - restOff);

    const restMinutes = Math.floor(usedRestSeconds / 60);

    return Number(focusTime) + restMinutes;
}

// 전체 소요시간 계산(초) - 타이머용
export function getTotalTimeSeconds(focusTime, restCount, restSeconds, isToggleOn, restOff = 0) {
    if (!isToggleOn) {
        return Number(focusTime) * 60;
    }

    const totalRestSeconds = restCount * restSeconds;
    const usedRestSeconds = Math.max(0, totalRestSeconds - restOff);

    return Number(focusTime) * 60 + usedRestSeconds;
}

// 현재 시간 기준 도착 시간 계산
export function getArriveTime(totalTime) {
    const today = new Date();

    // 전체 시간 - 출발지 시간 + (소요시간 + 휴식시간) = 도착지 시간
    const total = today.getHours() * 60 + today.getMinutes() + Number(totalTime);

    const hours = String(Math.floor(total / 60) % 24).padStart(2, '0');
    const min = String(total % 60).padStart(2, '0');

    return `${hours}:${min}`;
}
