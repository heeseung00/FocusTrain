function SeatGrid({ seats, activeCoach, selectedSeat, handleSeatClick }) {
    return (
        <div className="coach">
            <div className="coach-text">
                <h2>{activeCoach}호차</h2>
                <ul className="coach-notice">
                    <li>
                        <h4>선택가능</h4>
                    </li>
                    <li>
                        <h4 className="seleted">선택됨</h4>
                    </li>
                </ul>
            </div>

            {Object.entries(seats[activeCoach]).map(([row, rowSeats], index) => {
                // 번호를 역순으로 표시
                const seatNumber = Object.keys(seats[activeCoach]).length - index;

                return (
                    <div key={row} className="seat-row">
                        <div className="seat-list">
                            <Seat
                                seatType={`${seatNumber}A`}
                                seat={rowSeats.LeftSeat1}
                                selected={selectedSeat?.row === row && selectedSeat?.seatType === 'LeftSeat1'}
                                onClick={() => handleSeatClick(row, 'LeftSeat1', `${seatNumber}A`)}
                            />

                            <Seat
                                seatType={`${seatNumber}B`}
                                seat={rowSeats.LeftSeat2}
                                selected={selectedSeat?.row === row && selectedSeat?.seatType === 'LeftSeat2'}
                                onClick={() => handleSeatClick(row, 'LeftSeat2', `${seatNumber}B`)}
                            />

                            <div className="seat-aisle">
                                <img src="" alt="" />
                            </div>

                            <Seat
                                seatType={`${seatNumber}C`}
                                seat={rowSeats.RightSeat1}
                                selected={selectedSeat?.row === row && selectedSeat?.seatType === 'RightSeat1'}
                                onClick={() => handleSeatClick(row, 'RightSeat1', `${seatNumber}C`)}
                            />

                            <Seat
                                seatType={`${seatNumber}D`}
                                seat={rowSeats.RightSeat2}
                                selected={selectedSeat?.row === row && selectedSeat?.seatType === 'RightSeat2'}
                                onClick={() => handleSeatClick(row, 'RightSeat2', `${seatNumber}D`)}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// 좌석 상태와 클릭 효과
function Seat({ seatType, seat, selected, onClick }) {
    const isBooked = Boolean(seat);

    return (
        <div className={`seat-box ${selected ? 'selected' : ''}`} onClick={onClick}>
            {seatType}
        </div>
    );
}

export default SeatGrid;
