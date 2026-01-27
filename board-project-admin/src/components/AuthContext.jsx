import axios from "axios";
import { createContext, useState } from "react";
import { axiosApi } from "../api/axiosAPI";

export const AuthContext = createContext();

// Context는 Provider(제공자)와 Consumer(소비자) 존재

// 전역 상태 제공자(Provider) 정의
// AuthProvider의 사이게 껴있는 자식 컴포넌트(AppComponent)가 
// AuthProvider의 매개변수로 들어올 수 있어 이 친구를 여기선 { children }로 한다
export const AuthProvider = ({ children }) => {
  // 상태값, 함수
  // 전역적으로 현재 로그인한 회원의 정보를 기억할 상태 정의
  const [user, setUser] = useState(() => {
    const storeUser = localStorage.getItem("userData");
    // 로그인된 회원이 있으면 localStorage에 저장된 회원 정보 갖고온다.
    return storeUser ? JSON.parse(storeUser) : null;
    //storeUser의 값이 있으면 JSON형태도 변환해서 갖고 오고, 없으면 null값 반환
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // *** Login화면에서 사용될 값들이 왜 Authcontext에 정의되어 있는가? **
  // 로그인 자체를 AuthProvider에서 해야되. 
  // 왜냐하면 로그인한 회원의 정보를 전역적ㄴ으로 user라는 애가 작고있어야되
  // 로그인한 회원 정보인 user라는 애를 Context에 실어줘서 전역적으로 상태 설정을 해놔야만 
  // 모든 컴포넌트에서 이 값을 이용할 수 있기 때문에 AuthProvider에서 만들었어
  // 나중에 setUser를 통해 현제 로그인한 회원 정보를 세팅할거야
  // 현재 이메일과 비밀번호를 서버쪽으로 넘겨줘야 DB로 가서 일치하는 회원 조회해서 갖고오니깐.
  // -> email과 password가 AuthProvider에서 필요해
  // React는 단방향으로 데이터 전달할 수 있어 
  // -> Login이라는 자식 컴포넌트에 email과 password를 정의해두면 AuthProvider가 이용할 수 없어
  // -> lifting up(끌어올리기)해줘야되 -> 그래서 가장 위 부모인 AuthProvider까지 끌어 올린거야!

  // 이메일 입력 핸들러(Login input 창에서 쓰이게 됨)
  const changeInputEmail = (e) => {
    setEmail(e.target.value);
  }

  // 패스워드 입력 핸들러
  const changeInputPw = (e) => {
    setPassword(e.target.value);
  }

  // 로그인 처리 함수
  const handleLogin = async(e) => {
    e.preventDefault(); 
    // 기본적으로 발생하는 이벤트 막음
    // form태그로 감싸져서 제출된 경우 기본적으로 동기식 요청이 일어나는데 이를 방지

    // 비동기 로그인 요청 -> 서버로
    const response = await axiosApi.post("/admin/login",
      // const response = await axios.post("http://localhost/admin/login",
      // 주소값을 풀 네임으로 써야한다 
      // -> api/axiosApi.js 를 통해서 위에 같이 쓸 수 있다. 
      { memberEmail : email, memberPw : password }
      // Member DTO를 통해 수집하기 위해서 memberEmail, memberPw로 보내줌
    );
    console.log(response);
    // response는 Javascript 아래와 같이 객체 형태로 넘어온다. 
    // response는 JS OBJ형태로 저장됨
    // response.status : 200
    // response.data : 응답데이터

    const adminInfo = response.data;

    if(adminInfo.length === 0) {
      alert("이메일 혹은 비밀번호 불일치");
      return;
    }
 
    // 상태에 셋팅
    setUser(adminInfo);

    // 데이터를 localStorage에 저장
    localStorage.setItem("userData", JSON.stringify(adminInfo));

    // 만료시간 지정(1시간 뒤에 로그아웃) 타이머 설정
    // 서버단에서도 session 비우는 세밀한 코드 추가로 필요 ***
    setTimeout(() => {
      localStorage.removeItem("userData");
      setUser(null);
      alert("재로그인 해주세요~");
      window.location.href = "/"; // 메인 화면으로 이동
    }, 60 * 60 * 1000) // 1시간 후
  }

  // 로그아웃 처리 함수
  const handleLogout = async() => {
    try {
      const resp = await axiosApi.get("/admin/logout");

      if(resp.status === 200) {
        localStorage.removeItem("userData");
        setUser(null);
      }
    }catch(error) {
      console.error("로그아웃 중 문제 발생 : ", error);
    }
  }

  // 자식(하위) 컴포넌트에게 전달할 데이터를 하나로 묶기
  const globalState = {
    user, // user(key이름) : user(State값) / key와 state가 같으면 그냥 user라고 써도 된다.
    email, 
    password,
    changeInputEmail,
    changeInputPw,
    handleLogin,
    handleLogout
  }

  return (
    <AuthContext.Provider value={globalState}>
      {children}  
      {/* <AuthContext.Provider> 값을 이용하는 컴포넌트는 AppComponent가 되는것과 똑같아 */}
    </AuthContext.Provider>
  )
}

// 브라우저에서 현재 로그인한 회원(관리자) 정보를 기억하도록 해야함.
// localStorage :
// - 브라우저를 닫아도 데이터가 영구적으로 유지
// - 브라우저 전역에서 사용(모든 탭과 창에서 공유됨)
// - 유효기간 만료 기능 없음

// sessionStorage :
// - 브라우저 탭 또는 창을 닫으면 데이터가 즉시 삭제
// - 현재 탭 또는 창에서만 데이터가 유지됨
// - 유효기간 만료 기능 없음