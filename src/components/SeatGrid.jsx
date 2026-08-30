function SeatGrid({ seats, activeCoach, selectedSeat, onSeatClick }) {
    return (
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
    );
}

export default SeatGrid;
