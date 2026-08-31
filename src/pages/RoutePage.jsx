// import { useState, useRef } from 'react';
import { useState } from 'react';
import { stationList } from '../utils/stationList.js';
// import styled from 'styled-components';

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

    // 선택한 역에 따라 '출발, 도착'선택 조건부 랜더링
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

    // 이동시간의 숫자를 시간-분 형태로 출력
    function formatTime(minutes) {
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

    // // 중간정차역 휴식 시간
    // let restCount = 0;

    // if (focusTime >= 20) {
    //     restCount = Math.floor(focusTime / 20);
    // }

    // 참고해서 만들기: https://codepen.io/anneklapwijk/pen/bwjygB (뽀모도로 만들기 코드)
    // 휴식(중간 정차)기능 만들기
    const pomodoro = 20;
    const TIMERS = {
        POMODORO: 'POMODORO',
        BREAK: 'BREAK',
    };

    const initialState = {
        settings: {
            [TIMERS.POMODORO]: pomodoro, // switch to "break" timer when pomodoro timer === 0
            [TIMERS.BREAK]: 5, // stop timers when "break" timer === 0
        },
        timer: {
            timer: pomodoro * 60, // 초 계산
            display: {
                minutes: pomodoro,
                seconds: '00',
            },
            ticking: true,
            currentTimer: TIMERS.POMODORO,
            nextTimer: TIMERS.BREAK,
        },
    };

    // // 오늘 날짜 출력
    // const today = new Date();

    // 토글 버튼
    const [isToggleOn, setIsToggleOn] = useState(true);
    // 토글 on 일때, 토글 내용 보여주기
    const toggleShow = () => {
        if ((isToggleOn = true)) {
            myDivRef;
        }
    };

    return (
        <section id="center">
            <form onSubmit={(e) => e.preventDefault()}>
                <>
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
                                <select value="서울" disabled>
                                    <option value="서울">서울</option>
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

                        {/* 소요시간에 따른 중간정차역 휴식 시간 지정
휴식시간은 20분 마다 5분씩 주어진다.
20분 단위로 휴식이 하나씩 늘어난다.
최소값은 10분이며, 20분 아래로는 휴식이 없다.
selectedStation.times[trainKey]로 시간을 받아오고 */}
                        {/* 도착지까지 정보 표시 */}
                        <div>
                            <div>
                                <h4>소요시간</h4>
                                {/* 선택된 역이 있으면 매핑된 시간값 바로 출력 */}
                                <div>{selectedStation ? formatTime(selectedStation.times[trainKey]) : ''}</div>
                            </div>
                            {/* <div>
                                <h4>날짜</h4>
                                <div>{today.toLocaleDateString()}</div>
                            </div>
                            <div>
                                <h4>거리</h4>
                                <div>{selectedStation ? selectedStation.distance : ''}</div>
                            </div> */}
                        </div>
                    </>

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
                                    <div>{isToggleOn ? <ToggleShow /> : null}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </form>
        </section>
    );
}

// 토글시 보여줄 내용
function ToggleShow() {
    return (
        <div className="toggleShow">
            <h5>예상정차</h5>
            <p>총 {}번의 휴식이 있습니다.</p>
        </div>
    );
}
export default RoutePage;
