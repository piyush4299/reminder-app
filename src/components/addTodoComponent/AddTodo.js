import './styles.css';
import { useSelector,useDispatch } from 'react-redux';
import addTodo from '../../Actions/AddTodo';
import { useState } from 'react';
import { getCurrentTimeStamp } from '../../utils/helper';

export default function AddTodo(){
    
    const priorities = useSelector(state => state.priorities);

    const startTimeStamp = getCurrentTimeStamp();
    const maxTimeStamp = "2031-02-20T20:20";
    const dispatch = useDispatch();

    const [payloadObject,setPayloadObject] = useState({
        task: "",
        timestamp: "",
        status: false,
        priority: Object.keys(priorities)[2]
    });

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

    const handlePriorityChange = (event) => {
        setPayloadObject({
            ...payloadObject,
            priority: event.target.value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addTodo(payloadObject));
        setPayloadObject({
            task: "",
            timestamp: "",
            status: false,
            priority: Object.keys(priorities)[2]
        });
    }


    return (
        <form className="addTodoSection" onSubmit={handleSubmit}>
            <input className="takeTodo" value={payloadObject.task} placeholder="Enter todo item to be reminded of" onChange={handleTaskChange} required/>
            <input type="datetime-local" value={payloadObject.timestamp} className="timeLimit" name="timeLimit" onChange={handleTimeStampChange} min={startTimeStamp} max={maxTimeStamp} required />
            <select className="priority" value={payloadObject.priority} onChange={handlePriorityChange}>
                {
                    Object.keys(priorities).map(priority => (
                        <option key={priority}>{priority}</option>
                    ))
                }
            </select>
            <input className="addTodoItem" type="submit" value="ADD TODO"/>
        </form>
    )
}