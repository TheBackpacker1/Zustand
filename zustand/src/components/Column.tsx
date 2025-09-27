
import  './column.css'

interface ColumnProps {
    state: string; 
    }

export default function Column ({state}: ColumnProps) {

return <div className="column">{state}</div>

} 