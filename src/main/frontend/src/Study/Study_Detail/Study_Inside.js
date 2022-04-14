import React, {useEffect, useState} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import '../Css/Study_Detail.css';
import '../../Board/Write_Details/Details.css';
import '../../App.css';
import Study_Info from "./Study_Info";
import StudyBoardDetail from "./Study_Board_Detail";
import AxiosURL from "../../Services/AxiosURL";
import $ from 'jquery';

function Study_Inside(){

    const token = JSON.parse(localStorage.getItem('user-info'))

    let beforeStudyId = String((String(window.location.pathname).toString())).split("/studies/");
    let studyId = beforeStudyId[1]


    useEffect(() => {

        AxiosURL.isMember(studyId, token.authorization)
            .then((response) => {
                console.log(response)
            }).catch(error => {
                console.log(error)
        })

        AxiosURL.pullBoard(studyId, token.authorization)
            .then((response) => {
                console.log(response)
            }).catch(error => {
                console.log(error)
        })

        setTimeout(() => {
            $('.study_inside_container').css('opacity', '1');
        }, 300);

        },[])

    const _handleSubmit = e => {
        e.preventDefault();

        $('.study_inside_container').css('opacity','0');

        setTimeout(() => {
            AxiosURL.joinMember(studyId, token.authorization)
                .then((response) => {
                    console.log(response)
                    window.location.reload()
                }).catch(error => {
                console.log(error)
            })
        });
    }




const history = useHistory();
    return (
        <div className="Study_Detail">
            <div className="study_inside_container">
                <Study_Info />
                <div className="study_inside_container_right">
                    <div className="study_go_back" onClick={()=> history.push('/Study_List')}>스터디목록 > </div>
                    <div className="board_con_top">
                        <div className="top_txt">
                            게시글
                        </div>
                        <button type="submit" id="study_write_input"
                                onClick={(e) => _handleSubmit(e)}
                        >
                            가입
                        </button>
                        <button type="submit" id="study_write_input" value="글씨기">
                            <Link to={`/Study_Write/${studyId}`} className="link">
                                글쓰기
                            </Link>
                        </button>
                    </div>
                    <div className="study_board_container">
                        <table className="study_board">
                            <thead>
                            <tr id="board_head">
                                <th width="10%" className="listHeadNum">No.</th>
                                <th width="50%" className="listHeadTitle">제목</th>
                                <th width="15%" className="listHeadAuthor">작성자</th>
                                <th width="15%" className="listHeadDate">작성날짜</th>
                                <th width="10%" className="listHeadViews">조회</th>
                            </tr>
                            </thead>
                            <tbody>

                            <tr id="board_body" >

                                <td width="10%" className="listTableNum">1</td>
                                <td width="50%" className= "listTableTitle">
                                    <Link to ="/Study_Board_Detail" className="link">
                                        가입인사 드립니다
                                    </Link>
                                </td>
                                <td width="15%" className="listTableAuthor">하이</td>
                                <td width="15%" className="listTableDate">2022-03-25</td>
                                <td width="10%" className="listTableViews">5</td>
                            </tr>



                            {/*                    <tr id="board_body">
                        <td width="10%" className="listTableNum"></td>
                        <td width="90%" className="listNoData">작성된 글이 없습니다</td>
                    </tr>*/}


                            </tbody>
                        </table>
                    </div>





                </div>
            </div>
        </div>
    );
};

export default Study_Inside;