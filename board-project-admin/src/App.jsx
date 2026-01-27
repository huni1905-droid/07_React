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
  /* 
  react에서는 컴포넌트를 자잘자잘하게 잘 쪼개는 것이 중요!
  App과 AppComponent로 쪼개는 이유 코드를 깔끔해게하기 위해서. 
  나중에 Context객체가 바뀌어서 AuthProvider가 아닌 다른 Provider쓰고싶을때
  App쪽에서만 바꿔주면 되기 때문에(AppComponent에서 일일이 바꿔줄 필요 없어서)
  */ 

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
              (Route, Link, NavLink, useNavigate() 등을 이용할 컴포넌트가 <DashBoard />이기때문에 
              <DashBoard />를 <BrowserRouter>로 감싸줘야한다. & 임포트까지 잘 되어야한다.)
              Link : 클릭할때마다 URL 바꾸는 기능
              NavLink : 지금 내가 들어와져 있는 주소에 NavLink에 연결해둔 to 속성이 일치하면 
                        거기에 active 클래스를 자동으로 추가해줌 ->  css에 active 추가해주면 색 변한다.
                        cf) DashBoard.css 125번째 줄 .router-tab-box a.active{~~}
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