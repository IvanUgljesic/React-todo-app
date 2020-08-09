import React, { Component } from 'react';
//import { createTodo } from '../../store/actions/todoActions';
import { connect } from 'react-redux';
import Select from 'react-select';
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { editTodo } from '../../store/actions/todoActions'
import AddCategory from './AddCategory'

class EditTodo extends Component {
    constructor (props) {
        super(props)
        this.state = {
            ...props.todo
        }
      }
    handleChange = (e) => {
        console.log(this.state)

        this.setState({
            [e.target.id]: e.target.value 
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        //console.log(this.state)
        this.props.editTodo(this.state, this.props.id);
        this.props.history.push('/');
    }
    reitOptions() {
        var arr = [];
        for (let i = 1; i <= 10; i++) {
            arr.push(<option key={i}>{i}</option>)
        }
        return arr; 
    }
    catOptions(){
        var arr = [];
        var catSorted = this.props.categories
        for (let i = 0; i < catSorted.length; i++) {
            arr.push(<option key={catSorted[i].value}>{catSorted[i].value}</option>)
        }
        return arr;
        
    }
    render() {
        const { todo, id, categories} = this.props;
        console.log(categories);
        return (
        (categories) ?
            <div className="container">
                <div className="row">
                <form onSubmit={this.handleSubmit} className="col s12 m7 card">
                    <h5 className="grey-text text-darken-3">Edit idea</h5>
                    <div className="row">
                        <div className="input-field col s6">
                            <label htmlFor="title" className="active">Idea title</label>
                            <input type="text" id="title" value={this.state.title} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12 m6">
                            <label htmlFor="description" className="active">Idea description</label>
                            <textarea className="materialize-textarea" id="description" value={this.state.description} onChange={this.handleChange}></textarea>
                        </div>
                        <div className="input-field col s12 m6">
                            <label htmlFor="expectations" className="active">Expectations</label>
                            <textarea className="materialize-textarea" id="expectations" value={this.state.expectations} onChange={this.handleChange}></textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12 m5">
                            <div className="input-field col s12 m8">Rating
                                <select value={this.state.rating} onChange={this.handleChange} id="rating" className="browser-default">
                                    { this.reitOptions() }
                                </select>
                            </div>
                        </div>
                        <div className="input-field col s12 m5 offset-m1">
                            <div className="input-field col s12">Category
                                <select onChange={this.handleChange} id="category" className="browser-default" value={this.state.category}>
                                    {this.catOptions()}
                                </select>    
                            </div>                    
                        </div>
                    </div>
                    <div className="row upis-sub-but">
                        <div className="input-field col s12">
                            <button className="btn yellowDex lighten-1 z-depth-0">Edit</button>
                        </div>
                    </div>
                </form>
                <div className="col s12 m4 offset-m1 card">
                    <AddCategory categories={categories} userId={id}/>
                </div>
                </div>
                
            </div>:<div className="container"><h5 className="center">Učitavanje....</h5></div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const todos = state.firestore.data.todos;
    const todo = todos ? todos[id] : null;
    return {
        todo: todo,
        auth: state.firebase.auth,
        id,
        categories:state.firestore.ordered.categories 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editTodo: (todo, id) => dispatch(editTodo(todo, id))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'todos' },
        { collection: 'categories'}
    ])
)(EditTodo)

