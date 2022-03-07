import React, { useState, useEffect, useRef, useCallback } from 'react'
import Camera from '../components/Camera'
import Modal from '../components/Modal'
import { useRouter } from "next/router";
import axios from 'axios';


function capture() {

  const [showModal, setShowModal] = useState(true);
  const [files, setFiles] = useState();
  const [preview, setPreview] = useState('');

  const imageRef = useRef(null);

  useEffect(() => {
    if(files) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result)
        localStorage.setItem("image", preview);
        // moveFoodInfo();
      }
      reader.readAsDataURL(files)
    }
  },[files]) 


  const closeModal = () => {
    setShowModal(false);
  }
  
  const onLoadFile = (e) => {
    const file = e.target.files[0];
    setFiles(file)

  }

  const router = useRouter();

  const moveFoodInfo = () => {
      router.push({
          pathname: '/foodinfo',
      })
  }

  return (
    <div className="container mx-auto h-screen bg-slate-50 rounded-3xl">
        <div className="">
            {showModal ? <Modal closeModal={closeModal}/> : null}
              <div className="text-white bg-main/30 p-2 pd-8 rounded-3xl">
                <Camera/>
                <input type="file" ref={imageRef} className="file" accept='jpg, jpeg, png, gif' onChange={onLoadFile}/>
                <p>{preview}</p>
              </div>
        </div>
    </div>
  )
}

export default capture


