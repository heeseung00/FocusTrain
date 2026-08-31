import { stationList } from '../utils/stationList.js';

function SeatPage() {
    return (
        <section id="center">
            <form onSubmit={(e) => e.preventDefault()}>
                <>
                    <div>
                        <h1>기차표 뽑기</h1>
                    </div>
                </>
            </form>
        </section>
    );
}

export default SeatPage;
