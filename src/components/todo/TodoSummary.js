import React from 'react'
import moment from 'moment'

const TodoSummary = ({todo}) => {
    return (
        <div className="card">
            <div className="card-content grey-text">
                <div className="row">
                    <div className="col s6"><h5 className="grey-text text-darken-3">{todo.title}</h5></div>
                    <div className="col s6"><blockquote>Category: {todo.category}<br/>Rating {todo.rating}</blockquote></div>
                </div>
                <div className="row">
                    <div className="col s6"><p>Posted by: {todo.authorFirstName} {todo.authorLastName}</p></div>
                    <div className="col s6"><p className="grey-text">Enrollment time: {moment(todo.createdAt.toDate()).calendar()}</p></div>              
                </div>
            </div>
        </div>   
    )
}

export default TodoSummary
