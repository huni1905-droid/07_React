import React, { useEffect, useState } from "react";
import { axiosApi } from "../api/axiosAPI";

const [withdrawnMembers, setwithdrawnMembers] = useState(null); // 탈퇴 회원 목록
// 삭제 게시글 목록
const [isLoading, setIsLoading] = useState(true);

// 탈퇴한 회원 목록 조회용 함수
const getWithdrawnMemberList = async() => {
  try {
    const resp = await axiosApi.get("/admin/withdrawnMemberList")

    if(resp.status === 200) {
      setwithdrawnMembers(resp.data);
    }
  } catch (error) {
    console.error("탈퇴 회원 목록 조회 중 에러 발생 : ", error)
  }
}


// 탈퇴한 회원 복구 요청 함수
const restoreMember = async(member) => {
  if(window.confirm(member.memberNickname + "님을 탈퇴 복구 시키시겠습니까?")) {
    try {
      const resp = await axiosApi.put("/admin/restoreMember", { memberNo : member.memberNo})
      if(resp.status === 200) {
        alert("복구 되었습니다!");
        getWithdrawnMemberList();
      }
    } catch (error) {
      console.error("탈퇴 회원 복구 중 에러 발생 :", error);
    }
  }
}


// 삭제된 게시글 목록 조회용 함수



// 삭제된 게시글 복구 요청 함수

// Restore 컴포넌트가 첫 마운트 될 때 실행
export default function Restore() {

useEffect( ()=> {
  getWithdrawnMemberList;
}, []);

// withdrawnMembers, deleteBoard 상태가 변경될 때 실행(isLoading 값 변경)
useEffect( () => {
  if(withdrawnMembers != null) {
    setIsLoading(false);
  }
}, [withdrawnMembers]);

if(isLoading) {
  return <h1>Loading...</h1>
} else{
  return (
    <div className="menu-box">
      <section className="section-border">
        <h2>탈퇴 회원 복구</h2>

        <h3>탈퇴한 회원 목록</h3>

        {withdrawnMembers.length === 0 ? (
          <p>탈퇴한 회원이 없습니다</p>
        ) : (
          withdrawnMembers.map((memberk, index) => {
           return (
            <ul className="ul-board" key={index}>
              <li>회원 번호 : {memberk.memberNo}</li>
              <li>회원 이메일 : {memberk.memberEmail}</li>
              <li>회원 닉네임 : {memberk.memberNickname}</li>
              <button className="restoreBtn"
              onClick={() => restoreMember() }  //-------------확인
              >복구</button>
            </ul>
           ) 
          })
        )}

      </section>

      <section className="section-border">
        <h2>삭제 게시글 복구</h2>

        <h3>삭제된 게시글 목록</h3>

      </section>
    </div>
  );

}
}
