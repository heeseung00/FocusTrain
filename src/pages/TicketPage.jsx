import '../styles/TicketPage.css';
import { stationList } from '../utils/stationList.js';
import { formatTime } from '../pages/RoutePage.jsx';
import { useTrip } from '../context/TripContext.jsx';

// 가져온 코드: https://codepen.io/cliffpyles/pen/xbEdVgd
// 작동 참고: https://codepen.io/cbolson/pen/raxrRJm

// 기차표 이미지 참고: https://mir-s3-cdn-cf.behance.net/projects/404/a01ecb34381125.Y3JvcCwxNzExLDEzMzgsMzk0LDgw.jpg
// 사실 바코드 말고 QR로 하고싶긴함

// ┌────────────────────────────────────┐
// │  2026년 08월 11일 (화)       KTX   │
// ├────────────────────────────────────┤
// │                                    │
// │        서울       →       대전     │
// │       15:08              16:13     │
// │                                    │
// │              1시간 05분             │
// ├────────────────────────────────────┤
// │ KTX-산천 255       02호차 12A석    │
// └────────────────────────────────────┘

function TicketPage(row, seatType) {
    // ---- 선택 상태 ----
    // const { train, setTrain, selected, setSelected, isToggleOn, setIsToggleOn, focusTime, setFocusTime } = useTrip();

    // 오늘 날짜 표시
    function TodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const date = today.getDate();

        const days = ['일', '월', '화', '수', '목', '금', '토'];
        const dayName = days[today.getDay()];

        return (
            <div>
                {year}년 {month}월 {date}일 ({dayName})
            </div>
        );
    }

    // 열차 선택값 받아오기
    const { train, selected, activeCoach, setActiveCoach, selectedSeat, setSelectedSeat } = useTrip();

    const trainKey = train === '무궁화' ? 'mugunghwa' : train.toLowerCase();

    const selectedStation = stationList.find((item) => item.city === selected);

    const travelTime = selectedStation ? selectedStation.times[trainKey] : 0;

    // 열차 종류에 따라 기차 이름 다르게
    const trainLabelS = {
        KTX: 'KTX 001',
        ITX: 'ITX-새마을',
        무궁화: '무궁화호 1151',
    };

    const trainLabel = trainLabelS[train];

    return (
        <section id="center">
            <h1>기차표 뽑기</h1>

            <div className="ticket-page">
                <div className="ambient-light"></div>

                <div className="ticket-container" id="ticket">
                    <article className="ticket-main">
                        <div className="ticket-content">
                            <header className="ticket-header">
                                <span className="date">{TodayDate()}</span>
                                <span className="type">{train}</span>
                            </header>

                            <div className="ticket-body">
                                <ul className="ticket-title">
                                    <li className="depart">
                                        <h1 className="title">서울</h1>
                                        <p className="time">15:08</p>
                                    </li>
                                    <li className="arrow">→</li>
                                    <li className="arrive">
                                        <h1 className="title">{selected}</h1>
                                        <p className="time">16:13</p>
                                    </li>
                                </ul>
                                <div className="Destination"></div>
                                <p className="subtitle">{formatTime(travelTime)}</p>
                            </div>

                            <footer className="ticket-footer">
                                <div className="info-block">
                                    <span className="label">{trainLabel}</span>
                                </div>
                                <div className="info-block">
                                    <span className="label">
                                        {activeCoach}호차 {selectedSeat?.seatNumber}석
                                    </span>
                                </div>
                            </footer>
                        </div>

                        <div className="perforation-line"></div>
                    </article>

                    <aside className="ticket-stub">
                        {/* <div className="foil-seal"></div> */}
                        <div className="barcode-wrap">
                            <div className="barcode"></div>
                        </div>
                        <p className="stub-text">Focus Trip</p>
                    </aside>
                </div>
            </div>
        </section>
    );
}

export default TicketPage;
