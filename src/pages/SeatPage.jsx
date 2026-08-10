import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SeatPage.css';

// https://github.com/Sanskar-Bhushankar/Trainbooking-React-DSA/blob/master/src/styles/TrainBooking.css

// eslint-disable-next-line
const SeatPage = () => {
    // 세로 한줄 최대 갯수 5개(row <= 5).
    const createCoachSeats = () => {
        const rows = {};

        for (let row = 0; row <= 5; row++) {
            rows[row] = { LeftSeat1: null, LeftSeat2: null, RightSeat1: null, RightSeat2: null };
        }
        return rows;
    };

    // 호차별 좌석 데이터
    const [seats, setSeats] = useState({
        1: createCoachSeats(),
        2: createCoachSeats(),
        3: createCoachSeats(),
        4: createCoachSeats(),
        5: createCoachSeats(),
    });
    // 현재 선택된 호차
    const [activeCoach, setActiveCoach] = useState(1);
    // 현재 선택된 좌석
    const [selectedSeat, setSelectedSeat] = useState(null);

    // 기차 호차 선택
    const handleCoachClick = (coachId) => {
        // 항상 표시
        setActiveCoach(coachId);
        // // 선택 - 해제 둘 다 포함
        // setActiveCoach(activeCoach === coachId ? null : coachId);
        setSelectedSeat(null);
    };

    // 기차 좌석 선택
    const handleSeatClick = (row, seatType) => {
        console.log('클릭:', row, seatType);

        if (selectedSeat?.row === row && selectedSeat?.seatType === seatType) {
            setSelectedSeat(null);
            return;
        }
        setSelectedSeat({ row, seatType });
    };

    // 다음 페이지 이동
    const navigate = useNavigate();
    const navigateGoToTicket = () => {
        navigate('/ticket');
    };

    // 다음 한 줄에 대해서 react-hooks/exhaustive-deps ESLint 경고를 무시.
    useEffect(() => {
        // // Initialize 필요한 상태를 초기화
    }, []);

    return (
        <div className="train-booking">
            <h1>좌석 선택</h1>

            <div className="train-container">
                {/* 기차 호차 선택 */}
                <div className="train-display">
                    {Object.keys(seats).map((coachId) => (
                        <div
                            key={coachId}
                            className={`coach-button ${activeCoach === Number(coachId) ? 'active' : ''}`}
                            onClick={() => handleCoachClick(coachId)}>
                            <div className="coach-label">{coachId}호차</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 기차 좌석 선택 */}
            {activeCoach && (
                <div className="coach">
                    <h2>Coach {activeCoach}</h2>

                    {Object.entries(seats[activeCoach]).map(([row, rowSeats], index) => {
                        // 번호를 역순으로 표시
                        const seatNumber = Object.keys(seats[activeCoach]).length - index;

                        return (
                            <div key={row} className="seat-row">
                                {/* <h3>
                                    {activeCoach} ({row})
                                </h3> */}

                                <div className="seat-list">
                                    <Seat
                                        seatType={`${seatNumber}A`}
                                        seat={rowSeats.LeftSeat1}
                                        selected={selectedSeat?.row === row && selectedSeat?.seatType === 'LeftSeat1'}
                                        onClick={() => handleSeatClick(row, 'LeftSeat1')}
                                    />

                                    <Seat
                                        seatType={`${seatNumber}B`}
                                        seat={rowSeats.LeftSeat2}
                                        selected={selectedSeat?.row === row && selectedSeat?.seatType === 'LeftSeat2'}
                                        onClick={() => handleSeatClick(row, 'LeftSeat2')}
                                    />

                                    <div className="seat-aisle"></div>

                                    <Seat
                                        seatType={`${seatNumber}C`}
                                        seat={rowSeats.RightSeat1}
                                        selected={selectedSeat?.row === row && selectedSeat?.seatType === 'RightSeat1'}
                                        onClick={() => handleSeatClick(row, 'RightSeat1')}
                                    />

                                    <Seat
                                        seatType={`${seatNumber}D`}
                                        seat={rowSeats.RightSeat2}
                                        selected={selectedSeat?.row === row && selectedSeat?.seatType === 'RightSeat2'}
                                        onClick={() => handleSeatClick(row, 'RightSeat2')}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* 예매 버튼 - 좌석 선택시 버튼 활성화되어 다음 페이지로 이동가능 */}
            <div>
                <button
                    className={`reservation-btn ${selectedSeat ? 'active' : ''}`}
                    onClick={navigateGoToTicket}
                    disabled={!selectedSeat}>
                    예매하기
                </button>
            </div>
        </div>
    );
};

// 좌석 상태와 클릭 효과
function Seat({ seatType, seat, selected, onClick }) {
    const isBooked = Boolean(seat);

    return (
        <div className={`seat-box ${selected ? 'selected' : ''}`} onClick={onClick}>
            {seatType}
        </div>
    );
}

export default SeatPage;
