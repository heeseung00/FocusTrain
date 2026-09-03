// 이동시간의 숫자를 시간-분 형태로 출력
export function formatTime(minutes) {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;

    if (hour === 0) {
        return `${minute}분`;
    }

    if (minute === 0) {
        return `${hour}시간`;
    }

    return `${hour}시간 ${minute}분`;
}

export function getArriveTime(minutes) {
    // 시간 계산 - 출발지 시간 + 소요시간 = 도착지 시간
    const today = new Date();

    const total = today.getHours() * 60 + today.getMinutes() + minutes;

    const hours = String(Math.floor(total / 60) % 24).padStart(2, '0');
    const min = String(total % 60).padStart(2, '0');

    return `${hours}:${min}`;
}
