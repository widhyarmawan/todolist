import axios from '../../axios';

export const setTodoList = ( todoList ) => {
    return {
        type: 'SET_TODO_LIST',
        todoList
        
    };
};

export  const fetchTodoListFailed = () => {
    return {
        type: 'FETCH_TODO_LIST_FAILED'
    }
}

export  const deleteItem = (key) => {
    return {
        type: 'DELETE',
        key
    }
}

export  const addNew = (newItem) => {
    return {
        type: 'ADD',
        newItem
    }
}

export  const editItem = (key, text) => {
    return {
        type: 'EDIT',
        payload: {key, text}
    }
}


export const initTodoList = () => {
    return dispatch => {
        axios.get('todolist.json')
            .then( response => {
                if (response.status === 200){
                    let todoList = [];
                    if (response.data) {
                        Object.keys(response.data).forEach( key => {
                            todoList.push({...response.data[key], ...{key}}); 
                        });
                    }
    
                    dispatch(setTodoList(todoList));
                }
            } )
            .catch( error => {
                //case error
                dispatch(fetchTodoListFailed());
            } );
    };
};

export const onDelete = (key) => {
    return dispatch => {
        axios.delete('todolist/'+key+'.json')
            .then( response => {
                if (response.status === 200){
                    dispatch(deleteItem(key));
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
};


export const onSubmit = (key, item) => {
    if (key) {
        return dispatch => {
            axios.put('todolist/'+key+'.json', item)
                .then( response => {
                    if (response.status === 200){
                        dispatch(editItem(key, item.text));
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    } else {
        return dispatch => {
            axios.post('todolist.json', item)
                .then( response => {
                    if (response.status === 200){
                        let newItem = {
                            key : response.data.name,
                            text : item.text
                        };
                        dispatch(addNew(newItem));
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
};