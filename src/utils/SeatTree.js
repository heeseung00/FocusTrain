class SeatNode {
    constructor(type, number, row) {
        this.type = type; // upper, middle, or lower
        this.number = number;
        this.row = row;
        this.isBooked = false;
        this.left = null; // Previous seat in row
        this.right = null; // Next seat in row
    }
}

class SeatTree {
    constructor() {
        this.rows = new Map(); // Map to store rows
        this.initialize();
    }

    initialize() {
        // Create 10 rows with 3 seats each (upper, middle, lower)
        for (let row = 1; row <= 10; row++) {
            const leftSeat1 = new SeatNode('left1', row, row);
            const leftSeat2 = new SeatNode('left2', row, row);
            const RightSeat1 = new SeatNode('Right1', row, row);
            const RightSeat2 = new SeatNode('Right2', row, row);

            // Link seats in the same row
            leftSeat1.left1 = leftSeat1;
            leftSeat2.left2 = leftSeat2;

            RightSeat1.Right1 = RightSeat1;
            RightSeat2.Right2 = RightSeat2;

            this.rows.set(row, { leftSeat1, leftSeat2, RightSeat1, RightSeat2 });
        }
    }

    findAvailableSeat(type, row) {
        const rowSeats = this.rows.get(row);
        if (!rowSeats) return null;
        return !rowSeats[type].isBooked ? rowSeats[type] : null;
    }

    bookSeat(type, row) {
        const seat = this.findAvailableSeat(type, row);
        if (seat) {
            seat.isBooked = true;
            return true;
        }
        return false;
    }
}

export default SeatTree;
