import { useState } from 'react';
import { stationList } from '../utils/stationList.js';

// 열차, 출발역, 도착역, 시간 선택
function RoutePage() {
    const [train, setTrain] = useState('KTX');
    // 역(도착지) 선택
    const [selected, setSelected] = useState('선택');

    const handleSelect = (e) => {
        setSelected(e.target.value);
    };

    const handleTrainChange = (trainType) => {
        setTrain(trainType);
        setSelected('선택');
    };

    // 선택한 역에 따라 '출발, 도착 선택' 조건부 랜더링
    const filterStation = stationList.filter((item) => {
        if (train === 'KTX') {
            return item.times.ktx !== null;
        }
        if (train === 'ITX') {
            return item.times.itx !== null;
        }
        if (train === '무궁화') {
            return item.times.mugunghwa !== null;
        }
    });

    const selectedStation = filterStation.find((item) => item.city === selected);
    const trainKey = train === '무궁화' ? 'mugunghwa' : train.toLowerCase();

    // 오늘 날짜 출력
    const today = new Date();

    return (
        <section id="center">
            <form onSubmit={(e) => e.preventDefault()}>
                <>
                    <div>
                        <h1>focus train</h1>
                    </div>

                    {/* 기차 종류 선택 */}
                    <div>
                        <ul>
                            <li>
                                <button
                                    type="button"
                                    className="counter"
                                    role="radio"
                                    aria-checked={train === 'KTX'}
                                    onClick={() => handleTrainChange('KTX')}>
                                    KTX
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    className="counter"
                                    role="radio"
                                    aria-checked={train === 'ITX'}
                                    onClick={() => handleTrainChange('ITX')}>
                                    ITX
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    className="counter"
                                    role="radio"
                                    aria-checked={train === '무궁화'}
                                    onClick={() => handleTrainChange('무궁화')}>
                                    무궁화
                                </button>
                            </li>
                        </ul>
                    </div>

                    <hr></hr>

                    {/* 출발, 도착 선택 */}
                    <div>
                        <div>
                            <h4>출발</h4>
                            <select disabled>
                                <option value="서울" selected>
                                    서울
                                </option>
                            </select>
                        </div>
                        <button type="button">⇔</button>
                        <div>
                            <h4>도착</h4>
                            <select onChange={handleSelect} value={selected}>
                                <option value="선택" disabled>
                                    선택
                                </option>
                                {filterStation.map((item) => {
                                    return (
                                        <option value={item.city} key={item.id}>
                                            {item.city}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>

                    <hr></hr>

                    {/* 도착지까지 정보 표시 */}
                    <div>
                        <div>
                            <h4>날짜</h4>
                            <div>{today.toLocaleDateString()}</div>
                        </div>
                        <div>
                            <h4>소요시간</h4>
                            {/* 선택된 역이 있으면 매핑된 시간값 바로 출력 */}
                            <div>{selectedStation ? selectedStation.times[trainKey] : ''}</div>
                        </div>
                        <div>
                            <h4>거리</h4>
                            {/* 선택된 역이 있으면 거리 바로 출력 */}
                            <div>{selectedStation ? selectedStation.distance : ''}</div>
                        </div>
                    </div>

                    <hr></hr>
                </>
            </form>
        </section>
    );
}
export default RoutePage;
