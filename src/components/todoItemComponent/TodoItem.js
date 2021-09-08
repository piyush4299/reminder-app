import './styles.css';
import { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash,faEdit,faCheck,faTimes } from '@fortawesome/free-solid-svg-icons';
import EditTodo from '../../Actions/EditTodo';
import DeleteTodo from '../../Actions/DeleteTodo';
import PropTypes from 'prop-types';

export const TodoItem = (props) => {
    const todoItem = props.todoItem;
    const [editMode,setEditMode] = useState(false);
    const dispatch = useDispatch();
    const priorities = useSelector(state => state.priorities);

    const [payloadObject,setPayloadObject] = useState({
        task: todoItem.task,
        timestamp: todoItem.timestamp,
        status: todoItem.status,
        priority: todoItem.priority
    });

    const timestampString = (new Date(todoItem.timestamp)).toLocaleString();
    

    const [dateString,timeString] = timestampString.split(",");
    const handleEdit = () => {
        setEditMode(!editMode);
    }

    const handleDelete = () => {
        dispatch(DeleteTodo(todoItem.id,props.todoItemType))
    }

    const handleSave = () => {
        dispatch(EditTodo(payloadObject,todoItem.id,props.todoItemType));
        setEditMode(!editMode);
    }

    const handleCancel = () => {
        setEditMode(!editMode);
    }

    const handleTaskChange = (event) => {
        setPayloadObject({
            ...payloadObject,
            task: event.target.value 
        });
    }

    const handleTimeStampChange = (event) => {
        setPayloadObject({
            ...payloadObject,
            timestamp: event.target.value 
        });
    }

    const handleStatusChange = () => {
        const newUpdatedObject = {
            ...payloadObject,
            status: !payloadObject.status
        };
        setPayloadObject(newUpdatedObject);
        dispatch(EditTodo(newUpdatedObject,todoItem.id,props.todoItemType));
    }

    const renderConditionalCompletion = () => {
        if(payloadObject.status){
            return <FontAwesomeIcon className="cancel" icon={faTimes} onClick={() => handleStatusChange()} />
        }
        else{
            return <FontAwesomeIcon className="save" icon={faCheck} onClick={() => handleStatusChange()} />
        }
    }

    return (
        <div className="todoItemCard">
            {
                editMode? (
                <div className="todoItemSection">
                    <div className="todoEditDetail">
                        <input className="editText" placeholder="Edit Todo Item" onChange={handleTaskChange} value={payloadObject.task} />
                        <input type="datetime-local" className="editTimeStamp" name="timeLimit" onChange={handleTimeStampChange} value={payloadObject.timestamp} />
                    </div>
                    <div className="inlineIcons">
                        <FontAwesomeIcon className="save" icon={faCheck} onClick={() => handleSave()} />
                        <FontAwesomeIcon className="cancel" icon={faTimes} onClick={() => handleCancel()} />
                    </div>
                </div>):
                (
                <div className="todoItemSection" style={{backgroundColor:payloadObject.status?"#A7F3D0":priorities[todoItem.priority]}}>
                    <div className="todoDetail">
                        <p className="todoItemHeader">{todoItem.task}</p>
                        <p className="todoItemTimestamp">Completion Time: <br/>{dateString}{timeString}</p>
                    </div>
                    <div className="inlineIcons">
                        {renderConditionalCompletion()}
                        <FontAwesomeIcon className="delete" icon={faTrash} onClick={() => handleDelete()} />
                        <FontAwesomeIcon className="edit" icon={faEdit} onClick={() => handleEdit()} />
                    </div>
                </div>)
                
            }    
        </div>
    )
}


TodoItem.propTypes  = {
    todoItem: PropTypes.object,
    todoItemType: PropTypes.string
}