import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Exam1 from './components/Exam1'
import Exam2 from './components/Exam2'
import Exam3 from './components/Exam3'
import Exam4 from './components/Exam4'
import Exam5 from './components/Exam5'
import Exam6 from './components/Exam6'
import Exam7 from './components/Exam7'
import TodoList from './components/TodoList'

function App() {
  // js 주석 사용 가능 
  //const [count, setCount] = useState(0)
  const [showExam, setShowExam] = useState(true); 
  // showExam이라는 상태의 초기값이 true/ setShowExam이라는 함수

  return (
    // return 구문 안에는 js 주석 사용 가능 (태그 밖에서는)
    // js 단일 주석
    /* js 범위 주석 */

    // <></> : fragment (html 역할 x, 특별히 감쌀 태그 없을때 사용하면 된다)
    <>
      {/* jsx 주석 - 단축키 : ctrl + /  */}
      {/* 태그 안에서는 jsx주석 사용해야 한다.  */}
      {/* <h1>안녕하세요</h1>
      <button onClick={ () => setShowExam(!showExam)}>클릭</button>
      {showExam && <Exam2 jihun="hello" test="world" />}  */}
      {/* 조건부 렌더링 : 조건에 따라 렌더링되는 방법
        && 앞에있는 showExam이 true 면 Exam2 렌더링
                              false 면 Exam2 렌더링 되지 않음
        
        App이라는 부모가 Exam1이라는 자식에게 물려주는 값(데이터) : jihun="hello"
                                                    상태 : jihun={showExam}                             
      */}
      {/* <Exam3 /> */}
      <TodoList />
      
      {/* <Exam7 /> */}
    </>
  )
}

export default App
