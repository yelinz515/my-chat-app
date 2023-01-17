import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../../firebase/AuthContext';
import { ChatContext } from '../../firebase/ChatContext';

const myChat: React.CSSProperties = {
    width: "100%",
    marginTop: "5px",
    paddingRight: "3px",
    marginBottom: "3px",
    textAlign: "right",
    wordBreak: "break-all",
}
const chat: React.CSSProperties  = {
    width: "100%",
    marginTop: "5px",
    paddingLeft: "3px",
    marginBottom: "3px",
    textAlign: "left",
    wordBreak: "break-all",
}

function Message({message}) {
    const { user } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    // 댓글 작성 시 스크롤 하단으로
    const scrollRef: React.MutableRefObject<any> = useRef();

    useEffect(()=> {
        scrollRef.current?.scrollIntoView({ behavior: "smooth"});
    },[message])


  return (
    <>
        {/* me */}
        {message.senderId === user.uid && (
                <div style={myChat}>
                <div style={{width: "fit-content", backgroundColor: "rgb(248,227,76)", borderRadius: "5px", marginLeft: "auto", padding: "2px", paddingLeft: "5px", paddingRight: "5px"}}>
                    {message.text}
                </div>
            </div>
        )}
        {/* users */}
        {/* TODO: option) 사용자 이름 */}
        {message.senderId !== user.uid && (
            <div style={chat}>
                {/* {user.displayName} */}
                <br />
                <div style={{width: "fit-content", backgroundColor: "white", borderRadius: "5px", marginRight: "auto", padding: "2px", paddingLeft: "5px", paddingRight: "5px"}}>
                    {message.text}
                </div>
            </div>
        )}
    </>
  )
}

export default Message