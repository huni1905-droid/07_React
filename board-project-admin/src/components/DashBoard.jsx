import React from 'react';
import '../css/DashBoard.css';
import Restore from './Restore.js';
import Manager from './Manager.js';
import Statistics from './Statistics.js';

export default function DashBoard() {

  return (
      <div className='dash-board-container'>
        <h1>관리자 페이지</h1>

        <div className='admin-info'>
          <p>현재 접속 관리자 : </p>
          <button>로그아웃</button>
        </div>

        <ul className='tab-box'>
          <li className="active" >복구</li>
          <li >통계</li>
          <li >관리자 메뉴</li>
        </ul>

      </div>
  )
}