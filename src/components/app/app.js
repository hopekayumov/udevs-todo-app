import React, { useState} from "react";
import './app.css'
import AppHeader from "../AppHeader";
import SearchPanel from "../SearchPanel";
import FilterPanel from "../FilterPanel";
import ToDoList from "../ToDoList";
import ItemAddForm from "../ToDoAddForm";

function App(){
    const[maxId, setMaxID] = useState(0);
    const [constandValue, setConstantValue] = useState([
        createToDoItem('Assalomu Aleykum'),
        createToDoItem('Salom Hammaga'),
        createToDoItem('Zor ishlarizga omad')
    ])
    const [todoData, setTodoData] = useState([
        createToDoItem('Assalomu Aleykum'),
        createToDoItem('Salom Hammaga'),
        createToDoItem('Zor ishlarizga omad')
    ])
    const [term,setTerm] = useState("")
    const [filter,setFilter] = useState("all")


    function createToDoItem(label) {
        return  {
            label,
            important: false,
            done: false,
            id: Math.random()
        }
    }
    const deleteItem = (id) => {
            const idx = todoData.findIndex((el) => el.id === id);
            todoData.splice(idx, 1);
            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx)
            ]
        setTodoData(newArray)
        setConstantValue(newArray)
    }
    const addItem = (text) => {
        const newItem = createToDoItem(text);
            const newArray = [
                ...todoData,
                newItem
            ]
        setTodoData(newArray)
        setConstantValue(newArray)
    }
    const onToggleImportant = (id) => {
        setTodoData(toggleProperty(todoData, id, 'important'))
    }
    const toggleProperty = (arr, id, propName) => {
        const idx = arr.findIndex((el) => el.id === id)
            const oldItem = arr[idx]
            const newItem = {...oldItem,
            [propName]: !oldItem[propName]}
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx +1)
        ]
    }
    const onSearchChange = (item) => {
        this.setState({item})
    }
    const onFilterChange = (filter) => {
        switch(filter) {
            case 'all':
                return setTodoData(constandValue)
            case 'active':
                return setTodoData(constandValue.filter((item) => !item.done))
            case 'done':
                return setTodoData(constandValue.filter((item) => item.done))
            default:
                return setTodoData(constandValue)
        }
    }
    const filters = (filter)=> {
        switch(filter) {
            case 'all':
                return todoData
            case 'active':
                return todoData.filter((item) => !item.done)
            case 'done':
                return todoData.filter((item) => item.done)
            default:
                return todoData
        }
    }

    const search = (items, term) => {
        if (term.length === 0) {
            return items
        }
        return items.filter((items) => {
            return items.label.toLowerCase().indexOf(term.toLowerCase()) > -1
        })
    }
    const onToggleDone = (id) => {
        setTodoData(toggleProperty(todoData, id, 'done'))
        setConstantValue(toggleProperty(todoData, id, 'done'))
    }

    const visibleItems = filters(search(todoData, term), filter);
    const doneCount = todoData.filter((el) => el.done).length
    const todoCount = todoData.length - doneCount
    return (
        <div className='todo-app'>
            <AppHeader todo={doneCount} done={todoCount}></AppHeader>
            <div className='search-panel d-flex'>
                <SearchPanel onSearchChange={onSearchChange}></SearchPanel>
                <FilterPanel filter={filter} onFilterChange={onFilterChange}></FilterPanel>
            </div>
            <ToDoList todos={visibleItems} onDelete={deleteItem} onToggleDone={onToggleDone} onToggleImportant={onToggleImportant}></ToDoList>
            <ItemAddForm onItemAdded={addItem}></ItemAddForm>
        </div>
    );

}

export default App;