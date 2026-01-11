// JSX 예제
import test1 from "../assets/짱구.jpg";

const Exam5 = () => {
  return <Exam5_5 />
}

// JSX 예제 1 : 자바스크립트 변수로 사용하기
const Exam5_1 = () => {
  const name = "React";
  const element = <h1>Hello, {name}</h1>;

  return element;
}

// JSX 예제 2 : img 태그 이미지 사용
const Exam5_2 = () => {
  return <img src={test1} />
}

// JSX 예제 3 : 로그인 여부에 따라 화면 다르게 보이기 (if else 문)
const Exam5_3 = () => {
  if(true) {
    return <h1>환영합니다~!</h1>
  } else {
    return <h1>로그인해주세요</h1>
  }
}

// JSX 예제 4 : 로그인 여부에 따라 화면 다르게 보이기 (삼항 연산자)
const Exam5_4 = () => {
  // JS 영역 -> if-else 사용 가능
  // JSX 영역 -> 삼항연산자 사용
  return <h1>{ false ? '환영합니다!' : '로그인 바람'}</h1>
}

// JSX 예제 5 : 배열을 이용한 화면 렌더링 방법(***중요 : 자주사용!!!***)
// 클라이언트(React) <-> 서버(SpringBoot)
// 서버에서 응답받은 데이터는 대부분 배열(List) 형태
const Exam5_5 = () => {
  // 서버에서 아래 배열을 응답받았다고 가정
  const members = ["짱구", "유리", "철수", "훈이", "맹구"];

  // JS 내장 함수 중 배열의 요소에 하나씩 순차접근해서 콜백함수 내에 있는 내용 수행 후
  // 새로운 배열을 만들어 반환 -> map
  const listItem = members.map((member, index) => <li key={index}>{member}</li>);
  // [ <li>짱구</li>, <li>유리</li>, <li>철수</li>, <li>훈이</li>, <li>맹구</li> ]

  // 한 줄일 경우 => <li></li>로 쓸 수있고 
  // 여러 줄 일 경우에는 아래와 같이 쓰는 것이 맞다. 중괄호 썼는데 return이 없으면 화면상에 렌더링 안됨!!
  // return(
  // <div>
  //    <li></li>
  // </div>
  // )        

  // Each child in a list should have a unique "Key" prop
  // -> React 에서 동적으로 list를 렌더링 할 때
  // 각 자식 컴포넌트가 고유한 key 속성을 가져야한다는 규칙 위배시 발생하는 경고!
  // 고유한 key 값을 작성하면 경고 해결
  return <ul>{listItem}</ul>;
}

export default Exam5;