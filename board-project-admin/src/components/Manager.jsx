import React, { useEffect, useState } from "react";
import { axiosApi } from "../api/axiosAPI";

export default function Manager() {
  // 이메일, 닉네임, 전화번호 
  // 객체 하나로 상태 관리하는 방식
  const [form, setForm] = useState({ email: "", nickname: "", tel: "" });
  const [accountList, setAccountList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 서버에서 로딩중이라고 초기값 세팅

  // 객체형태인 상태 form 변경 함수
  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  }

  // 관리자 계정 발급 비동기 요청 함수
  const createAdminAccount = async () => {
    const { email, nickname, tel } = form; // form 상태 안에 있는 값들 하나씩 꺼내오기

    if (email.length === 0 || nickname.length === 0 || tel.length === 0) {
      alert("모든 필드를 입력해주세요!");
      return;
    }

    try {
      const response = await axiosApi.post("/admin/createAdminAccount", {
        memberEmail: email,
        memberNickname: nickname,
        memberTel: tel
      });

      if (response.status === 201) {
        const result = response.data; // 서버에서 응답해준 데이터(body - 비밀번호)
        alert(`발급된 비밀번호는 ${result} 입니다. 다시 확인할 수 없으니 저장해주시길 바랍니다.`);
        console.log(result);
      }

      // 입력필드 초기화
      setForm({ email: "", nickname: "", tel: "" });

    } catch (error) {
      console.error(error);
    }

  }

  // 관리자 계정 목록 조회
  const getAdminAccountList = async () => {
    try {
      const response = await axiosApi.get("/admin/adminAccountList");

      if (response.status === 200) {
        setAccountList(response.data);
      }

    } catch (error) {
      console.error("관리자 계정 목록 조회 중 에러 발생 : ", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAdminAccountList();
  }, []);


  return (
    <>
      <div className="manager-div">
        <section className="manager-section">
          <h2>관리자 계정 발급</h2>
          <table>
            <tr>
              <td>사용할 이메일 : </td>
              <td>
                <input
                  id="email"
                  type="email"
                  placeholder="ex) admin2@kh.or.kr"
                  value={form.email}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>사용할 이름 : </td>
              <td>
                <input
                  id="nickname"
                  type="text"
                  placeholder="ex) 관리자2"
                  value={form.nickname}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>사용할 전화번호 : </td>
              <td>
                <input
                  id="tel"
                  type="text"
                  placeholder="ex) 01012341234"
                  value={form.tel}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </table>
          <button className="issueBtn" onClick={createAdminAccount}>
            발급
          </button>
        </section>

        {isLoading ? (<h1>Loading...</h1>) : (

          <section className="manager-section">
            <h2>관리자 계정 목록</h2>
            <table className="manager-list-table" border={1}>
              <thead>
                <tr>
                  <th>회원번호</th>
                  <th>이메일</th>
                  <th>관리자명</th>
                  <th>관리자연락처</th>
                </tr>
              </thead>

              <tbody>
                {
                  accountList.length === 0 ? (
                    <tr>
                      <td colSpan="4" style={{ textAlign: "center" }}>
                        데이터가 없습니다.
                      </td>
                    </tr>
                  ) : (
                    accountList?.map((member) => (
                      <tr key={member.memberNo}>
                        <td>{member.memberNo}</td>
                        <td>{member.memberEmail}</td>
                        <td>{member.memberNickname}</td>
                        <td>{member.memberTel}</td>
                      </tr>
                    ))
                  )
                }
              </tbody>
            </table>
          </section>

        )}

      </div>
    </>
  );
}