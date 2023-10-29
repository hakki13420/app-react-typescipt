import './form.css'
import { useRef } from "react"
import { Sub } from "../types"
import Tabs from './Tabs'
import useForm from '../hooks/useForm'


interface FromProps{
    setSubs:React.Dispatch<React.SetStateAction<Sub[]>>,
    tabs:1|2,
    setTabs:React.Dispatch<React.SetStateAction<1|2>>
}


const Form = ({tabs, setTabs, setSubs}:FromProps) => {

    //const [inputsValue, setInputValue]=useState<FormState['inputsValue']>(INITIAL_STATE)
    const [inputsValue, dispatch]=useForm()
    
    const userNameRef=useRef<HTMLInputElement>(null)
    const timesRef=useRef<HTMLInputElement>(null)
    const avatarRef=useRef<HTMLInputElement>(null)
    const descriptionRef=useRef<HTMLTextAreaElement>(null)

    const handlChange=(e:(React.ChangeEvent<HTMLInputElement>|
        React.ChangeEvent<HTMLTextAreaElement>))=>{
        //setInputValue(state=>({...state, [e.target.name]:e.target.value}))
        dispatch({
            type:"CHANGE_VALUE",
            payload:{
                nameField:e.target.name,
                valueField:e.target.value
            }
        })
    }

    const resetField=()=>{
        console.log('reset')
        dispatch({
            type:"RESET"
        })
    }

    const submitForm=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        console.log('Add')
        if(tabs===1) {
            setSubs(subs=>([...subs,inputsValue]))
            dispatch({
                type:"RESET"
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
            <input  onChange={handlChange} type="text" name="userName" placeholder="userName..." />
            <input  onChange={handlChange} type="number" name="times" placeholder="times..." />
            <input  onChange={handlChange} type="text" name="avatar" placeholder="avatar..." />
            <textarea  onChange={handlChange} name="description" placeholder="description..." />
            <button type="button" onClick={resetField}>Reset</button>
            <button type="submit">Submit</button>
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
            <button type="button" onClick={resetField}>Reset</button>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

}

export default Form