import '../styles/TicketPage.css';

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

function TicketPage() {
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
    return (
        <section id="center">
            <h1>기차표 뽑기</h1>

            <div class="ticket-page">
                <div class="ambient-light"></div>

                <div class="ticket-container" id="ticket">
                    <article class="ticket-main">
                        <div class="ticket-content">
                            <header class="ticket-header">
                                <span class="date">{TodayDate()}</span>
                                <span class="type">KTX</span>
                            </header>

                            <div class="ticket-body">
                                <ul className="ticket-title">
                                    <li className="depart">
                                        <h1 class="title">서울</h1>
                                        <p class="time">15:08</p>
                                    </li>
                                    <li className="arrow">→</li>
                                    <li className="arrive">
                                        <h1 class="title">대전</h1>
                                        <p class="time">16:13</p>
                                    </li>
                                </ul>
                                <div className="Destination"></div>
                                <p class="subtitle">1시간 05분</p>
                            </div>

                            <footer class="ticket-footer">
                                {/* <div class="info-block">
                                    <span class="label">Date</span>
                                    <span class="value">MAY 24</span>
                                </div> */}
                                <div class="info-block">
                                    <span class="label">KTX-산천 255</span>
                                </div>
                                <div class="info-block">
                                    <span class="label">02호차 12A석</span>
                                </div>
                            </footer>
                        </div>

                        <div class="perforation-line"></div>
                    </article>

                    <aside class="ticket-stub">
                        {/* <div class="foil-seal"></div> */}
                        <div className="barcode-wrap">
                            <div class="barcode"></div>
                        </div>
                        <p class="stub-text">Focus Trip</p>
                    </aside>
                </div>
            </div>
        </section>
    );
}

export default TicketPage;
