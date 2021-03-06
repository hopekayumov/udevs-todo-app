import React, {Component} from "react";
import './filter-panel.css'

export default class FilterPanel extends Component {
    buttons = [
        {name: 'all', label: 'All'},
        {name: 'active', label: 'Active'},
        {name: 'done', label: 'Done'}
    ]
    render() {
        const {filter, onFilterChange} = this.props
        const buttons = this.buttons.map(({name, label}) => {
            const isActive = filter === name
            const clazz = isActive ? 'btn-success' : 'btn-outline-secondary'
            return (
                <button type='button'
                    className={`btn ${clazz}`}
                    key={name}
                    onClick={() => onFilterChange(name)}
                >{label}</button>
            )
        })
        console.log(buttons)
        return (
            <div className='btn-group btng'>
                {buttons}
            </div>
        );
    }
}