import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { addCategory, deleteCategory } from '../../store/actions/categoryActions'

class AddCategory extends Component{
    constructor (props) {
        super(props)
        this.state = {
            categories:[],
            newCategory:{
                value:'',
                key:''
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
      }
    handleSubmit(e){
        e.preventDefault();
        const newCategory = this.state.newCategory;
        if(newCategory !== ''){
            const newCategories=[...this.state.categories, newCategory];
            this.props.addCategory(newCategory);
            this.setState({
                categories:newCategories,
                newCategory:{
                    value:'',
                    key:''
                }
            })
        }
        console.log(this.state)
    }
    handleChange(e){
        this.setState({
            newCategory:{
                value:e.target.value,
                key:Date.now()
            }
        })
    }
    handleDelete(e){
        //console.log(e.target.id)
        this.props.deleteCategory(e.target.id)
    }
    catOptions(){
        var arr = [];
        var catSorted = this.props.categories.slice().sort()
        for (let i = 0; i < catSorted.length; i++) {
            arr.push(
                <div className="list" key={catSorted[i].value}>
                    <p className="categories" key={catSorted[i].value}>{catSorted[i].value} 
                            <span className="categories-delete" key={catSorted[i].value}>
                                <i className="material-icons" id={catSorted[i].id} onClick={this.handleDelete}>delete</i>
                            </span>
                        </p>                
                </div>)
        }
        return arr;        
    }
    render() {
        const { auth, categories } = this.props;
        console.log(categories)
        return (
            categories ?
            <div className="section">
                    { this.catOptions() }
                <div className="categories-area">
                    <form onSubmit={this.handleSubmit} className="categories-form" id="newCategory">
                        <input placeholder="New category" id="newCategory" type="text" onChange={this.handleChange}/>
                        <button className="btn" type="submit">Add</button>
                    </form>
    
                </div>
            </div>:<div className="container"><h5 className="center">Loading....</h5></div>
        )

    }
}

const mapStateToProps = (state, ownProps) => {
    //const categories = ownProps.categories
    console.log(ownProps)
    console.log(state.firestore.categories)
    return {  
        auth: state.firebase.auth,         
        categories:state.firestore.ordered.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCategory: (category) => dispatch(addCategory(category)),
        deleteCategory: (id) => dispatch(deleteCategory(id))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'categories' }
    ])
)(AddCategory)

