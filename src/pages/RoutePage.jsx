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

    const filterStation = stationList.filter((item) => {
        if (train === 'KTX') {
            return item.times.ktx !== null;
        }
        if (train === 'ITX') {
            return item.times.ITX !== null;
        }
        if (train === '무궁화') {
            return item.times.mugunghwa !== null;
        }
    });
    // 기차 종류를 선택했을때, 그에 따라 selectbox의 option에 다른 값을 받아와야한다.
    // 근데? 아니지. 아 맞지 option의 내용이 달라지는거니까.
    // 현재는 map item으로 json데이터를 연결해 city의 값으로 받아오고 있으므로,
    // 조건에 times를 걸어서 만약에 onClick된 setTrain값에 따라 -
    // times의 값이 있다면 해당 데이터를 받아오고, 아닐 때는 그 값을 안 받아온다!
    // 라고 조건을 짠다면.. 선택값에 따른 option 값을 다르게 받아올 수 있을 것 같은데?

    return (
        <section id="center">
            <form onSubmit="handleSubmit">
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
                                    onClick={() => setTrain('KTX')}>
                                    KTX
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    className="counter"
                                    role="radio"
                                    aria-checked={train === 'ITX'}
                                    onClick={() => setTrain('ITX')}>
                                    ITX
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    className="counter"
                                    role="radio"
                                    aria-checked={train === '무궁화'}
                                    onClick={() => setTrain('무궁화')}>
                                    무궁화
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* 출발, 도착지 선택 */}
                    <div>
                        <div>
                            <h4>출발</h4>
                            <select disabled>
                                <option value="서울" selected>
                                    서울
                                </option>
                            </select>
                        </div>
                        <button>⇔</button>
                        <div>
                            <h4>도착</h4>
                            <select onChange={handleSelect} value={selected}>
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
                </>
            </form>
        </section>
    );
}
export default RoutePage;
