import './todo-list.css'
import TodoListItem from "../ToDoListItem/todo-list-item";
import ToDoListItem from "../ToDoListItem";

const TodoList = ({todos, onDelete, onToggleImportant, onToggleDone}) => {
    const elements = todos.map((item) => {
        const {id, ...itemProps} = item
        return (
            <li key={item.id} className='list-group-item'>
                <TodoListItem {...itemProps} onDelete={() => onDelete(id)} onToggleImportant={() => onToggleImportant(id)} onToggleDone={() => onToggleDone(id)}></TodoListItem>
            </li>
        )
    })
    return (
        <ul className='list-group todo-list'>
            {elements}
        </ul>
    );
}
export default TodoList