import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer.jsx';


function Login() {
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState('password');
  const [selectedRole, setSelectedRole] = useState('');
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    otp: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [mounted, setMounted] = useState(false);

  const roles = [
    { 
      id: 'admin', 
      name: 'Admin', 
      description: 'Administrative access',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      )
    },
    { 
      id: 'police', 
      name: 'Police', 
      description: 'Law enforcement access',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )
    },
    { 
      id: 'control_room', 
      name: 'Control Room', 
      description: 'Control room operations',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
        </svg>
      )
    },
    { 
      id: 'superadmin', 
      name: 'Superadmin', 
      description: 'Full system access',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
      )
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let interval;
    if (otpTimer > 0) {
      interval = setInterval(() => setOtpTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  const validateForm = () => {
    const newErrors = {};
    if (!selectedRole) newErrors.role = 'Please select a role';
    if (!formData.identifier.trim()) newErrors.identifier = 'Mobile number or email is required';
    else if (loginMethod === 'password') {
      if (formData.identifier.includes('@')) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.identifier)) newErrors.identifier = 'Please enter a valid email address';
      } else {
        if (!/^[6-9]\d{9}$/.test(formData.identifier.replace(/\s+/g, ''))) newErrors.identifier = 'Please enter a valid 10-digit mobile number';
      }
    }
    if (loginMethod === 'password' && !formData.password.trim()) newErrors.password = 'Password is required';
    if (loginMethod === 'otp' && !formData.otp.trim()) newErrors.otp = 'OTP is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            role: selectedRole,
            identifier: formData.identifier,
            password: formData.password,
            method: loginMethod
          })
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Login failed');
        }
        const data = await response.json();
        console.log('Login successful:', data);
        // Redirect to dashboard or appropriate page
        navigate('/dashboard');
      } catch (error) {
        console.error('Login error:', error);
        setErrors(prev => ({ ...prev, form: error.message }));
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSendOTP = async () => {
    if (!formData.identifier.trim()) {
      setErrors(prev => ({ ...prev, identifier: 'Please enter a mobile number first' }));
      return;
    }
    setOtpSent(true);
    setOtpTimer(30);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <>
    <div className="min-h-screen flex items-center justify-center py-12 px-4 relative overflow-visible w-[99vw]">
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.5s ease-in-out; }
      `}</style>
      
      <div className="absolute inset-0 overflow-visible">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className={`max-w-md w-full space-y-8 relative z-10 transition-all duration-1000 ease-out ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-6 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full"></div>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">SAHYatri</h1>
          <p className="text-slate-600 font-medium">Government of India</p>
          <p className="text-sm text-slate-500 mt-1">Digital Government Services Portal</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome Back</h2>
            <p className="text-slate-600">Sign in to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700">Select Your Role *</label>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((role) => (
                  <button key={role.id} type="button" onClick={() => { setSelectedRole(role.id); if (errors.role) setErrors(p => ({ ...p, role: '' })) }}
                    className={`group p-4 border-2 rounded-xl text-sm text-center font-medium transition-all duration-300 transform hover:scale-105 ${selectedRole === role.id ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 shadow-lg' : 'border-slate-200 hover:border-blue-300 text-slate-700 hover:bg-slate-50 hover:shadow-md'}`}>
                    <div className="flex items-center justify-center mb-2">
                      <div className={`transition-colors duration-300 ${selectedRole === role.id ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-500'}`}>{role.icon}</div>
                    </div>
                    <div className="font-semibold">{role.name}</div>
                  </button>
                ))}
              </div>
              {errors.role && <div className="text-red-600 text-sm flex items-center animate-shake"><svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>{errors.role}</div>}
            </div>

            <div className="relative">
              <div className="flex bg-slate-100 rounded-xl p-1 relative">
                <div className={`absolute top-1 bottom-1 bg-white rounded-lg shadow-md transition-all duration-300 ease-in-out ${loginMethod === 'password' ? 'left-1 w-1/2' : 'left-1/2 w-1/2'}`}></div>
                <button type="button" onClick={() => setLoginMethod('password')} className={`relative flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors duration-300 ${loginMethod === 'password' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-800'}`}>Password</button>
                <button type="button" onClick={() => setLoginMethod('otp')} className={`relative flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors duration-300 ${loginMethod === 'otp' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-800'}`}>OTP</button>
              </div>
            </div>

            {loginMethod === 'password' ? (
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Mobile Number or Email *</label>
                <div className="relative">
                  <input type="text" value={formData.identifier} onChange={(e) => handleInputChange('identifier', e.target.value)} className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${errors.identifier ? 'border-red-300 bg-red-50' : 'border-slate-200 hover:border-slate-300 focus:border-blue-500'}`} placeholder="Enter mobile or email" />
                </div>
                {errors.identifier && <div className="text-red-600 text-sm flex items-center animate-shake"><svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>{errors.identifier}</div>}
              </div>
            ) : null}

            {loginMethod === 'password' ? (
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Password *</label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} value={formData.password} onChange={(e) => handleInputChange('password', e.target.value)} className={`w-full px-4 py-3 pr-12 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${errors.password ? 'border-red-300 bg-red-50' : 'border-slate-200 hover:border-slate-300 focus:border-blue-500'}`} placeholder="Enter your password"/>
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200">
                    {showPassword ? <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" /><path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" /></svg> : <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>}
                  </button>
                </div>
                {errors.password && <div className="text-red-600 text-sm flex items-center animate-shake"><svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>{errors.password}</div>}
              </div>
            ) : (
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Enter OTP *</label>
                <div className="flex gap-3">
                  <input type="text" value={formData.otp} onChange={(e) => handleInputChange('otp', e.target.value.replace(/\D/g, '').slice(0, 6))} className={`flex-1 w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${errors.otp ? 'border-red-300 bg-red-50' : 'border-slate-200 hover:border-slate-300 focus:border-blue-500'}`} placeholder="Enter 6-digit OTP" maxLength="6"/>
                  <button type="button" onClick={handleSendOTP} disabled={otpTimer > 0} className={`px-5 py-3 rounded-xl font-medium transition-all duration-300 ${otpTimer > 0 ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transform hover:scale-105'}`}>
                    {otpTimer > 0 ? `${otpTimer}s` : otpSent ? 'Resend' : 'Send OTP'}
                  </button>
                </div>
                {errors.otp && <div className="text-red-600 text-sm flex items-center animate-shake"><svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>{errors.otp}</div>}
              </div>
            )}

            <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center shadow-lg">
              {isLoading ? (<><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Signing In...</>) : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button type="button" className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200">Forgot Password?</button>
          </div>
        </div>

        <div className="text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Government of India. All rights reserved.</p>
          <p>This is an official website of the Government of India</p>
        </div>
      </div>
      
    </div>
    {/* <Footer/> */}
    </>
  );
}

export default Login;