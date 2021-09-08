import {createStore} from 'redux';
import { TodoReducer } from '../reducers/TodoReducer';

export const TodoStore = createStore(TodoReducer);