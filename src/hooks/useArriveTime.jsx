import useTimerStore from '../stores/useTimerStore.js';
import useTripStore from '../stores/useTripStore.js';
import { getTrainInfo } from '../utils/getTrainInfo.js';
import { getArriveTime } from '../utils/time.js';
import { stationList } from '../utils/stationList.js';

const useArriveTime = () => {
    const { train, selected, focusTime } = useTripStore();
    const { restSeconds } = useTimerStore();
    const { restCount } = getTrainInfo(train, selected, stationList);

    // getArriveTime에 props내리기
    return getArriveTime(restCount, focusTime, restSeconds);
};

export default useArriveTime;
