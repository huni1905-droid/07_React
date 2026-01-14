// SpringBoot 서버로, React 클라이언트와 서로 요청/응답 주고받는 예제

import { useState } from "react";

const Exam7 = () => {
  const [portMsg, setPortMsg] = useState(null);
  const [userMsg, setUserMsg] = useState("");

  const getPortNumber = () => {
    // React에서는 비동기요청으로만 보낸다

    //fetch("member/getMemger")와 같이 작성하면 
    // localhost:8080으로 보낸다는 의미
    fetch("http://localhost/getPortNumber") // 요청보낼 서버 경로(주소는 풀네임으로 써줘야 한다)
    // http의 기본 포트번호가 80이라서 localhost뒤에 안 붙는다.
    .then(res => res.json()) // 서버에서 반환하는 타입이 단일 값이 아니라서 json으로 받아줘야 한다
    .then(data => {
      setPortMsg(data);
    })
  }

  const getUserInfo = () => {
    fetch("http://localhost/getUserInfo", { // 주소는 풀네임으로 써줘야 한다
      method : "post",
      headers : {"Content-Type" : "application/json"}, // body에 JSON타입의 데이터를 넘겨주겠다
      body : JSON.stringify({ name: "홍길동", age: 20}) //JSON에 실어서 서버에 보내겠다
    })
    .then(res => res.text())
    .then(data => setUserMsg(data));
  }

  return (
    <div>
      <p>1. 서버로부터 응답 받은 값(GET방식)</p>
      <button onClick={getPortNumber}>GET 요청 보내기</button>
      <ul>{portMsg?.map((msg, idx) => ( // .map : 안에 있는 요소를 하나하나 꺼내와 원하는 일들을 수행하고 새로운 배열로 반환하는 애
                                        // .map([하나하나 꺼내온 요소 자리], [현재 접근중인 요소의 인덱스])
        <li key={idx}>{msg}</li> // key라는 속성 없어도 안 굴러가는 것은 아니지만 서버콘솔창에 에러는 뜬다
                                  // map 함수를 사용해 리스트를 렌더링할 때, 
                                  //  key 속성은 **반환되는 엘리먼트 중 가장 바깥에 있는 최상위 태그(루트 엘리먼트)**에 반드시 있어야 합니다.
                                  // .앞에 ? 있으면 -> 안전탐색 연산자 -> ?앞의 값이 null이 아닌때만 뒤에 함수에 접근한다.
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


