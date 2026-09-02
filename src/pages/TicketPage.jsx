import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TicketPage.css';
import { stationList } from '../utils/stationList.js';
import { getTrainInfo } from '../utils/getTrainInfo.js';
import { formatTime } from '../utils/time.js';
import { useTrip } from '../context/TripContext.jsx';

function TicketPage() {
    const navigate = useNavigate();
    const [isOpened, setIsOpened] = useState(false);

    function getToday() {
        const today = new Date();

        const days = ['일', '월', '화', '수', '목', '금', '토'];

        return {
            year: today.getFullYear(),
            month: today.getMonth() + 1,
            date: today.getDate(),
            day: days[today.getDay()],
            hours: today.getHours(),
            min: today.getMinutes(),
        };
    }

    // 반복되므로 TicketPage안에서 전역사용
    const today = getToday();

    // 오늘 날짜 표시- 년, 월, 일, 요일
    function TodayDate() {
        return (
            // p태그 안에는 div 넣기 불가. 만들 때 확인
            <>
                {today.year}년 {today.month}월 {today.date}일 ({today.day})
            </>
        );
    }

    // 현재시간 표시 - 시, 분
    function TodayTime() {
        return (
            <>
                {String(today.hours).padStart(2, '0')}:{String(today.min).padStart(2, '0')}
            </>
        );
    }

    // 시간 계산 - 출발지 시간 + 소요시간 = 도착지 시간
    function tripTime() {
        function getArriveTime() {
            // 시간을 분단위로 바꾼다 - ex) 16시간 = 60분 = 960분
            const total = today.hours * 60 + today.min + travelTime;
            // Math.floor로 소수점을 버리고 그 숫자에 24를 나누어 24시간이 넘어가면 다시 0부터 시작하도록 한다.
            const hours = String(Math.floor(total / 60) % 24).padStart(2, '0');
            const min = String(total % 60).padStart(2, '0');

            return `${hours}:${min}`;
        }

        return getArriveTime();
    }

    function handleTicketClick() {
        setIsOpened(true);

        setTimeout(() => {
            navigate('/timer');
        }, 800);
    }
    // 열차 선택값 받아오기
    const { train, selected, activeCoach, selectedSeat, focusTime } = useTrip();

    const { trainKey, selectedStation, travelTime } = getTrainInfo(train, selected, stationList);

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

                <div className={`ticket-container ${isOpened ? 'opened' : ''}`} id="ticket" onClick={handleTicketClick}>
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
                                        <p className="time">{TodayTime()}</p>
                                    </li>
                                    <li className="arrow">→</li>
                                    <li className="arrive">
                                        <h1 className="title">{selected}</h1>
                                        <p className="time">{tripTime()}</p>
                                    </li>
                                </ul>
                                <div className="Destination"></div>
                                <p className="subtitle">{formatTime(focusTime)}</p>
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
