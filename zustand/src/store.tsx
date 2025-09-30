import { create } from "zustand";

// Define the Task interface
interface Task {
    title: string;
    state: 'PLANNED' | 'ONGOING' | 'DONE';
}

// Define the Store interface
interface Store {
    tasks: Task[];
    // Option 1: Pre-computed selectors
    plannedTasks: Task[];
    ongoingTasks: Task[];
    doneTasks: Task[];
    addTask: (title: string, state: Task['state']) => void;
    deleteTask: (title: string) => void;
    moveTask: (title: string, newState: Task['state']) => void;
}

// Helper function to compute filtered tasks
const computeFilteredTasks = (tasks: Task[]) => ({
    plannedTasks: tasks.filter(task => task.state === 'PLANNED'),
    ongoingTasks: tasks.filter(task => task.state === 'ONGOING'),
    doneTasks: tasks.filter(task => task.state === 'DONE'),
});

// Create the store with proper TypeScript typing
const store = (set: any): Store => {
    const initialTasks = [
        { title: 'Learn Zustand', state: 'PLANNED' as const },
        { title: 'Build Todo App', state: 'ONGOING' as const },
        { title: 'TypeScript Basics', state: 'DONE' as const }
    ];
    
    const initialFilteredTasks = computeFilteredTasks(initialTasks);
    
    return {
        tasks: initialTasks,
        ...initialFilteredTasks,
        
        // Action to add a new task
        addTask: (title: string, state: Task['state']) =>
            set((store: Store) => {
                const newTasks = [...store.tasks, { title, state }];
                return {
                    tasks: newTasks,
                    ...computeFilteredTasks(newTasks)
                };
            }),
        
        // Action to delete a task by title
        deleteTask: (title: string) =>
            set((store: Store) => {
                const newTasks = store.tasks.filter(task => task.title !== title);
                return {
                    tasks: newTasks,
                    ...computeFilteredTasks(newTasks)
                };
            }),
        
        // Action to move a task to a different state
        moveTask: (title: string, newState: Task['state']) =>
            set((store: Store) => {
                const newTasks = store.tasks.map(task =>
                    task.title === title ? { ...task, state: newState } : task
                );
                return {
                    tasks: newTasks,
                    ...computeFilteredTasks(newTasks)
                };
            })
    };
};

export const useStore = create<Store>(store);