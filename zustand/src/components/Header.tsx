import { useStore } from '../store';
import { useResponsive } from '../hooks/useResponsive';
import './Header.css';

export default function Header() {
  const { isMobile } = useResponsive();
  const allTasks = useStore((store) => store.tasks);
  const plannedCount = useStore((store) => store.plannedTasks.length);
  const ongoingCount = useStore((store) => store.ongoingTasks.length);
  const doneCount = useStore((store) => store.doneTasks.length);
  const addTask = useStore((store) => store.addTask);

  const completionRate = allTasks.length > 0 ? Math.round((doneCount / allTasks.length) * 100) : 0;

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-title">
          <h1>🎯 Zustand Task Board</h1>
          {!isMobile && (
            <p className="header-subtitle">
              Learning Zustand with TypeScript - Responsive Design
            </p>
          )}
        </div>
        
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-number">{allTasks.length}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{plannedCount}</span>
            <span className="stat-label">Planned</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{ongoingCount}</span>
            <span className="stat-label">Ongoing</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{doneCount}</span>
            <span className="stat-label">Done</span>
          </div>
          <div className="stat-item completion-rate">
            <span className="stat-number">{completionRate}%</span>
            <span className="stat-label">Complete</span>
          </div>
        </div>

        <div className="header-actions">
          <button 
            className="btn-responsive add-task-btn"
            onClick={() => addTask(`Quick Task ${Date.now()}`, 'PLANNED')}
          >
            {isMobile ? '➕' : '➕ Add Task'}
          </button>
        </div>
      </div>
    </header>
  );
}