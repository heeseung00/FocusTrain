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
    const hour = Math.floor(seconds / 60);
    const minute = Math.floor(seconds / 60);
    const second = seconds % 60;

    if ((hour === 0, minute === 0)) {
        return `${second}초`;
    }

    return `${formatTime(minute)} ${second}초`;
}

export function getArriveTime(minutes) {
    // 시간 계산 - 출발지 시간 + 소요시간 = 도착지 시간
    const today = new Date();

    const total = today.getHours() * 60 + today.getMinutes() + minutes;

    const hours = String(Math.floor(total / 60) % 24).padStart(2, '0');
    const min = String(total % 60).padStart(2, '0');

    return `${hours}:${min}`;
}
