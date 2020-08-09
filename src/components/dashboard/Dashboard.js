import React, { Component } from 'react'
import Notifications from './Notifications'
import TodoList from '../todo/TodoList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {
    render() {
        const { todos, auth, notifications, categories } = this.props;
        const thisUserTodos = todos && todos.filter(todo => todo.authorId == auth.uid)
        const thisUserNotifications = notifications && notifications.filter(noti => noti.userId == auth.uid).slice(0, 3)
        
        if(!auth.uid) return <Redirect to='signin' />
        return (
            thisUserTodos && thisUserNotifications ?
            <div className="container">
                <div className="row">
                    <div className="col s12 m6">
                        <TodoList todos={thisUserTodos} />                        
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <Notifications notifications={thisUserNotifications} />
                    </div>
                </div>
            </div>:<div className="container"><h5 className="center">Loading....</h5></div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.firestore.ordered.todos,
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications,
        categories: state.firestore.ordered.categories
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todos', orderBy:['createdAt','desc'] },
        { collection: 'notifications', orderBy:['time','desc']},
        { collection: 'categories'}
    ])
)(Dashboard)