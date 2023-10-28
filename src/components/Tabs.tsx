import './tabs.css'

interface TabsProps{
    tabs:1|2,
    setTabs:React.Dispatch<React.SetStateAction<1|2>>
}


const Tabs = ({tabs, setTabs}:TabsProps) => {

    const onchangeMethod=()=>{
        setTabs(1)
    }
    const refMethod=()=>{
        setTabs(2)
    }
  return (
    <div className="wrapper">        
    <div className='tabs'>
        <button className={tabs===1?'button active':'button'} onClick={onchangeMethod}>Onchange</button>
        <button className={tabs===2?'button active':'button'} onClick={refMethod}>Ref</button>
    </div>
    </div>
  )
}

export default Tabs