import React from 'react';

function Login() {

  return (
    <div className="login-container">
      <h1>KH BoardProject Admin</h1>
      <h2>로그인</h2>
      <form >
        <div className="form-group">
          <label htmlFor="username">이메일:</label>
          <input 
            type="email" 
            id="email" 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호:</label>
          <input 
            type="password" 
            id="password" 
            required 
          />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default Login;
