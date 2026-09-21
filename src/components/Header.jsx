import { useState } from 'react';
import { useLocation } from 'react-router-dom';
// import useThemeStore from '../stores/useThemeStore.js';
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
            <h1 className="header-text">Focus Train</h1>
            <div className="header-tools">
                <div className="page">{pageTitle}</div>
                <ThemeToggle />
            </div>
        </div>
    );
}

function ThemeToggle() {
    // localStorage에 테마 설정값을 저장하여 새로고침을 해도 유지되도록.
    const [theme, setTheme] = useState(() => {
        const saveTheme = localStorage.getItem('theme') || 'light';

        document.documentElement.dataset.theme = saveTheme;

        return saveTheme;
    });

    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light';

        setTheme(nextTheme);
        localStorage.setItem('theme', nextTheme);
        document.documentElement.dataset.theme = nextTheme;
    };

    return <button onClick={toggleTheme}>{theme === 'light' ? '🌙' : '☀️'}</button>;
}

export default Header;
