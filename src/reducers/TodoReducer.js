import uuid from "react-uuid";
import { Types } from "../Constants/ActionTypes";


const initialState = {"alltodo": [],"priorities": {
    "High": "#FECACA",
    "Medium": "#FDE68A",
    "Low": "#E5E7EB"
}};

export const TodoReducer = (state=initialState,action) => {
    switch(action.type){
        case Types.ADDTODO:
            const TodoItemType = "alltodo";            
            const newTodoItem = {
                id: uuid(),
                task: action.payload.todoObject.task,
                timestamp: action.payload.todoObject.timestamp,
                status: action.payload.todoObject.status,
                priority: action.payload.todoObject.priority
            }

            return {
                ...state,
                [TodoItemType]: [...state[TodoItemType],newTodoItem]
            };
        case Types.EDITTODO:
            let todoItemType = action.payload.todoItemType;
            let id = action.payload.id;
            let editTodoObject = action.payload.payloadObject;
            let TodoArray = state[todoItemType];
            
            TodoArray.forEach(todoItem => {
                if(id === todoItem.id){
                    todoItem.task = editTodoObject.task;
                    todoItem.timestamp = editTodoObject.timestamp;
                    todoItem.status = editTodoObject.status;
                }
            });

            return {    
                ...state,
                [todoItemType]: TodoArray
            };
        case Types.DELETETODO:
            const idToBeDeleted = action.payload.id;
            const todoType = action.payload.todoItemType;
            const todoArray = state[todoType];
            const newTodoArray = todoArray.filter(todoItem => todoItem.id !== idToBeDeleted)

            return {
                ...state,
                [todoType]: newTodoArray
            }
        default: return state;
    }
}