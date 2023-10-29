import { useReducer } from "react"
import { Sub } from "../types"

const INITIAL_STATE={
    userName:"",
    times: 0,
    avatar:"",
    description:""
}

type ActionType ={
    type:"CHANGE_VALUE",
    payload:{
        nameField:string,
        valueField:string
    }
} |{
    type:"RESET"
}

interface FormState {
    inputsValue:Sub
}

const subsReducer=(state:FormState['inputsValue'], action:ActionType)=>{
    switch(action.type){
        case "CHANGE_VALUE":{
            const {nameField, valueField} = action.payload
            return {
                ...state,
                [nameField]:valueField
            }
        }
        case "RESET":
            return INITIAL_STATE        
    }
}

const useForm=()=>{
    return useReducer(subsReducer, INITIAL_STATE)
}
export default useForm