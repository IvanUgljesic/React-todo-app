const initState = {
    categories: []
}

const todoReducer = (state = initState, action) => {
    switch(action.type){
        case 'ADD_CATEGORY':
            console.log('category added', action.category);
            return state;
        case 'ADD_CATEGORY_ERROR':
            console.log('add category error', action.err);
            return state;
        case 'DELETE_CATEGORY':
            console.log('category added', action.id);
            return state;
        case 'DELETE_CATEGORY_ERROR':
            console.log('add category error', action.err);
            return state;
        default:
            return state;    
    }
}

export default todoReducer