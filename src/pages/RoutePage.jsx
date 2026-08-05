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
                        <div>⇔</div>
                        <div>
                            <h4>도착</h4>
                            <select onChange={handleSelect} value={selected}>
                                {stationList.map((item) => {
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
