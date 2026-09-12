import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { stationList } from '../utils/stationList.js';
import { formatTime, getArriveTime } from '../utils/time.js';
import { getTrainInfo } from '../utils/getTrainInfo.js';
import { useTrip } from '../context/TripContext.jsx';
import Modal from './Modal.jsx';
// import styled from 'styled-components';

// 열차, 출발역, 도착역, 시간 선택
function RoutePage() {
    // ---- 선택 상태 ----
    const {
        train,
        setTrain,
        selected,
        setSelected,
        isToggleOn,
        setIsToggleOn,
        focusTime,
        setFocusTime,
        departure,
        seats,
        setActiveCoach,
        setSelectedSeat,
        setModal,
    } = useTrip();

    // 드롭다운
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    useOnClickOutside(ref, () => setIsOpen(false));

    //  ---- 선택에서 파생되는 값들 ----
    const { trainKey, selectedStation, travelTime, restCount } = getTrainInfo(train, selected, stationList);

    // 선택한 열차에 따라 선택 가능한 역 필터링(조건부 랜더링)
    const filterStation = stationList.filter((item) => {
        return item.times[trainKey] !== null;
    });

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
    const handleSelect = (city) => {
        setSelected(city);
        setIsOpen(false);
    };

    // 모달 열기
    const handleModalOpen = () => {
        setModal('arrival');
    };

    // 도착지(역)이 선택되지 않으면 다음 페이지로 이동할 수 없게 처리
    const handleNextPage = (navigate) => {
        if (!selectedStation) {
            handleModalOpen();
            // alert('도착지를 선택해주세요.');
            return;
        }

        navigate();
    };

    // 랜덤 좌석 배치
    function handleRandomSeat() {
        const coachIds = Object.keys(seats);
        const randomSeat = coachIds[Math.floor(Math.random() * coachIds.length)];

        const rows = Object.entries(seats[randomSeat]);
        const randomIndex = Math.floor(Math.random() * rows.length);

        const [row] = rows[randomIndex];

        // 좌석 위치 중 랜덤
        const seatTypes = ['LeftSeat1', 'LeftSeat2', 'RightSeat1', 'RightSeat2'];

        const randomSeatType = seatTypes[Math.floor(Math.random() * seatTypes.length)];

        // SeatGrid에서 쓰는 좌석 번호 계산
        const seatNumber = rows.length - randomIndex;

        const seatLetters = {
            LeftSeat1: 'A',
            LeftSeat2: 'B',
            RightSeat1: 'C',
            RightSeat2: 'D',
        };

        const seatName = `${seatNumber}${seatLetters[randomSeatType]}`;

        // 기존에 사용하던 선택 함수 그대로 사용
        setActiveCoach(Number(randomSeat));

        setSelectedSeat({
            row,
            seatType: randomSeatType,
            seatNumber: seatName,
        });

        navigate('/ticket');
    }

    //  ---- 기타 효과 ----
    useEffect(() => {
        setFocusTime(travelTime);
    }, [travelTime]);

    return (
        <>
            <form onSubmit={(e) => e.preventDefault()}>
                <>
                    <div className="content">
                        {/* 기차 종류 선택 */}
                        <div className="train-select">
                            <ul>
                                {['KTX', 'ITX', '무궁화'].map((type) => {
                                    return (
                                        <li key={type}>
                                            <button
                                                className="option"
                                                type="button"
                                                role="radio"
                                                aria-checked={train === type}
                                                onClick={() => handleTrainChange(type)}>
                                                {type}
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        <ul className="card">
                            <li className="item item-1">
                                {/* 출발, 도착 선택 */}
                                <div className="station">
                                    <div className="title">
                                        <h4>출발</h4>
                                        <div className="select-station disabled">
                                            <span>{departure}</span>
                                        </div>
                                    </div>
                                    {/* <button type="button">⇔</button> */}
                                    <div className="title">
                                        <h4>도착</h4>
                                        <div
                                            ref={ref}
                                            className={`select-station ${isOpen ? 'station-active' : ''}`}
                                            onClick={() => setIsOpen((prev) => !prev)}
                                            onChange={handleSelect}>
                                            <span>{selected}</span>

                                            <div className="station-scroll">
                                                {isOpen && (
                                                    <ul className="station-menu">
                                                        {filterStation.map((item) => {
                                                            return (
                                                                <li key={item.id}>
                                                                    <div
                                                                        className={`station-city ${selected === item.city ? 'active' : ''}`}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleSelect(item.city);
                                                                            setIsOpen(false);
                                                                        }}>
                                                                        <div className="station-title">{item.city}</div>
                                                                        <div>{formatTime(item.times[trainKey])}</div>
                                                                    </div>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <BottomSheet
                                    filterStation={filterStation}
                                    selected={selected}
                                    handleSelect={handleSelect}
                                    trainKey={trainKey}
                                    departure={departure}
                                    isOpen={isOpen}
                                    setIsOpen={setIsOpen}
                                />

                                <hr />

                                {/* 소요시간에 따른 중간정차역 휴식 시간 지정*/}
                                {/* 도착지까지 정보 표시 */}
                                <div className="time-info">
                                    <div className="info duration">
                                        <h4>소요시간</h4>
                                        {/* 선택된 역이 있으면 매핑된 시간값 바로 출력 */}
                                        <h3>{selectedStation ? formatTime(focusTime) : ''}</h3>
                                    </div>
                                    <div className="info eta">
                                        <h4>도착 예정</h4>
                                        <h3 className="accent">{selectedStation ? getArriveTime(focusTime) : ''}</h3>
                                    </div>
                                </div>
                            </li>

                            {/* 중간정차역 체크 */}
                            <li className="item">
                                <div className="stop">
                                    <div className="stop-text">
                                        <h3>중간 정차역(휴식)</h3>
                                        <p>잠시 쉬어가며 집중력을 유지해요.</p>
                                    </div>
                                    <div className="toggle-wrap">
                                        <div
                                            className={`toggle ${isToggleOn ? 'toggle-on' : ''}`}
                                            onClick={() => {
                                                console.log('토글 클릭 전:', isToggleOn);
                                                setIsToggleOn(!isToggleOn);
                                            }}>
                                            <div className="toggle-button"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* 토글 ON일 때만 휴식 정보 표시 */}
                                <ToggleShow
                                    isToggleOn={isToggleOn}
                                    selectedStation={selectedStation}
                                    restCount={restCount}
                                />
                            </li>

                            <li className="item">
                                {/* 시간 조정 */}
                                <TimeControl
                                    focusTime={focusTime}
                                    setFocusTime={setFocusTime}
                                    travelTime={travelTime}
                                    selectedStation={selectedStation}
                                />
                            </li>
                        </ul>

                        {/* 다음 페이지 이동 */}
                        <div className="button-group">
                            <button type="submit" onClick={() => handleNextPage(navigateGoToSeat)}>
                                좌석 선택
                            </button>
                            <button className="accent" type="submit" onClick={() => handleNextPage(handleRandomSeat)}>
                                바로 예매
                            </button>
                        </div>
                    </div>
                </>
            </form>

            <Modal />
        </>
    );
}

// 토글시 보여줄 내용
function ToggleShow({ isToggleOn, selectedStation, restCount }) {
    if (!isToggleOn) {
        return (
            <div className="toggle-show">
                <p>중간 정차 없이 이동해요</p>
            </div>
        );
    }

    if (!selectedStation) {
        return (
            <div className="toggle-show">
                <p>도착지를 선택하면 표시돼요</p>
            </div>
        );
    }
    return (
        <div className="toggle-show">
            <p>예상정차 {restCount}회 · 회당 10분</p>
        </div>
    );
}

// 시간 조정
function TimeControl({ focusTime, setFocusTime, selectedStation }) {
    const increase = () => {
        // 역 선택 전에는 미작동
        if (!selectedStation) {
            return;
        }
        // 숫자가 아닌 문자열로 더해지는 오류 방지(ex) '90+5 = 905'이런 덧셈 오류를 '90+5 = 95'가 되도록)
        setFocusTime((prev) => prev + 5);
    };

    const decrease = () => {
        // 역 선택 전에는 미작동, 10분 이하로는 감소X
        if (!selectedStation || focusTime <= 10) {
            return;
        }

        setFocusTime((prev) => prev - 5);
    };
    return (
        <div className="time-control">
            <h4>목표 시간</h4>
            <div className="time-adjust">
                <button onClick={decrease}>-</button>
                <h3>{formatTime(focusTime)}</h3>
                <button onClick={increase}>+</button>
            </div>
        </div>
    );
}

// 외부 클릭 감지
function useOnClickOutside(ref, handler) {
    useEffect(() => {
        const onPointerDown = (e) => {
            const el = ref?.current;
            if (!el || el.contains(e.target)) return;
            handler(e);
        };
        document.addEventListener('pointerdown', onPointerDown, { passive: true });
        return () => document.removeEventListener('pointerdown', onPointerDown);
    }, [ref, handler]);
}

function BottomSheet({ filterStation, selected, handleSelect, trainKey, departure, isOpen, setIsOpen }) {
    return (
        <>
            {isOpen && (
                <div className="layer" onClick={() => setIsOpen(false)}>
                    <div className="dim" onClick={() => setIsOpen(false)}></div>

                    <div className="bottom-sheet">
                        <div className="title">
                            <h3>도착지 선택</h3>
                            <h4>{departure}에서 출발하는 노선</h4>
                        </div>

                        <hr />

                        <div className="station-scroll">
                            {/* {isOpen && ( */}
                            <ul className="station-menu">
                                {filterStation.map((item) => {
                                    return (
                                        <li key={item.id}>
                                            <div
                                                className={`station-city ${selected === item.city ? 'active' : ''}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleSelect(item.city);
                                                    setIsOpen(false);
                                                }}>
                                                <div className="station-title">{item.city}</div>
                                                <div>{formatTime(item.times[trainKey])}</div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                            {/* )} */}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default RoutePage;
