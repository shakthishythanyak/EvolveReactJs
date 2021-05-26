export interface ITaskType {
    id: number;
    name: string;
    age: number;
    place: string;
  }
  export interface ITaskType {
    
  }
  export interface ITaskTypeProps {
    addStudent: (s: ITaskType)=>void;
  }

  export interface IRegistrationFormState {
    Task: ITaskType;
  }