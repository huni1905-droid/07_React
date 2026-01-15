import React, { useEffect, useState }  from "react";
import { axiosApi } from "../api/axiosAPI";

export default function Statistics() {
  const [readCountData, setreadCountData] = useState(null);
  const [likeCountData, setlikeCountData] = useState(null);
  
  const [isLoading, setIsLoading] = useState(true);

  // 가장 조회수 많은 게시글
  const getMaxReadCount = async() => { // 비동기 요청(async-await 세트)
    try {
      const resp = await axiosApi.get("/admin/maxReadCount");
      // axiosApi : http://~ 인 긴 주소가 아닌 주소 잛게 쓰기 위해서 Axios 인스턴스 미리 설정해둠
      // get("/admin/maxReadCount") : get 방식으로 이 주로로 요청을 보낸다.

      if(resp.status === 200 ){
        // resp 구조 : 서버가 응답을 보내면 Axios는 단순히 데이터만 주는 게 아니라 아래와 같은 큰 보따리를 줍니다.
        //            - resp.status: 상태 코드 (200, 404, 500 등)
        //            - resp.headers: 서버가 보낸 헤더 정보
        //            - resp.data: 우리가 진짜 필요로 하는 실제 데이터 (조회수 정보 등)

        // 상태에 셋팅
        setreadCountData(resp.data);
      }
      
    } catch (error) {
      console.error("최대 조회 수 게시글 조회 중 예외 발생 : ", error);
    }
  }

  // 가장 좋아요수 많은 게시글
  const getMaxLikeCount = async() => {
    // -------------------직접 작성해보기
    try {
      const resp = await axiosApi.get("admin/maxLikeCount"); 

      if(resp.status === 200 ){
        setlikeCountData(resp.data);
      }
    } catch (error) {
      console.error("최대 좋아요 수 게시글 조회 중 예외 발생 : ", error);
    }
  }

  // 가장 댓글 많은 게시글
  const getMaxCommentCount = () => {
    // -------------------직접 작성해보기
  }

  // 컴포넌트가 처음 마운트될 때 1번 실행
  useEffect( () => {
    getMaxReadCount();
    getMaxLikeCount();
    //getMaxCommentCount();
  }, []); // 의존성 배열이 비어있기 때문에 1번ㅁ나 실행됨 

  // readCountData, likeCountData, commentCountData 상태에 변화가 감지될 때
  // -> isLoading 상태값을 false로 변경하기
  useEffect(() => {
    if(readCountData != null && getMaxLikeCount != null) {
      setIsLoading(false); 
    }

  }, [readCountData]); // 의존성배열 readCountData, likeCountData, commentCountData 값의 
                       // 변화가 감지될 때마다 useEffect 수행하겠다

  if(isLoading) {
    return <h1>Loading...</h1>
  } else {
    return (
      <div>
        <section className="statistics-section">
          <h2>가장 조회수 많은 게시글</h2>
          <p>게시판 종료 : {readCountData.boardName}</p>
          <p>게시글 번호/제목 : {readCountData.boardNo} / {readCountData.boardTitle}</p>
          <p>게시글 조회 수 : {readCountData.readCount}</p>
          <p>작성자 닉네임 : {readCountData.memberNickname}</p>
        </section>
  
        <section className="statistics-section">
          <h2>가장 좋아요수 많은 게시글</h2>
          <P>게시판 종류 : {}</P>
          <P>게시판 번호/제목 : {} / {}</P>
          <P>게시판 좋아요 수 : {}</P>
          <P>게시판 닉네임 : {}</P>
        </section>
  
        <section className="statistics-section">
          <h2>가장 댓글 많은 게시글</h2>
        </section>
      </div>
    );
  }

  }

