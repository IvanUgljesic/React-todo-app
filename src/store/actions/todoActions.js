export const createTodo = (todo) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {//we can use function here coz of thunk   
        //make async call to DB
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('todos').add({
            ...todo,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(()=>{
            dispatch({type: 'CREATE_TODO', todo});
        }).catch((err) => {
            dispatch({type:'CREATE_TODO_ERROR', err});
        })
    }
};

export const deleteTodo = (id) => {
    return (dispatch, getState, {getFirestore} ) => {
        const firestore = getFirestore();
        firestore.collection('todos').doc(id).delete()
        .then(() => {
            dispatch({ type: 'DELETE_TODO', id});
        }).catch((err)=>{
            dispatch({type:'DELETE_TODO_ERROR',err});
        })
    }
}

export const editTodo = (todo, id) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('todos').doc(id).update({            
            ...todo,
            createdAt: new Date()
        })
        .then(() => {
             dispatch({ type: 'EDIT_TODO', todo, id });
         }).catch((err) => {
             dispatch({ type: 'EDIT_TODO_ERROR', err});
         })
    }
}