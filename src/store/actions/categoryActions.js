export const addCategory = (category) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('categories').add({
            ...category
        }).then(()=>{
            dispatch({type: 'ADD_CATEGORY', category});
        }).catch((err) => {
            dispatch({type:'ADD_CATEGORY_ERROR', err});
        })
    }
};

export const deleteCategory = (id) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection('categories').doc(id).delete()
        .then(()=>{
            dispatch({type: 'DELETE_CATEGORY', id});
        }).catch((err) => {
            dispatch({type:'DELETE_CATEGORY_ERROR', err});
        })
    }
};
