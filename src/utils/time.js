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
