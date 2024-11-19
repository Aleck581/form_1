import React, { useState } from "react";
import validator from 'validator';
import "./App.css";

function App() {
    const [isLogin, setIsLogin] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successState, setSuccessState] = useState({
        show: false,
        message: '',
        subMessage: ''
    });
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        name: ''
    });

    const validatePassword = (password) => {
        if (validator.isStrongPassword(password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })) {
            setErrorMessage('Strong password');
        } else {
            setErrorMessage('Password is too weak (minimum 8 characters, including uppercase, lowercase, numbers and symbols)');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'password' && isLogin === 'register') {
            validatePassword(value);
        }
    };

    const resetForm = () => {
        setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            name: ''
        });
        setErrorMessage('');
    };

    const showSuccessMessage = (message, subMessage) => {
        setSuccessState({
            show: true,
            message,
            subMessage
        });
        
        setTimeout(() => {
            setSuccessState({
                show: false,
                message: '',
                subMessage: ''
            });
            resetForm();
            setIsLogin(null);
        }, 3000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isLogin === 'register') {
            if (formData.password !== formData.confirmPassword) {
                alert("Passwords don't match!");
                return;
            }
            
            if (!validator.isStrongPassword(formData.password, {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            })) {
                alert("Password is too weak!");
                return;
            }

            showSuccessMessage('Registration Successful!', 'Redirecting to login page...');
        } else {
            console.log("Login:", formData);
            showSuccessMessage('Login Successful!', `Welcome back, ${formData.username}!`);
        }
    };

    const renderAuthForm = () => {
        if (!isLogin) return null;

        return (
            <div className="auth-container">
                <div className="auth-box">
                    <h2>{isLogin === 'login' ? 'Login' : 'Register'}</h2>
                    <form onSubmit={handleSubmit}>
                        {isLogin === 'register' && (
                            <>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </>
                        )}
                        
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            {isLogin === 'register' && errorMessage && (
                                <span className={`password-strength ${errorMessage.includes('Strong') ? 'success' : 'error'}`}>
                                    {errorMessage}
                                </span>
                            )}
                        </div>
                        
                        {!isLogin && (
    <div className="welcome-message">
        <h2>Welcome to Tunelab</h2>
        <p>
            Discover the power of seamless authentication. 
            Our secure and user-friendly system provides a robust solution 
            for managing user access and protecting your digital assets. 
            Join thousands of satisfied users who trust Tunelab for their 
            authentication needs.
        </p>
        <button 
            className="get-started-btn"
            onClick={() => setIsLogin('register')}
        >
            Get Started
        </button>
    </div>
)}
                        <button type="submit" className="submit-btn">
                            {isLogin === 'login' ? 'Login' : 'Register'}
                        </button>
                    </form>
                </div>
            </div>
        );
    };

    const renderHeader = () => (
        <div className="header">
            <h1 className="headline">Tunelab</h1>
            <div className="nav-buttons">
                <button 
                    className={`nav-btn ${isLogin === 'login' ? 'active' : ''}`}
                    onClick={() => {
                        setIsLogin('login');
                        resetForm();
                    }}
                >
                    Login
                </button>
                <button 
                    className={`nav-btn ${isLogin === 'register' ? 'active' : ''}`}
                    onClick={() => {
                        setIsLogin('register');
                        resetForm();
                    }}
                >
                    Register
                </button>
            </div>
        </div>
    );

    if (successState.show) {
        return (
            <div className="page-container">
                {renderHeader()}
                <div className="auth-container">
                    <div className="success-message">
                        <div className="success-icon">✓</div>
                        <h2>{successState.message}</h2>
                        <p>{successState.subMessage}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            {renderHeader()}
            {renderAuthForm()}
            {!isLogin && (
                <div className="welcome-message">
                    <h2>Welcome to Authentication System</h2>
                    <p>Please login or register to continue</p>
                </div>
            )}
        </div>
    );
}

export default App;