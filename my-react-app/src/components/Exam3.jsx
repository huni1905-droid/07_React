// 상태 내리꽂기 (Props Drilling) 
// : 부모가 가진 데이터를 자식에게 전달해서
// 자식이 사용할 수 있게끔 하는 것. 

import { useState } from "react"

// 부모 컴포넌트 
const Exam3 = () => {
  const [name, setName] = useState("홍길동");

  // 자식 컴포넌트 (Child1에 부모의 상태인 name값과 그냥 데이터 10을 
  // userName과 age라는 Key에 세팅하여 props를 통해 전달)
  return <Child1 userName={name} age={10} /> 
  // return 구문 안에 넣음으로써 부모-자식 관계 형성
  // return 구문이 한줄이라면 () 없이 몊에 한줄 쓸 수 있다
  
}

// 자식 컴포넌트
const Child1 = (props) => {
  
  return (
    <div>
      <p>나는 {props.userName} 입니다.</p>
      <p>나는 {props.age} 세 입니다.</p>

      <Child2 name={props.userName} /> 
      {/* key 이름 바뀜 */}
    </div>
  )
}

// 자식의 자식 컴포넌트
const Child2 = ({ name }) => {
  // props.name의 형태로 객체 자체로 받아와도 되고
  // props 객체 형태 대신 {key} 로 값을 꺼내올 수 있음
  // == props.name == {name}
  return <p>{name}</p>
}

export default Exam3;