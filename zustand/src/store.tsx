import { create } from "zustand";

// Define the Task interface
interface Task {
    title: string;
    state: 'PLANNED' | 'ONGOING' | 'DONE';
}

// Define the Store interface
interface Store {
    tasks: Task[];

}

// Create the store with proper TypeScript typing
const store = (set: any): Store => ({
    tasks: [
        {  title: 'Learn Zustand', state: 'PLANNED' },
        {  title: 'Build Todo App', state: 'ONGOING' },
        {  title: 'TypeScript Basics', state: 'DONE' }
    ],
    

});

export const useStore = create<Store>(store);