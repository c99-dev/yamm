import React , { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { signUpRequestAction } from '../../../reducers/user';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import ReactLoading from "react-loading";
import lottie from 'lottie-web';

const SignUpModal = ({ isSetSignUpModal }) => {
    
    const checkAnimation = useRef(null);
    const dispatch = useDispatch();
    const { signUpError, signUpDone } = useSelector((state) => (state.user)) 
    const [inputValue, setInputValue] = useState({
      "email" : "",
      "password1" : "",
      "password2" : "",
      "name" : "",
      "nickname" : "",
      "phonenumber" : "",
      "taste" : "",
    });
    const initErrorMessage = {
      "emailToggle" : false,
      "password1Toggle" : false,
      "password2Toggle" : false,
      "nicknameToggle" : false,
      "phonenumberToggle" : false,
      "profile_imgToggle" : false,
      "non_field_errorsToggle" : false,
      "email" : "",
      "password1" : "",
      "password2" : "",
      "nickname" : "",
      "phonenumber" : "",
      "profile_img" : "",
      "non_field_errors" : ""
    }
    const [signUpErrorMessage, setSignUpErrorMessage] = useState(initErrorMessage);
    const onChange = (e) => {
      setInputValue({
        ...inputValue,
        [e.target.id] : e.target.value 
      });
    }

    const [imageFile, setImageFile] = useState(null);
    const handleImage = (event) => setImageFile(event.target.files[0])

   

    const submitFuction = async (e) => {
        e.preventDefault()
      
        const formData = new FormData();
        formData.append("email", inputValue["email"]);
        formData.append("password1", inputValue["password1"]);
        formData.append("password2", inputValue["password2"]);
        formData.append("name", inputValue["name"]);
        formData.append("nickname", inputValue["nickname"]);
        formData.append("phonenumber", inputValue["phonenumber"]);
        formData.append("taste", inputValue["taste"]);
        formData.append("profile_img", imageFile); // 이미지 파일 추가

        for(var pair of formData.entries()) console.log(pair);  // formdata 프론트 쪽에서 확인
        dispatch( signUpRequestAction( formData ) );
    }
    useEffect(()=>{
      if(signUpDone ) {
        setTimeout(() => {
          isSetSignUpModal(false);
        }, 1100);
      }
    }, [signUpDone])

    useEffect(()=>{
      lottie.loadAnimation({
        container: checkAnimation.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: require("../../../public/check.json")
      });
    },[]);

    useEffect(()=>{ // error message useState에 넣는 함수
      console.log(signUpError, "signup-errorr")
      let value = "";
      let data = {}
      setSignUpErrorMessage(initErrorMessage);
      for(value in signUpError){
        // console.log(value);
        // console.log(signUpError[value][0]); 
        data[value+"Toggle"] = true;  
        data[value] = signUpError[value][0]
      }
      setSignUpErrorMessage((prevState) => ({
        ...prevState,
        ...data
      }));
    }, [signUpError])
    return (
      
        <div onClick={(e)=>{isSetSignUpModal(false)}} className="w-screen h-screen inset-0 absolute bg-gray-200 bg-opacity-75">
          {/* 왜 버블링 안되지? 나중에 확인 */}
          <form onSubmit={submitFuction} onClick={(e)=>{e.stopPropagation();}} className="bg-white w-5/6 h-3/6 shadow-md px-8 pt-6 pb-8 mb-4 overflow-scroll fixed p-5 rounded-xl left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              
              <div className="mb-4">
                <label className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-gray-700 text-sm font-bold mb-2"  htmlFor="username">
                  이메일
                </label>
                <input onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none  focus:border-yellow1 focus:ring-yellow1 focus:border-2 focus:shadow-outline" id="email" type="text" placeholder="yammm@gamil.com"></input>
                { signUpErrorMessage["emailToggle"] && <p className="text-red-500 text-xs italic"> {signUpErrorMessage["email"]} </p> }
              </div>
              <div className="mb-4">
                <label className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  패스워드
                </label>
                <input onChange={onChange} className="shadow appearance-none border focus:outline-none focus:border-yellow1 focus:ring-yellow1 focus:border-2 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:shadow-outline" id="password1" type="password" placeholder="******************"></input>
                { signUpErrorMessage["password1Toggle"] && <p className="text-red-500 text-xs italic"> {signUpErrorMessage["password1"]} </p> }
                { signUpErrorMessage["non_field_errorsToggle"] && <p className="text-red-500 text-xs italic"> {signUpErrorMessage["non_field_errors"]} </p> }

              </div>
              <div className="mb-4">
                <label className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  패스워드 확인
                </label>
                <input onChange={onChange} className="shadow appearance-none border focus:outline-none focus:border-yellow1 focus:ring-yellow1 focus:border-2 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:shadow-outline" id="password2" type="password" placeholder="******************"></input>
                { signUpErrorMessage["password2Toggle"] && <p className="text-red-500 text-xs italic"> {signUpErrorMessage["password2"]} </p> }
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  이름
                </label>
                <input onChange={onChange} className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-yellow1 focus:ring-yellow1 focus:border-2  focus:shadow-outline" id="name" type="text" placeholder="000" ></input>
              </div>
              <div className="mb-4">
                <label className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  별명
                </label>
                <input onChange={onChange} className="shadow appearance-none border focus:border-yellow1 focus:ring-yellow1 focus:border-2  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="nickname" type="text" placeholder="nickname"></input>
                { signUpErrorMessage["nicknameToggle"] && <p className="text-red-500 text-xs italic"> {signUpErrorMessage["nickname"]} </p> }
              </div>
              <div className="mb-4">
                <label className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  사진
                </label>
                <input onChange={handleImage} className="shadow appearance-none border focus:border-yellow1 focus:ring-yellow1 focus:border-2 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="image" type="file" placeholder="사진을 입력해 주세요"></input>
                { signUpErrorMessage["profile_imgToggle"] && <p className="text-red-500 text-xs italic"> {signUpErrorMessage["profile_img"]} </p> }
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  음식 취향
                </label>
                <input onChange={onChange} className="shadow appearance-none border focus:border-yellow1 focus:ring-yellow1 focus:border-2  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="taste" type="text" placeholder="ex) 한식, 중식, 일식"></input>
                
              </div>
              <div className="mb-4">
                <label className="block after:content-['*'] after:ml-0.5 after:text-red-500 text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  휴대폰 번호
                </label>
                <input onChange={onChange} className="shadow appearance-none border focus:border-yellow1 focus:ring-yellow1 focus:border-2  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="phonenumber" type="text" placeholder="000-0000-0000"></input>
                { signUpErrorMessage["phonenumberToggle"] && <p className="text-red-500 text-xs italic"> {signUpErrorMessage["phonenumber"]} </p> }
              </div>
          
              <div className="flex items-center justify-center ">
                { signUpDone ? 
                  ( <div>
                      <p className=' text-yellow1'> 회원가입이 완료되었습니다 !</p>
                        <div className='w-full flex justify-center '>
                          <div className='max-h-[50px] max-w-[50px]' ref={checkAnimation}></div>
                        </div>
                    </div>
                     ) :
                  ( <button className="bg-yellow1 active:bg-red1 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                      회원가입
                    </button> )
                }
              </div>
          </form>
        </div>
    );
};

export default SignUpModal;