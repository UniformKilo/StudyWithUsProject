import './Details.css';
import {Link, useHistory} from 'react-router-dom';
import 'moment/locale/ko';
import moment from "moment";
import React, {useEffect, useState} from "react";
import axios, {Axios} from "axios";
const baseURL = ''

const user = JSON.parse(localStorage.getItem('user-info'))
function Free_Detail({match}){


    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [nickname, setNickname] = useState('')
    const [date, setDate] = useState('')
    const [view, setView] = useState('')

    const post_id = match.params;
    console.log('post_id :: ', post_id);

    useEffect(async ()=>{
        try{
            const res = await axios.get(baseURL+ '/FreeDetail',{
                params:{
                    'post_id' : post_id
                }
            })
            setTitle(res.data[0].title)
            setContent(res.data[0].content)
            setNickname(res.data[0].writer_nickname)
            setDate(res.data[0].regDate.substr(0, 10))
            setView(res.data[0].views)
        } catch (e){
            console.error(e.message)
        }
    },[])




 /*   getBoardDetail(){
        return axios.get(baseURL+"/board",{ params: {  'post_id': post_id} });

    }*/

    const history= useHistory();

    //현재 날짜와 시간
    const nowTime = moment().format('YYYY/MM/DD');


    //답변 위치로 스크롤
    let ref1 = React.useRef();
    function scrollTo(ref1) {
        if (!ref1.current) return;
        ref1.current.scrollIntoView({ behavior: "smooth" });
    }





//===============================================================
    const [no, setNo] =useState(2);

    const [post, setPost] =useState({
        id:no,
        content:'',
    })

    const[posts, setPosts]= useState([
        {id:1, content:"나는 첫번째 댓글~"}
    ]);

    const handleWrite = () => {
        setPosts([...posts, { ...post, id: no }]);
        setNo(no + 1);
        post.content=''

    };

    const handleForm=(e)=>{
/*
        console.log(e.target.name);
        console.log(e.target.value);
*/

        //computed property names 문법 (키값 동적할당)
        setPost({
            ...post,
            [e.target.name]:e.target.value,
        });
    }
    const handleDelete =(id)=>{
        setPosts(posts.filter((post)=>post.id !==id));
    };



    //좋아요 누르기(추후에 수정해야함)
    const[num, plusNum] = useState(0);
    const ClickLike=()=>plusNum(num+1);

/*
    const ClickLike = () => {
        if (document.getElementById('id') !== undefined && pwd) {
            Axios
                .get('url', param)
                .then(res =>
                if (res === null || res === undefined) {
                alert(error)
            } else {
                plusNum(num+1);
            }
        }
    }
*/


    return(
        <div className="Free_Detail">

            <div className="mid_con">
                <fieldset className="detail_field">
                    <div className="buttons_field">
                    <div className="go_back" onClick={()=> history.push('/FreeList')}>자유게시판 > </div>
                        {localStorage.getItem('user-info') ?
                            <>
                            <div className="user_only_buttons">
                        <div className="detail_delete">삭제</div>
                        <Link to ="/Update_Detail" className="link">
                            <div className="detail_update">수정</div>
                        </Link>
                            </div>
                            </>
                            :
                            <></>
                        }
                    </div>
                    <p className="detail_title">{title}</p>
                    <div className="user_con">
                        <span className="circle">
                             <img className="default_img" alt="default" src="img/default.png" />
                        </span>
                        <div className="user_info">
                            <div className="detail_id">{nickname}</div>
                            <div className="detail_time">{date}</div>
                        </div>
                        <div className="user_right">
                            <div className="views">
                                <div className="view_num">{view}</div>
                            </div>
                            <div className="comment_button" onClick={() => scrollTo(ref1)}>
                                <img className="comm_img" alt="com_img" src="img/comment.png" />
                                <div className="comment">댓글</div>
                            </div>

                        </div>
                        </div>

                    <hr />

                    <div className="content_field">
                        {content}
                    </div>

                    <div className="user_bottom">
                        <div className="comment_button_bottom" >
                            <img className="comm_img_bottom" alt="com_img" src="img/comment.png"/>
                            <div className="comment_bottom">댓글 수</div>
                        </div>
                        <div className="heart_img_bottom">
                            <img id="empty_heart" className="heart_bottom" alt="heart"
                                 src="img/empty_heart.png" onClick={() => { ClickLike(); }} />
{/*
                           onClick={() => { ClickLike(); func2();}}*/}
                            <div className="like_bottom" >좋아요 {num}</div>
                        </div>
                    </div>


                    <hr />
                    <div className="reply_input" ref={ref1}>
                        <div className="reply_id">
                            여기는 아이디
                        </div>
                        <textarea className="reply_textarea" placeholder="댓글을 남겨 보세요" value={post.content}
                        onChange={handleForm} name="content"
                          onKeyPress={event => {
                              if (event.code === "Enter") {
                                  event.preventDefault();
                                  handleWrite();}
                          }}
                        />
                        <button type="button" className="reply_enter" onClick={handleWrite}> 등록 </button>

                    </div>
                    <ul className="comment_list">
                        <li className="comment_view">
                            {posts.map((post,idx)=>(
                            <div className="comment_area" key={idx}>
                                <div className="comment_img">
                                    <span className="circle">
                                        <img className="default_img" alt="default" src="img/default.png" />
                                     </span>
                                </div>

                                    <div className="comment_box">
                                        <div className="comment_division">
                                            <div className="comment_id">{post.id}</div>
                                            <div className="comment_txt">{post.content}</div>
                                            <div className="comment_time">{nowTime}</div>
                                            <hr />
                                        </div>
                                    </div>
                                <div className="x_sign" onClick={()=>handleDelete(post.id)}>
                                    x
                                </div>


                            </div>
                            ))}
                        </li>
                    </ul>

                </fieldset>

            </div>

        </div>
    );
}

export default Free_Detail;