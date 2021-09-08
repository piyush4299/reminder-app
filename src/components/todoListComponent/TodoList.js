import './styles.css';
import { TodoItem } from "../todoItemComponent/TodoItem"
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { sortAscending, sortDescending } from '../../utils/helper';
import ErrorBoundary from '../errorBoundaryComponent/ErrorBoundary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';



export default function TodoList(){
    const navBarSections = ["ALL TO-DO TASKS"];
    const [navSection,updateNavSection] = useState(navBarSections[0]);
    const [searchTerm,updateSearchTerm] = useState("");
    const [filterStatus,updateFilterStatus] = useState(false);
    const [showFilter,updateShowFilter] = useState(false);
    const filterWays = ['Task','Timestamp','Priority','Status'];
    const [filterObject,updateFilterObject] = useState({
        'filterWay': filterWays[0].toLowerCase(),
        'orderBy': "ASC"
    });

    const allTodos = useSelector(state => state.alltodo);

    const renderTodoItems = () => {
        if(navSection===navBarSections[0]){
            if(filterStatus){
                const filteredArray = allTodos.sort((item1,item2) => {

                    if(filterObject.orderBy === "ASC"){
                        return sortAscending(item1,item2,filterObject);
                    }
                    else{
                        return sortDescending(item1,item2,filterObject);
                    }
                });
                updateFilterStatus(false);
                return filteredArray.map((todoItem) => (
                    <ErrorBoundary key={todoItem.id}>
                        <TodoItem key={todoItem.id} todoItem={todoItem} todoItemType={"alltodo"} />
                    </ErrorBoundary>
                ))
            }
            else{
                return allTodos.filter(todoItem => {
                    if(searchTerm === ""){
                        return todoItem;
                    }
                    else if(todoItem.task.toLowerCase().includes(searchTerm)){
                        return todoItem;
                    }
                }).map((todoItem) => (
                    <ErrorBoundary key={todoItem.id}>
                        <TodoItem key={todoItem.id} todoItem={todoItem} todoItemType={"alltodo"} />
                    </ErrorBoundary>
                ))
            }
        }
    }

    const handleSearchTermChange = (event) => {
        updateSearchTerm(event.target.value)
    }

    const handleFilterWayChange = (event) => {
        let value = event.target.value
        value = value.toLowerCase();
        updateFilterObject({
            ...filterObject,
            filterWay: value
        })
    }

    const handleOrderByChange = (event) => {
        updateFilterObject({
            ...filterObject,
            orderBy: event.target.value
        })
    }

    const handleFilterApply = (event) => {
        event.preventDefault();
        updateFilterStatus(true);
        renderTodoItems();
    }

    return (
        <div className="TodoList">
            <div className="filters">
                <input type="text" className="searchBar" placeholder="Search by task name" onChange={handleSearchTermChange}/>

                <FontAwesomeIcon className="filterOption" icon={faFilter} onClick={() => updateShowFilter(!showFilter)} />
                {
                    showFilter? <form className="filterForm" onSubmit={handleFilterApply}>
                    <br /><select onChange={handleFilterWayChange} className="filterWay">
                        {
                            filterWays.map(filterWay => (
                                <option key={filterWay}>{filterWay}</option>
                            ))
                        }
                    </select>
                    <select onChange={handleOrderByChange} className="OrderBy">
                        <option>ASC</option>
                        <option>DESC</option>
                    </select>
                    <input type="submit" className="applyFilters" value="Apply"/>
                </form>:""
                }
            </div>
            <div className="Navigation">
                {
                    navBarSections.map((navItem) => (
                        <button className="navbar" key={navItem} onClick={() => updateNavSection(navItem)}
                        style={{borderBottom:navItem===navSection?"1px solid gray":""}}>{navItem}</button>
                    ))
                }
            </div>
            { renderTodoItems() }
        </div>
    )   
}