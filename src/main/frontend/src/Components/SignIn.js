import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import AxiosURL from "../Services/AxiosURL";
import GoogleLogin from "react-google-login";
import {alignPropType} from "react-bootstrap/types";


const SignIn = () => {

    useEffect(() => {
        if(localStorage.getItem('user-info'))
        {
            history.push("/")
        }
    }, []);

    const { register, formState: {errors}, handleSubmit } = useForm({mode:"onChange"});


    // 페이지 이동 submit
    const history = useHistory();

    // 로그인 axios DB 연동
    const onSubmit = (data) => {

        AxiosURL.loginMember(data)
            .then((response) => {
                console.log(response)
                const user = JSON.stringify(response.data.data) // 유저
                localStorage.setItem("user", user)
                localStorage.setItem("user-info", JSON.stringify(response.headers))

                // 유저 데이터 정보 가져오기
                AxiosURL.getMember({authorization: response.headers.authorization})
                    .then(res => {
                        localStorage.setItem("user-data",JSON.stringify(res.data.data))
                        // 로그인 성공시 초기화면으로
                        history.push("/")
                        window.location.reload()
                    }).catch(error => {
                    console.log("getMember error")
                })

            }).catch(error => {
            console.log(error)
            alert(JSON.stringify("회원정보를 다시 확인해주세요")) // 나중에 모달창으로 교체예정
        })
    }

    const successGoogle = (response) => {
        console.log(response.profileObj)
        console.log(response)

        AxiosURL.googleLogin(response.profileObj)
            .then(response => {
                console.log(response)
            })


    }

    const failGoogle = (response) => {
        console.log(response)
    }

    return (

            <div>
                <br/><br/>
                <form onSubmit={handleSubmit(onSubmit)} >

                    <h3>로 그 인</h3>
                    &nbsp;
                    <label>Email</label>
                    <input
                        className="signInput"
                        name="email"
                        type="email"
                        {...register("email",
                            {required:true, pattern: /^\S+@\S+$/i})}
                    />
                    {/*{errors.email && <p>ex) studywithus@gmail.com</p>}*/}


                    <label>Password</label>
                    <input
                        className="signInput"
                        name="password"
                        type="password"
                        {...register("password",
                            {required: true, minLength: 8})}/>
                    {/*{errors.password && errors.password.type === "required" && <p>비밀번호를 입력해주세요.</p>}
                    {errors.password && errors.password.type === "minLength" && <p>비밀번호는 8글자 이상으로 가능합니다.</p>}*/}


                    <input type="submit" className="signInput"></input>
                </form>
                <GoogleLogin clientId="704381193446-349afdg31g6ar46i05qlquh7n37hq8ui.apps.googleusercontent.com"
                             buttonText="Google"
                             onSuccess={successGoogle}
                             onFailure={failGoogle}
                             cookiePolicy={'single_host_origin'}
                             />
            </div>

    );
};

export default SignIn;