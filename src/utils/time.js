// 시간을 분 단위로 출력
export function formatTime(time) {
    const hour = Math.floor(time / 60);
    const minute = time % 60;

    if (hour === 0) {
        return `${minute}분`;
    }

    if (minute === 0) {
        return `${hour}시간`;
    }

    return `${hour}시간 ${minute}분`;
}

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

// 00:00:00 단위로 시간 출력
export function formatDurationTime(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// 현재 시간 기준 도착 시간 계산
export function getArriveTime(restCount, focusTime, restSeconds) {
    const today = new Date();

    const restMinutes = Math.floor((restCount * restSeconds) / 60);

    // 전체 시간 - 출발지 시간 + (소요시간 + 휴식시간) = 도착지 시간
    const total = today.getHours() * 60 + today.getMinutes() + focusTime + restMinutes;

    const hours = String(Math.floor(total / 60) % 24).padStart(2, '0');
    const min = String(total % 60).padStart(2, '0');

    return `${hours}:${min}`;
}
