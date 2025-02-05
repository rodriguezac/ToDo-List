import React from 'react'
import done from '../assets/done.png'
import undone from '../assets/undone.png'
import trash from '../assets/trash.png'

const ToDo_Items= ({text, isComplete, id,deleteToDo, toggle})=>{
  return (
    <div className='flex items-center my-3 gap-2 px-5'>

      <section onClick={()=> {toggle (id)}} className='flex flex-1 items-center cursor-pointer' >

        <img className='w-7 sm: max-w-5' src={isComplete ? done: undone} alt="Tarea hecha - icon " />
        <p className={`text-slate-700 ml-4 text-[17px] sm: text-xs ${isComplete ?"line-through":""}`}> {text}</p>

      </section>

      <img onClick={()=>{deleteToDo(id)}} className='w-3.5 cursor-pointer' src={trash} alt="borra la tarea -icon" />
    </div>
  )
}

export default ToDo_Items