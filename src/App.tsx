import { useEffect, useState } from 'react'
import './App.css'
import ListSubs from './components/ListSubs'
import Form from './components/Form'
import { Sub } from './types'

/* const INITIAL_STATE=[
  {
    userName:'hakki',
    times:2,
    avatar:'https://i.pravatar.cc/150?u=hakki',
    description:'first description'
  },
  {
    userName:'diddano',
    times:5,
    avatar:'https://i.pravatar.cc/150?u=diddano',
    description:'the second description'
  },
  {
    userName:'souna',
    times:3,
    avatar:'https://i.pravatar.cc/150?u=souna',
    description:'the third description'
  }
]
 */

interface AppState{
  subs:Array<Sub>
  tabs:1|2
}

type SubFromApi={
  nick:string,
  months:number,
  profileUrl:string,
  description:string
}

function App() {
  const [subs, setSubs] = useState<AppState['subs']>([])
  const [tabs, setTabs]=useState<1|2>(1)

  useEffect(()=>{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fetchDataFromApi=():Promise<Array<SubFromApi>>=>{
      return fetch('http://localhost:3000/api/subs')
              .then(res=>res.json())  
    }
    const mapPropertiesFromApi=(res:Array<SubFromApi>):Array<Sub>=>{
      return res.map(({nick,months, profileUrl, description})=>({
        userName:nick,
        times:months,
        avatar:profileUrl,
        description
      }))
    }
    fetchDataFromApi()
      .then(res=>mapPropertiesFromApi(res))
      .then(sub=>setSubs(sub))
  },[])

  return (
    <div className="app">
      <ListSubs subs={subs} />
      <Form tabs={tabs} setTabs={setTabs} setSubs={setSubs} />
    </div>
  )
}

export default App
