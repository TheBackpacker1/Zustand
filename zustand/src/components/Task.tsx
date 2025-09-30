
import classNames from 'classnames';
import './Task.css';
import { useStore } from '../store';

interface TaskProps {
    title: string;
}


export default function Task({ title }: TaskProps) {
        
    const task = useStore((store) => 
        store.tasks.find((task) => task.title === title)
    );

    // Handle case where task is not found
    if (!task) {
        return (
            <div className="task">
                <div>Task "{title}" not found</div>
            </div>
        );
    }

    return ( <div className="task">

        <div>{task.title}</div>
        <div className="bottomWrapper">
            <div> </div>
            <div className={classNames('status', task.state)}>{task.state}</div>
        </div>

    </div>
    );
}  