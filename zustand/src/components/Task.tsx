
import classNames from 'classnames';
import './Task.css';

interface TaskProps {
    title: string;
}

const STATUS = 'ONGOING';

export default function Task({ title }: TaskProps) {
    return ( <div className="task">

        <div>{title}</div>
        <div className="bottomWrapper">
            <div> </div>
            <div className={classNames('status', STATUS)}>{STATUS}</div>
        </div>

    </div>
    );
}  