import {updateObject} from '../utility';

const initialState = {
    todoList : [],
    isErrorFetchTodoList : false,
}

const setTodoList = (state, action) => {
    return updateObject( state, {
        todoList: action.todoList,
        isErrorFetchTodoList : false
    } );
};

const fetchTodoListFailed = (state, action) => {
    return updateObject(state, {isErrorFetchTodoList: true});
}

const deleteItem = (state, action) => {
    let todoList = [...state.todoList];
    let index = todoList.findIndex( item => {
        return item.key === action.key;
    });
    todoList.splice(index, 1);
    return updateObject(state, {todoList});
}

const editItem = (state, action) => {
    let todoList = [...state.todoList];
    let index = todoList.findIndex( item => {
        return item.key === action.payload.key;
    });
    todoList[index].text = action.payload.text;
    return updateObject(state, {todoList});
}

const addNew = (state, action) => {
    let todoList = [...state.todoList];
    todoList.push(action.newItem);
    return updateObject(state, {todoList});
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case 'SET_TODO_LIST': return setTodoList(state, action);
        case 'FETCH_TODO_LIST_FAILED': return fetchTodoListFailed(state, action);
        case 'DELETE': return deleteItem(state, action);
        case 'ADD': return addNew(state, action);
        case 'EDIT': return editItem(state, action);
        default: return state;
    }
};

export default reducer;