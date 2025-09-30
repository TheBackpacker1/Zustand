
import { useStore } from '../store';
import './column.css'
import Task from './Task';

// Define Task interface to match store
interface Task {
    title: string;
    state: 'PLANNED' | 'ONGOING' | 'DONE';
}

interface ColumnProps {
    state: 'PLANNED' | 'ONGOING' | 'DONE';
}

export default function Column({ state }: ColumnProps) {
    // ✅ OPTION 1: Pre-computed Selectors - Direct access to filtered tasks
    // ✅ OPTION 2: Using selector with stable reference (no shallow needed here)
    const tasks: Task[] = useStore((store) => {
        switch (state) {
            case 'PLANNED':
                return store.plannedTasks;
            case 'ONGOING':
                return store.ongoingTasks;
            case 'DONE':
                return store.doneTasks;
            default:
                return [];
        }
    });

    return <div className="column">
        <div className='titleWrapper'> 
            <p>{state}</p>
            <button>Add Task</button>
        </div>


        {
            tasks.map((task: Task) => (
                <Task key={task.title} title={task.title} />
            ))
        }
    </div>
}  