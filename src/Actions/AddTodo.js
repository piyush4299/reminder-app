import { Types } from "../Constants/ActionTypes";

function addTodo(todoObject){
    return {
        type: Types.ADDTODO,
        payload: {todoObject}
    }
}

export default addTodo;