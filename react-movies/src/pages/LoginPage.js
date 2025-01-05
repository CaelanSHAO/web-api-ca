import React, { useState } from 'react';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        const response = await fetch('/api/users?action=login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
    
        const data = await response.json();
        if (response.ok) {
            // 存储 Token
            localStorage.setItem('token', data.token);
            alert('Login successful');
        } else {
            setError(data.msg || 'Login failed');
        }
    };
    

    return (
        <div>
            <h1>Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}
