import { useLocation } from 'react-router-dom';
import useThemeStore from '../stores/useThemeStore.js';
import '../App.css';

function Header() {
    const { pathname } = useLocation();

    const pageTitle = {
        '/': '메인',
        '/seat': '좌석 선택',
        '/ticket': '티켓 발권',
        '/timer': '타이머',
        '/result': '도착 안내',
    }[pathname];

    return (
        <div className="container">
            <h1 className="title-text">Focus Train</h1>
            <div className="page">{pageTitle}</div>
            <ThemeToggle />
        </div>
    );
}

function ThemeToggle() {
    const { theme, toggleTheme } = useThemeStore();

    return <button onClick={toggleTheme}>{theme === 'light' ? '🌙' : '☀️'}</button>;
}

export default Header;
