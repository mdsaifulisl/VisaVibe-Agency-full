import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle, FaGithub, FaEnvelope, FaLock, FaPlane, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login, message } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login Attempt:", formData);
    const response = await login(formData.email, formData.password);
    if (response.success) {
      window.location.href = '/admin';
    }
    
  };
 
  return (
    <div className="login-wrapper py-5 d-flex align-items-center justify-content-center bg-light" style={{ minHeight: '90vh' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="card-body p-5">
                
                {/* Logo & Header */}
                <div className="text-center mb-4">
                  <div className="login-logo-circle bg-alice-blue d-inline-flex align-items-center justify-content-center mb-3">
                    <FaPlane className="text-teal fs-2" />
                  </div>
                  <h3 className="fw-bold text-teal">Welcome Back!</h3>
                  <p className="text-muted small">Login to access your travel dashboard</p>
                </div>

                <form onSubmit={handleLogin}>
                  {/* Email Input */}
                  {message && <div className="alert alert-danger">{message}</div>}
                  <div className="mb-3">
                    <label className="form-label small fw-bold text-secondary">Email Address</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-0"><FaEnvelope className="text-muted" /></span>
                      <input 
                        type="email" 
                        className="form-control bg-light border-0 py-2" 
                        placeholder="example@mail.com"
                        required
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="mb-3">
                    <label className="form-label small fw-bold text-secondary">Password</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-0"><FaLock className="text-muted" /></span>
                      <input 
                        type={showPassword ? "text" : "password"} 
                        className="form-control bg-light border-0 py-2" 
                        placeholder="••••••••"
                        required
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                      />
                      <button 
                        type="button" 
                        className="input-group-text bg-light border-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input type="checkbox" className="form-check-input" id="remember" />
                      <label className="form-check-label small" htmlFor="remember">Remember me</label>
                    </div>
                    <Link to="/forgot-password" size="small" className="text-coral text-decoration-none small fw-bold">Forgot Password?</Link>
                  </div>

                  <button type="submit" className="btn btn-teal w-100 py-2 rounded-pill fw-bold shadow-sm mb-4">
                    Sign In
                  </button>
                </form>

                {/* Divider */}
                <div className="position-relative mb-4 text-center">
                  <hr />
                  <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 small text-muted">Or continue with</span>
                </div>

                {/* Social Logins
                <div className="row g-2 mb-4">
                  <div className="col-6">
                    <button className="btn btn-outline-light border text-dark w-100 d-flex align-items-center justify-content-center gap-2 py-2">
                      <FaGoogle className="text-danger" /> Google
                    </button>
                  </div>
                  <div className="col-6">
                    <button className="btn btn-outline-light border text-dark w-100 d-flex align-items-center justify-content-center gap-2 py-2">
                      <FaGithub /> GitHub
                    </button>
                  </div>
                </div> */}

                <p className="text-center small mb-0">
                  Don't have an account? <Link to="/register" className="text-coral fw-bold text-decoration-none">Create Account</Link>
                </p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;