import { useContext } from 'react';
import { AuthContext, AuthProvider } from './components/AuthContext';
import DashBoard from './components/DashBoard';
import Login from './components/Login';
import './css/App.css';
import { BrowserRouter } from 'react-router-dom';

// 컴포넌트를 분리하여 하위 컴포넌트에서 useContext 사용하기
function App() {
  return (
    <AuthProvider>
      <AppComponent />
    </AuthProvider>
  )
}

function AppComponent() {
  const { user } = useContext(AuthContext);
  // 로그인을 했다면 DashBoard 렌더링
  // 로그인을 안했다면 Login 렌더링
  // -> 조건 : 로그인 여부
  // ->       로그인을 했는지 안했는지를 기억해줄 상태값(user)
  // ->       user 에는 로그인 한 사람의 대한 정보가 세팅.
  // ->       user는 AuthContext 안에 작성!
  // ->       ContextAPI 를 이용하여 렌더링 조건 처리 하겠다!

  return (
    <>
      {/* user ? (로그인을 했을때 렌더링할 UI) : (로그인을 안했을 때 렌더링할 UI)) */}
      { user ? 
        (
          <div className='body-container'>
            {/* 
              BrowserRouter : React앱에서 URL 경로에 따라
              컴포넌트를 보여줄 수 있게 해주는 라우팅 컨테이너(라우팅이 적용될 부분의 최상위 부모 컴포넌트)
              -> Route, Link, NavLink, useNavigate() 등 같은 라우팅 관련 기능을 사용할 수 있다.
            */}
            <BrowserRouter>
              <DashBoard />
            </BrowserRouter>
          </div>
        )
      : (
        <div className='login-section'>
          <Login />
          {/* import가 안 될때는 해당 컴포넌트가 export되고있는지 부터 확인한다. */}
        </div>
      )}
    </>
  )
}

export default App