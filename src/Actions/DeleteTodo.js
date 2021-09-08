import { Types } from "../Constants/ActionTypes";

function DeleteTodo(id,todoItemType){
    return {
        type: Types.DELETETODO,
        payload: {id,todoItemType}
    }
}

export default DeleteTodo;