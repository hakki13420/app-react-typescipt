import './form.css'
import { useRef, useState } from "react"
import { Sub } from "../types"
import Tabs from './Tabs'

interface FromProps{
    setSubs:React.Dispatch<React.SetStateAction<Sub[]>>,
    tabs:1|2,
    setTabs:React.Dispatch<React.SetStateAction<1|2>>
}

interface FormState {
    inputsValue:Sub
}


const Form = ({tabs, setTabs, setSubs}:FromProps) => {

    const [inputsValue, setInputValue]=useState<FormState['inputsValue']>({
        userName:"",
        times: 0,
        avatar:"",
        description:""
    })
    const userNameRef=useRef<HTMLInputElement>(null)
    const timesRef=useRef<HTMLInputElement>(null)
    const avatarRef=useRef<HTMLInputElement>(null)
    const descriptionRef=useRef<HTMLTextAreaElement>(null)

    const handlChange=(e:(React.ChangeEvent<HTMLInputElement>|
        React.ChangeEvent<HTMLTextAreaElement>))=>{
        setInputValue(state=>({...state, [e.target.name]:e.target.value}))
    }
    const submitForm=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(tabs===1) {
            setSubs(subs=>([...subs,inputsValue]))
            setInputValue({
                userName:'',
                times:0,
                avatar:'',
                description:''
            })
        }
        else {
            
            if(typeof userNameRef.current?.value !=='undefined' &&
               typeof timesRef.current?.value !=='undefined' &&
               typeof avatarRef.current?.value !=='undefined' &&
               typeof descriptionRef.current?.value !=='undefined'
               )                
                {
                    const obj:Sub= {
                        userName:userNameRef.current?.value,
                        times:+timesRef.current?.value,
                        avatar:avatarRef.current?.value,
                        description:descriptionRef.current?.value
                    }
                    setSubs(subs=>([
                        ...subs, 
                        obj
                    ]))
                    userNameRef.current.value=""                    
                    timesRef.current.value='0'
                    avatarRef.current.value=""                    
                    descriptionRef.current.value=""                    
                }
                
            }
    }

{
    if(tabs===1)
    return (
        <div className='form'>
        <Tabs tabs={tabs} setTabs={setTabs} />
        <form onSubmit={submitForm}>
            <input value={inputsValue.userName} onChange={handlChange} type="text" name="userName" placeholder="userName..." />
            <input value={inputsValue.times} onChange={handlChange} type="number" name="times" placeholder="times..." />
            <input value={inputsValue.avatar} onChange={handlChange} type="text" name="avatar" placeholder="avatar..." />
            <textarea value={inputsValue.description} onChange={handlChange} name="description" placeholder="description..." />
            <input type="submit" value="submit" />
        </form>
    </div>
  )
  else if(tabs===2)
    return (
        <div className='form'>
        <Tabs tabs={tabs} setTabs={setTabs} />
        <form onSubmit={submitForm}>
            <input ref={userNameRef} type="text" name="userName" placeholder="userName..." />
            <input ref={timesRef} type="number" name="times" placeholder="times..." />
            <input ref={avatarRef} type="text" name="avatar" placeholder="avatar..." />
            <textarea ref={descriptionRef} name="description" placeholder="description..." />
            <input type="submit" value="submit" />
        </form>
    </div>
  )
}

}

export default Form