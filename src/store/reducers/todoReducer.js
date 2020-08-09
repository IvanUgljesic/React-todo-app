const initState = {
    todos: []
}

const todoReducer = (state = initState, action) => {
    switch(action.type){
        case 'CREATE_TODO':
            console.log('creating todo', action.todo);
            return state;
        case 'CREATE_TODO_ERROR':
            console.log('create todo error', action.err);
            return state;
        case 'DELETE_TODO':
            console.log('delete todo', action.id)
            return state;
        case 'DELETE_TODO_ERROR':
            console.log('delete todo error', action.err);
            return state;
        case 'EDIT_TODO':
            console.log('edit todo', action.id)
            return state;
        case 'EDIT_TODO_ERROR':
            console.log('edit todo error', action.err);
            return state;
        default:
            return state;    
    }
}

export default todoReducer