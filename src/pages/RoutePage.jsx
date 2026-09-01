import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { stationList } from '../utils/stationList.js';
import { useTrip } from '../context/TripContext.jsx';
// import styled from 'styled-components';

// 전역 사용을 위해 위치 조정
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

// 열차, 출발역, 도착역, 시간 선택
function RoutePage() {
    // ---- 선택 상태 ----
    const { train, setTrain, selected, setSelected, isToggleOn, setIsToggleOn, focusTime, setFocusTime } = useTrip();

    //  ---- 선택에서 파생되는 값들 ----
    // 선택한 역에 따라 '출발, 도착'선택 조건부 랜더링
    const trainKey = train === '무궁화' ? 'mugunghwa' : train.toLowerCase();
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
    // 역이 선택되었을 때 조건 걸기
    const selectedStation = filterStation.find((item) => item.city === selected);
    // 선택한 역의 이동시간
    const travelTime = selectedStation ? selectedStation.times[trainKey] : 0;
    // 이동시간에 따른 휴식 횟수 (중간 정차역)
    const restCount = travelTime >= 20 ? Math.floor(travelTime / 20) : 0;

    // 다음 페이지 이동
    const navigate = useNavigate();
    const navigateGoToSeat = () => {
        navigate('/seat');
    };
    const navigateGoToTicket = () => {
        navigate('/ticket');
    };

    //  ---- 이벤트 핸들러 ----
    const handleTrainChange = (trainType) => {
        setTrain(trainType);
        setSelected('선택');
    };
    const handleSelect = (e) => {
        setSelected(e.target.value);
    };

    // 도착지(역)이 선택되지 않으면 다음 페이지로 이동할 수 없게 처리
    const handleNextPage = (navigate) => {
        if (!selectedStation) {
            alert('도착지를 선택해주세요.');
            return;
        }

        navigate();
    };

    //  ---- 기타 효과 ----
    useEffect(() => {
        setFocusTime(travelTime);
    }, [travelTime]);

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
                            <h4>출발지</h4>
                            <select value="서울" disabled>
                                <option value="서울">서울</option>
                            </select>
                        </div>
                        <button type="button">⇔</button>
                        <div>
                            <h4>도착지</h4>
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

                    {/* 소요시간에 따른 중간정차역 휴식 시간 지정*/}
                    {/* 도착지까지 정보 표시 */}
                    <div>
                        <div>
                            <h4>소요시간</h4>
                            {/* 선택된 역이 있으면 매핑된 시간값 바로 출력 */}
                            <div>{selectedStation ? formatTime(travelTime) : ''}</div>
                        </div>
                        <>
                            {' '}
                            {/* <div>
                                <h4>날짜</h4>
                                <div>{today.toLocaleDateString()}</div>
                            </div>
                            <div>
                                <h4>거리</h4>
                                <div>{selectedStation ? selectedStation.distance : ''}</div>
                            </div> */}
                        </>
                    </div>

                    <hr></hr>

                    {/* 중간정차역 체크 */}
                    <div>
                        <div>
                            <h4>중간 정차역(휴식)</h4>
                            <div>
                                <p>잠시 쉬어가며 집중력을 유지합니다.</p>
                                <div className="toggleWrap">
                                    <div
                                        className={`toggle ${isToggleOn ? 'toggle--on' : ''}`}
                                        onClick={() => setIsToggleOn(!isToggleOn)}>
                                        <div className="toggle__button"></div>
                                    </div>
                                </div>

                                {/* 토글 ON일 때만 휴식 정보 표시 */}
                                {isToggleOn && selectedStation && (
                                    <ToggleShow travelTime={travelTime} restCount={restCount} />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 시간 조정 */}
                    <div>
                        <TimeControl focusTime={focusTime} setFocusTime={setFocusTime} travelTime={travelTime} />
                    </div>

                    {/* 다음 페이지 이동 */}
                    <div>
                        {/* <button type="submit" onClick={navigateGoToSeat}> */}
                        <button type="submit" onClick={() => handleNextPage(navigateGoToSeat)}>
                            좌석 선택
                        </button>
                        <button type="submit" onClick={() => handleNextPage(navigateGoToTicket)}>
                            바로 예매
                        </button>
                    </div>
                </>
            </form>
        </section>
    );
}

// 토글시 보여줄 내용
function ToggleShow({ restCount }) {
    return (
        <div>
            <h5>예상정차</h5>
            <p>총 {restCount}번의 휴식이 있습니다.</p>
        </div>
    );
}

// 시간 조정
function TimeControl({ focusTime, setFocusTime, travelTime }) {
    const increase = () => {
        // 숫자가 아닌 문자열로 더해지는 오류 방지(ex) '90+5 = 95'가 아니라 '90+5 = 905' 이렇게 오류남)
        setFocusTime((prev) => prev + 5);
    };

    const decrease = () => {
        if (focusTime <= 10) {
            return;
        }

        setFocusTime((prev) => prev - 5);
    };
    return (
        <>
            <h5>목표 시간</h5>
            <>
                <button onClick={decrease}>-</button>
                <p>{formatTime(focusTime)}</p>
                <button onClick={increase}>+</button>
            </>
        </>
    );
}

export default RoutePage;
