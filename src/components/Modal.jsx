import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTripStore from '../stores/useTripStore.js';
import useTimerStore from '../stores/useTimerStore.js';
import { formatDurationTime } from '../utils/time.js';

function Modal() {
    const { elapsed, setTimerState, restSeconds, setRestSeconds, isResting, setIsResting, restTime, addRestOff } =
        useTimerStore();
    const { modal, setModal } = useTripStore();

    const navigate = useNavigate();
    const modalContent = {
        departure: {
            title: '출발지를 선택해주세요.',
            confirmText: '확인',
        },

        arrival: {
            title: '도착지를 선택해주세요.',
            confirmText: '확인',
        },

        rest: {
            title: '정차역에 도착했습니다.',
            confirmText: '휴식 종료하기',
        },

        end: {
            title: '여행을 종료할까요?',
            confirmText: '종료하기',
            cancelText: '돌아가기',
        },
    };

    useEffect(() => {
        if (modal !== 'rest' || !isResting) {
            return;
        }

        const timer = setInterval(() => {
            const currentSeconds = useTimerStore.getState().restSeconds;

            if (currentSeconds <= 1) {
                clearInterval(timer);
                setIsResting(false);
                setModal(false);
                setTimerState(true);

                return 0;
            }
            setRestSeconds(currentSeconds - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [modal, isResting]);

    if (!modal) return null;

    const content = modalContent[modal];

    const handleConfirm = () => {
        if (modal === 'arrival') {
            setModal(false);

            return;
        }

        if (modal === 'rest') {
            addRestOff(restSeconds);
            setRestSeconds(restTime);

            setIsResting(false);
            setModal(false);
            setTimerState(true);

            return;
        }

        if (modal === 'end') {
            setModal(false);
            setTimerState(false);
            navigate('/result');

            return;
        }

        // 출발지/도착지 미선택
        setModal(null);
    };

    const handleCancel = () => {
        setModal(false);
        setTimerState(true);
    };

    return (
        <div className="modal">
            <div className="modal-content item">
                <h2>{content.title}</h2>

                {content.description && <p>{content.description}</p>}
                {modal === 'end' && (
                    <div className="now">
                        <h4>현재 집중 시간</h4>
                        <h1>{formatDurationTime(elapsed)}</h1>
                    </div>
                )}

                {modal === 'rest' && (
                    <div className="timer">
                        <h4>휴식 시간</h4>
                        <h1>{formatDurationTime(restSeconds)}</h1>
                    </div>
                )}

                <div className="button-group">
                    {content.cancelText && (
                        <button type="button" onClick={handleCancel}>
                            {content.cancelText}
                        </button>
                    )}

                    <button
                        type="button"
                        className={modal === 'end' || modal === 'rest' ? 'end' : ''}
                        onClick={handleConfirm}>
                        {content.confirmText}
                    </button>
                </div>
            </div>
            <div className="dim"></div>
        </div>
    );
}

export default Modal;
