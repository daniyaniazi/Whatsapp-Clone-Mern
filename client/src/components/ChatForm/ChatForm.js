import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faPaperclip, faSmile } from "@fortawesome/free-solid-svg-icons";
import './ChatForm.scss'
import { postRequest } from "./../../utils/apiRequest";
import { BASE_URL, UPLOAD_AUDIO, UPLOAD_IMAGE_FILE } from "./../../utils/apiEndpoints";



const ChatForm = ({ sendMsg, sendTyping }) => {

    const [msg, setMsg] = useState('');
    const [record, setRecord] = useState(false);

    const handleChange = (e) => {
        setMsg(e.target.value);
        sendTyping({ value: e.target.value, type: "typing", theme: "text" })
    }

    const handleSend = (e) => {
        if (e.key === "Enter") {
            setMsg("")
            sendMsg({ value: e.target.value, type: "message", theme: "text" })
        }
    }
    const imageFileUpload = async (file) => {

        const formData = new FormData()
        formData.append("imageMsg", file, file.name)
        // console.log(file)
        const response = await postRequest(`${BASE_URL}${UPLOAD_IMAGE_FILE}`, formData)

        return response

    }
    const onFileChange = async (e) => {

        let filePath = await imageFileUpload(e.target.files[0])

        sendMsg({ value: filePath, type: "file", theme: "image" })
    }
    return (
        <div className='chat-form'>
            <div className="action-btn">
                <FontAwesomeIcon className='icon-block' icon={faSmile} />
                <div className='file-share'>
                    <input type="file" onChange={(e) => onFileChange(e)} name='imageMsg' />
                    <FontAwesomeIcon className='icon-block' icon={faPaperclip} />
                </div>

            </div>

            <input className='chat-input' type="text" placeholder='Type a Message' value={msg} onChange={(e) => handleChange(e)} onKeyPress={(e) => handleSend(e)} />

            <FontAwesomeIcon icon={faMicrophone} className='icon-block' />



        </div>
    )
}

export default ChatForm
