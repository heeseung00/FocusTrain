import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '../context/TripContext.jsx';
import '../styles/SeatPage.css';
import SeatGrid from '../components/SeatGrid.jsx';

const SeatPage = () => {
    const { seats, activeCoach, setActiveCoach, selectedSeat, setSelectedSeat } = useTrip();

    // 기차 호차 선택
    const handleCoachClick = (coachId) => {
        // 항상 표시
        setActiveCoach(Number(coachId));
        // // 선택 - 해제 둘 다 포함
        // setActiveCoach(activeCoach === coachId ? null : coachId);
        setSelectedSeat(null);
    };

    // 기차 좌석 선택
    const handleSeatClick = (row, seatType, seatNumber) => {
        console.log('클릭:', row, seatType, seatNumber);

        if (selectedSeat?.row === row && selectedSeat?.seatType === seatType) {
            setSelectedSeat(null);
            return;
        }
        setSelectedSeat({ row, seatType, seatNumber });
    };

    // 다음 페이지 이동
    const navigate = useNavigate();
    const navigateGoToTicket = () => {
        navigate('/ticket');
    };

    return (
        <div className="train-booking">
            <div className="train-container">
                {/* 기차 호차 선택 */}
                <div className="train-display">
                    {Object.keys(seats).map((coachId) => (
                        <button
                            key={coachId}
                            className={`coach-button ${activeCoach === Number(coachId) ? 'active' : ''}`}
                            onClick={() => handleCoachClick(coachId)}>
                            {coachId}호차
                            {/* <div className="coach-label">{coachId}호차</div> */}
                        </button>
                    ))}
                </div>
            </div>

            <div className="coach-select">
                {/* 기차 좌석 선택 */}
                {activeCoach && (
                    <SeatGrid
                        seats={seats}
                        activeCoach={activeCoach}
                        selectedSeat={selectedSeat}
                        handleSeatClick={handleSeatClick}
                    />
                )}

                {/* 예매 버튼 - 좌석 선택시 버튼 활성화되어 다음 페이지로 이동가능 */}
                <div className="button-group">
                    <button
                        className={`reservation-btn ${selectedSeat ? 'accent' : 'disable '}`}
                        onClick={navigateGoToTicket}
                        disabled={!selectedSeat}>
                        예매하기
                    </button>
                </div>
            </div>
        </div>
    );
};

// // 좌석 상태와 클릭 효과
// function Seat({ seatType, seat, selected, onClick }) {
//     const isBooked = Boolean(seat);

//     return (
//         <div className={`seat-box ${selected ? 'selected' : ''}`} onClick={onClick}>
//             {seatType}
//         </div>
//     );
// }

export default SeatPage;
