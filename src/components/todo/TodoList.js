import React from 'react'
import TodoSummary from './TodoSummary'
import { Link } from 'react-router-dom'

const TodoList = ({todos}) => {
    return (
        <div className="section">
            {
                todos && todos.map(todo => {
                    return (
                        <Link to={'/todo/'+todo.id} key={todo.id}>
                            <TodoSummary todo={todo} />
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default TodoList
