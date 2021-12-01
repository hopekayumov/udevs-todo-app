import React, {Component} from "react";
import './app.css'
import AppHeader from "../AppHeader";
import SearchPanel from "../SearchPanel";
import FilterPanel from "../FilterPanel";
import TodoListItem from "../ToDoListItem/todo-list-item";
import TodoList from "../ToDoList/todo-list";
import ToDoList from "../ToDoList";
import ItemAddForm from "../ToDoAddForm";

export default class App extends Component {
    maxId = 100;
    state = {
        todoData: [
            this.createToDoItem('Assalomu Aleykum'),
            this.createToDoItem('Salom Hammaga'),
            this.createToDoItem('Zor ishlarizga omad')
        ],
        term: '',
        filter: 'all'

    }
    createToDoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }
    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id);
            todoData.splice(idx, 1);
            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ]
            return {
                todoData: newArray
            }
        })
    }
    addItem = (text) => {
        const newItem = this.createToDoItem(text);
        this.setState(({todoData}) => {
            const newArray = [
                ...todoData,
                newItem
            ]
            return {
                todoData: newArray
            }

        })
    }
    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        })
    }
    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id)
            const oldItem = arr[idx]
            const newItem = {...oldItem,
            [propName]: !oldItem[propName]}
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx+1)
        ]
    }
    onSearchChange = (item) => {
        this.setState({item})
    }
    onFilterChange = (filter) => {
        this.setState( {filter})
    }
    filter(items, filter) {
        switch(filter) {
            case 'all':
                return items
            case 'active':
                return items.filter((item) => !item.done)
            case 'done':
                return items.filter((item) => item.done)
            default:
                return items
        }
    }

    search(items, term) {
        if (term.length === 0) {
            return items
        }
        return items.filter((items) => {
            return items.label.toLowerCase().indexOf(term.toLowerCase()) > -1
        })
    }
    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        })
    }
    render() {
        const {todoData, term, filter} = this.state
        const visibleItems = this.filter(this.search(todoData, term), filter);
        const doneCount = todoData.filter((el) => el.done).length
        const todoCount = todoData.length - doneCount
        return (
            <div className='todo-app'>
                <AppHeader todo={doneCount} done={todoCount}></AppHeader>
                <div className='search-panel d-flex'>
                    <SearchPanel onSearchChange={this.onSearchChange}></SearchPanel>
                    <FilterPanel filter={filter} onFilterChange={this.onFilterChange}></FilterPanel>
                </div>
                <ToDoList todos={visibleItems} onDelete={this.deleteItem} onToggleDone={this.onToggleDone} onToggleImportant={this.onToggleImportant}></ToDoList>
                <ItemAddForm onItemAdded={this.addItem}></ItemAddForm>
            </div>
        );
    }
}