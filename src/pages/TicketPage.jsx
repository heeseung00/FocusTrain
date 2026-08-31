import '../styles/TicketPage.css';

// 가져온 코드: https://codepen.io/cliffpyles/pen/xbEdVgd
// 작동 참고: https://codepen.io/cbolson/pen/raxrRJm

// 기차표 이미지 참고: https://mir-s3-cdn-cf.behance.net/projects/404/a01ecb34381125.Y3JvcCwxNzExLDEzMzgsMzk0LDgw.jpg
// 사실 바코드 말고 QR로 하고싶긴함

function TicketPage() {
    return (
        <section id="center">
            <h1>기차표 뽑기</h1>

            <div class="ticket-page">
                <div class="ambient-light"></div>

                <div class="ticket-container" id="ticket">
                    <article class="ticket-main">
                        <div class="ticket-content">
                            <header class="ticket-header">
                                <span class="eyebrow">A/W 2026</span>
                                <span class="serial">No. 004912</span>
                            </header>

                            <div class="ticket-body">
                                <h1 class="title">span</h1>
                                <p class="subtitle">Exclusive Preview & Gala</p>
                            </div>

                            <footer class="ticket-footer">
                                <div class="info-block">
                                    <span class="label">Date</span>
                                    <span class="value">MAY 24</span>
                                </div>
                                <div class="info-block">
                                    <span class="label">Time</span>
                                    <span class="value">21:00</span>
                                </div>
                                <div class="info-block">
                                    <span class="label">좌석</span>
                                    <span class="value">TWO</span>
                                </div>
                                <div class="info-block">
                                    <span class="label">소요시간</span>
                                    <span class="value">TWO</span>
                                </div>
                            </footer>
                        </div>

                        <div class="perforation-line"></div>
                    </article>

                    <aside class="ticket-stub">
                        <div class="foil-seal"></div>
                        <div class="barcode"></div>
                        <p class="stub-text">Focus Trip</p>
                    </aside>

                    <button className="departure-button">출발하기</button>
                </div>
            </div>
        </section>
    );
}

export default TicketPage;
