import './list-subs.css'
import {Sub} from '../types'

interface Props{
    subs:Array<Sub>
}

const ListSubs = ({subs}:Props) => {
  return (
    <div className='list-subs'>
      {
        subs?.map(sub=>(
          <div className="item" key={sub.userName}>
            <img src={sub.avatar} alt={sub.userName} />
            <span>{sub.userName} ({sub.times} months)</span>
            <p>{sub.description}</p>
          </div>
        ))
      } 
    </div>
  )
}

export default ListSubs