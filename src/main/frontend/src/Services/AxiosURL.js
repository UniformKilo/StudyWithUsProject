import axios from "axios";

// const baseURL = '/api'
const baseURL = ''

// const user = localStorage.getItem('user')
// const before_user = JSON.parse(user)
// const id = before_user.id

class CommunityService {

    saveMember(data) {
        return axios.post(baseURL + "/join/members", data)
    }

    loginMember(data) {
        return axios.post(baseURL + "/login", data)
    }

    getMember(data) {

        if (localStorage.getItem('user')) {
            const user = localStorage.getItem('user')
            const before_user = JSON.parse(user)
            const id = before_user.id

            return axios.get(baseURL + `/members/${id}`, {headers: data})
        }

    }
    // 닉네임 변경
    ModificationNick(data, token) {

        if (localStorage.getItem('user')) {
            const user = localStorage.getItem('user')
            const before_user = JSON.parse(user)
            const id = before_user.id

            return axios.put(baseURL + `/members/${id}`, data, {headers: {authorization: token}})
        }


    }

    // 비밀번호 변경
    updatePwd(data, token) {

        if (localStorage.getItem('user')) {
            const user = localStorage.getItem('user')
            const before_user = JSON.parse(user)
            const id = before_user.id

            return axios.patch(baseURL + `/members/${id}`, data, {headers: {authorization: token}})
        }

    }

    // 회원삭제
    deleteUser(data, token){

        if (localStorage.getItem('user')) {
            const user = localStorage.getItem('user')
            const before_user = JSON.parse(user)
            const id = before_user.id

            console.log(token)
            console.log(data)
            return axios.delete(baseURL + `/members/${id}`, {headers: {authorization: token}, data:data})

        }
    }

    // 구글 소셜 로그인
    googleLogin(data) {
        return axios.post(baseURL + `/oauth/jwt/google`, data)
    }

    // 스터디 List 불러오기
    studyList(token) {
        return axios.get(baseURL + `/studies`, {headers: {authorization: token}})
    }

    // 스터디 생성
    studyCreate(data, token) {
        return axios.post(baseURL + `/join/studies`, data ,{headers: {authorization: token}})
    }

    savePost(data) {
        return axios.post(baseURL + "/board/register", data)
    }

    saveComment(data) {
        return axios.post(baseURL + "/comment/register", data)
    }

    //page 숫자는 추후 수정
    getList(category, page) {
         const data = {
             category: category,
             page: page
         }

         return axios.get(baseURL + "/board", {params: data});
    }

    getSearchList(category, type, keyword) {
        const data = {
            category: category,
            type: type,
            keyword: keyword
        }
        return axios.get(baseURL+"/board/search", {params: data});
    }

    // getFreeList(){
    //     return axios.get(baseURL+"/board",{ params: { category :'free',page: 1 } });
    //
    // }
    //
    // getNoticeList(){
    //     return axios.get(baseURL+"/board",{ params: { category :'notice', page:1 } });
    //
    // }
    //
    // getQNAList(){
    //     return axios.get(baseURL+"/board",{ params: { category :'question', page:1 } });
    //
    // }

    getEdit() {
        return axios.get(baseURL + "/board/edit")
    }

    postEdit(data) {
        return axios.post(baseURL + "/board/edit", data)
    }


    getBoardDetail(post_id){
        return axios.get(baseURL+`/board/${post_id}`);
    }

    deleteComment(data) {
        return axios.post(baseURL + `/comment/delete/${data}`)
    }
    // getFreeList(data) {
    //     return axios.post(baseURL + "/board/free", data)
    // }
    // getQuestionList(data) {
    //     return axios.post(baseURL + "/board/question", data)
    // }

    /*loginMember(data) {
        return axios.post(baseURL + "/login", data)
    }

    userSession(config) {
        return axios.get(baseURL + "/user", config)
    }*/

}

export default new CommunityService();