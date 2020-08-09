import React, { Component } from 'react';
import { createTodo } from '../../store/actions/todoActions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import AddCategory from './AddCategory'

class CreateTodo extends Component {
    state = {
        title:'',
        description:'',
        rating:'5',
        category:'',
        expectations:''
    }
    handleChange = (e) => {
        this.setState({
           [e.target.id]: e.target.value 
        })
        //console.log(this.state)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createTodo(this.state);
        this.props.history.push('/');
    }
    ratingdOptions() {
        var arr = [];
        for (let i = 1; i <= 10; i++) {
            arr.push(<option key={i}>{i}</option>)
        }
        return arr; 
    }
    render() {
        const { auth, categories } = this.props;
        if(!auth.uid) return <Redirect to='/signin' />
        return (
            (categories)?
            <div className="container">
                <div className="row">
                <form onSubmit={this.handleSubmit} className="white col s12 m7 card">
                    <h5 className="grey-text text-darken-3">New idea</h5>
                    <div className="row">
                        <div className="input-field col s6">
                            <label htmlFor="title">Idea title</label>
                            <input type="text" id="title" onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <label htmlFor="description">Idea description</label>
                            <textarea className="materialize-textarea" id="description" onChange={this.handleChange}></textarea>
                        </div>
                        <div className="input-field col s6">
                            <label htmlFor="expectations">Expectations</label>
                            <textarea className="materialize-textarea" id="expectations" onChange={this.handleChange}></textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <label className="input-field col s12">Rating
                                <select defaultValue={this.state.rating} onChange={this.handleChange} id="rating" className="browser-default">
                                    { this.ratingdOptions() }
                                </select>
                            </label>
                        </div>
                        <div className="input-field col s6">
                            <label className="input-field col s12">Category
                                <select onChange={this.handleChange} id="category" className="browser-default" defaultValue={this.state.category}>
                                    {
                                        categories && categories.map(cat=>{
                                           return (
                                               <option key={cat.value}>{cat.value}</option>
                                           )
                                       }) 
                                    }
                                </select>    
                            </label>                    
                        </div>
                    </div>
                    <div className="row upis-sub-but">
                        <div className="input-field col s12">
                            <button className="btn yellowDex lighten-1 z-depth-0">Upiši</button>
                        </div>
                    </div>
                </form>                   
                <div className="col s12 m4 offset-m1 card">
                    <AddCategory categories={categories}/>
                </div>
                </div>             
            </div>:<div className="container"><h5 className="center">Učitavanje....</h5></div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        categories: state.firestore.ordered.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createTodo: (todo) => dispatch(createTodo(todo))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'categories' }
]))(CreateTodo)

