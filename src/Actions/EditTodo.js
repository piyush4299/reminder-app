import { Types } from "../Constants/ActionTypes";

function EditTodo(payloadObject,id,todoItemType){
    return {
        type: Types.EDITTODO,
        payload: {payloadObject,id,todoItemType}
    }
}

export default EditTodo;