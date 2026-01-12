// SpringBoot 서버로, React 클라이언트와 서로 요청/응답 주고받는 예제

import { useState } from "react";

const Exam7 = () => {
  const [portMsg, setPortMsg] = useState(null);
  const [userMsg, setUserMsg] = useState("");

  const getPortNumber = () => {
    // React에서는 비동기요청으로만 보낸다

    //fetch("member/getMemger")와 같이 작성하면 
    // localhost:8080으로 보낸다는 의미
    fetch("http://localhost/getPortNumber") // 요청보낼 서버 경로
    // http의 기본 포트번호가 80이라서 localhost뒤에 안 붙는다.
    .then(res => res.json())
    .then(data => {
      setPortMsg(data);
    })
  }

  const getUserInfo = () => {
    fetch("http://localhost/getUserInfo", {
      method : "post",
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify({ name: "홍길동", age: 20}) //JSON에 실어서 서버에 보내겠다
    })
    .then(res => res.text())
    .then(data => setUserMsg(data));
  }

  return (
    <div>
      <p>1. 서버로부터 응답 받은 값(GET방식)</p>
      <button onClick={getPortNumber}>GET 요청 보내기</button>
      <ul>{portMsg?.map((msg, idx) => (
        <li key={idx}>{msg}</li>
      ))}</ul>
      {/* 
      아무 괄호 없이 내용 쓰면 한줄 내용 쓸 수 있다
      ()쓰면 return 안 쓰고 여러 줄 쓸 수 있다.
      {}쓰면 무조건 return 써줘야 한다.
      */}

      <p>2. 서버로 값 전달 후, 응답 받은 값(POST방식)</p>
      <button onClick={getUserInfo}>POST 요청 보내기</button>
      <p>{userMsg}</p>
    </div>
  )
} 

export default Exam7;


