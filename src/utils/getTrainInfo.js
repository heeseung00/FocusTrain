import { stationList } from '../utils/stationList.js';
import { useTrip } from '../context/TripContext.jsx';

// 공통 사용
export function getTrainInfo() {
    const { train, selected, focusTime } = useTrip();

    // 열차 종류에 맞는 데이터 키 변환
    const trainKey = train === '무궁화' ? 'mugunghwa' : train.toLowerCase();
    // 역이 선택되었을 때 조건 걸기
    const selectedStation = stationList.find((item) => item.city === selected);
    // 선택한 역의 이동시간
    const travelTime = selectedStation ? selectedStation.times[trainKey] : 0;
    // 이동시간에 따른 휴식 횟수 (중간 정차역)
    const restCount = focusTime > 20 ? Math.floor((focusTime - 1) / 20) : 0;

    // 열차 종류에 따라 기차 이름 다르게
    const trainLabelS = {
        KTX: 'KTX 001',
        ITX: 'ITX-새마을',
        무궁화: '무궁화호 1151',
    };

    const trainLabel = trainLabelS[train];

    return {
        trainKey,
        selectedStation,
        travelTime,
        restCount,
        trainLabel,
    };
}
