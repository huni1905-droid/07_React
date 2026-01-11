import { Component } from "react";

// 클래스형 컴포넌트 Exam1 정의
class Exam1 extends Component {
  // React.Component 클래스를 상속받아 클래스형 컴포넌트 정의

  // 생성자 정의 
  // props 는 부모 컴포넌트로부터 전달받은 데이터
  constructor(props) {
    super(); // 부모 클래스(컴포넌트)의 생성자 호출

    // Exam1 컴포넌트에서 사용할 상태(state)를 정의
    // this.state : 클래스형 컴포넌트에서 컴포넌트의 상태(state)객체를 의미함.
    this.state = { count : 0 }; // state 중 count 상태값을 0으로 초기화
    
    console.log("생성자 호출");
  }

  // 생명주기 코드 

  // 컴포넌트가 처음 화면에 나타났을 때 수행되는 함수
  componentDidMount() {
    console.log("componentDidMount : 마운트 완료(태어남)");
  }

  // 해당 컴포넌트가 업데이트 될 때 (props나 state가 변경된 후)
  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate : 업데이트 완료");

    // prevProps : 업데이트가 발생하기 전 부모로부터 받은 데이터
    // prevState : 업데이트(상태)가 실행되기 전의 컴포넌트 내부 상태 값 
    console.log("이전 state : ", prevState.count );
    console.log("현재 state : ", this.state.count );
  }

  // 컴포넌트가 화면에서 제거될 때
  componentWillUnmount() {
    console.log("componentWillUnmount : 언마운트 완료(제거)")
  }

  // 클래스형 컴포넌트 문법으로 정의된 함수
  // 버튼 클릭 시 호출되는 이벤트 핸들러 함수
  handleClick = () => {
    // 상태 업데이트 : count 값을 기존 값 + 1 으로 업데이트
    this.setState({ count : this.state.count + 1 }); // key : value 꼴로 써주면 된다
  }

  // 렌더링 함수 . JSX 를 반환하여 화면에 UI 그린다(렌더링)
  render() {
    return (
      <div>
        <h1>Count : {this.state.count}</h1>
        <button onClick={this.handleClick}>증가 버튼</button> 
        {/* 해당객체(컴포넌트)의(this) handleClick이라는 함수를 작동하겠다 */}

        <h2>
          부모로부터 전달받은 값 : {this.props.jihun} {this.props.test}
          {/* 해당객체(this)의 부모로 부터 전달받은 값(props) key이름 jihun, test */}
        </h2>
      </div>
    );
  }
}

// 다른 파일에서 해당 파일(Exam1.jsx)의 기본으로 지정된 컴포넌트(Exam1)를
// 사용할 수 있도록 내보냄(수출함) 
export default Exam1;