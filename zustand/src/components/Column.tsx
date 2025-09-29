
import { useStore } from '../store';
import  './column.css'
import Task from './Task';

interface ColumnProps {
    state: string; 
    }

export default function Column ({state}: ColumnProps) {
    const tasks = useStore((store) =>
        store.tasks.filter(task => task.state === state)
    )

return <div className="column">
   <p>{state}</p>
   <Task title="ToDo" />
    </div>

}  