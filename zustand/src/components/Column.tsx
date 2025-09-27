
import  './column.css'
import Task from './Task';

interface ColumnProps {
    state: string; 
    }

export default function Column ({state}: ColumnProps) {

return <div className="column">
   <p>{state}</p>
   <Task title="ToDo" />
    </div>

} 