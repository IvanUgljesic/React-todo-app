import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux' 
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { deleteTodo } from '../../store/actions/todoActions'


const TodoDetails = (props) => {
    const { todo, auth, editTodoId } = props;
    //console.log(editTodoId)
    const handleDelete = (id) => {
        props.deleteTodo(editTodoId);
        props.history.push('/');
    }
    if(!auth.uid) return <Redirect to='/signin' />
    if(todo) {
        return(
            <div className="container section">
                <div className="row">
                <div className="col s12 m9 card">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <h3 className="grey-text text-darken-3">{todo.title}</h3>
                        <div className="row">
                            <div className="col s6"><h5 className="grey-text text-darken-3">Expectations:</h5> <br/> <blockquote>{todo.expectations}</blockquote></div>
                            <div className="col s6"><h5 className="grey-text text-darken-3">Description: </h5><br/> <blockquote>{todo.description}</blockquote></div>
                        </div>
                    </div>
                    <div className="card-action gray-text">
                        <div className="row">
                            <div className="col s6">
                                <p>Category: {todo.category}</p>
                                <p>Rating: {todo.rating}</p>
                             </div>
                            <div className="col s5 offset-s1">Enrollment time: {moment(todo.createdAt.toDate()).calendar()}</div>
                        </div>
                    </div>
                </div>

                </div>
                <div className="col s6 m3 readDeleteBtnArea">
                    <Link to={{
                        pathname:`/edit/${editTodoId}`
                    }} className="btn">Edit</Link>
                    <button className="btn" onClick={handleDelete}>Delete</button>
                </div>
                </div>
            </div>

        )
    }else {
        return (
            <div className="container center">
                <p>Loading...</p>
            </div>
        )

    }
}

const mapStateToProps = (state, ownProps) => {
    //console.log(ownProps)
    const id = ownProps.match.params.id;
    const todos = state.firestore.data.todos;
    const todo = todos ? todos[id] : null;
    return {
        todo: todo,
        auth: state.firebase.auth,
        editTodoId: id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTodo: (id) => dispatch(deleteTodo(id))
    }
}

export  default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'todos' }
    ])
)(TodoDetails)