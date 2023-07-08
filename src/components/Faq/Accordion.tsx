import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, useState } from "react"
import {AiOutlinePlus, AiOutlineMinus} from "react-icons/ai"

export default function Accordion(props: { question: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; answer: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined }){
    const [isOpen, setOpen] = useState(false)

    function handleClick(){
        setOpen(!isOpen)
    }

    return(
        <>
          <h3 className="question-flex" onClick={handleClick}>
           <span className="question">{props.question}</span> 
            <span className="openclose">{isOpen ? <AiOutlineMinus/> : <AiOutlinePlus/>}</span>
           </h3>
          {isOpen && <p className="answer">{props.answer}</p>} 
          <br />
          <hr />
        </>
    )
}