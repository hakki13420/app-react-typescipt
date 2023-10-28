import { useState } from 'react'
import './App.css'
import ListSubs from './components/ListSubs'
import Form from './components/Form'
import { Sub } from './types'

const INITIAL_STATE=[
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


interface AppState{
  subs:Array<Sub>
  tabs:1|2
}

function App() {
  const [subs, setSubs] = useState<AppState['subs']>(INITIAL_STATE)
  const [tabs, setTabs]=useState<1|2>(1)

  return (
    <div className="app">
      <ListSubs subs={subs} />
      <Form tabs={tabs} setTabs={setTabs} setSubs={setSubs} />
    </div>
  )
}

export default App
