
import './Task.css';

interface TaskProps {
    title: string;
}

const STATUS = 'PLANNED';

export default function Task({ title }: TaskProps) {
    return ( <div className="task">

        <div>{title}</div>
        <div className="bottomWrapper">
            <div> </div>
            <div className="status">{STATUS}</div>
        </div>

    </div>
    );
}  