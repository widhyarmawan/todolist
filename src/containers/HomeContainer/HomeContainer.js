import React, { Component } from 'react';
import classes from './HomeContainer.module.scss';
import Header from '../../components/Header/Header';
import Icon from '../../components/UI/Icon/Icon';
import Popup from '../../components/Popup/Popup';
import Button from '../../components/UI/Button/Button';
import * as validation from '../../components/Helpers/Validation';
import { connect } from 'react-redux';
import * as todoAction from '../../redux/Todo/TodoAction';

class HomeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            showPopup: false,
            key: null,
            task: {
                value: '',
                hasError: true,
                errorMsg: '',
                rules : {
                    required: true
                }
            } 
        };
    }

    componentDidMount() {
        this.props.initTodoList();
    }
    
    taskChangeHandler = event => {
        this.validate(event.target.value);
    }

    validate = (val) => {
        let task = {...this.state.task};
        let validate = validation.validate(task.rules, val);
        task = {...task, ...validate};
        this.setState({task});
    }

    submitClickHandler = () => {
        this.validate(this.state.task.value);
        if (this.state.task.hasError) {
            return false;
        }
        const item = {
            text: this.state.task.value
        }
        this.props.submitHandler(this.state.key, item);
        this.hidePopupHandler();
    }
    

    showPopupHandler = () => {
        this.setState({showPopup: true});
    }

    hidePopupHandler = () => {
        const task = {...this.state.task, ...{
            value: '',
            hasError: true,
            errorMsg: '',
            }};
        this.setState({showPopup: false, key: null, task});
    }

    addNewHandler = () => {
        const task = this.state.task;
        task.value = '';
        this.setState({task});
        this.showPopupHandler();
    }
    
    editHandler = (item) => {
        const task = this.state.task;
        task.value = item.text;
        this.setState({task, key: item.key});
        this.showPopupHandler();
    }

    render() {
        if (!this.props.todoList) {
            return null;
        }

        const toDoList = this.props.todoList.map( (item, index) => {
            return (
                <li key={index} className={classes.Item}>
                    <div className={classes.Label} onClick={() => this.editHandler(item)}>{item.text}</div>
                    <div className={classes.Action} onClick={() => this.props.deleteHandler(item.key)}>
                        <Icon name="ico-close" fill="#333333" stroke="none" />
                    </div>
                </li>
            );
        });
        return (
            <div>
                <Popup 
                    show={this.state.showPopup}
                    task={this.state.task}
                    inputChanged={event => this.taskChangeHandler(event)}
                    closeClicked={this.hidePopupHandler}
                    submitClicked={this.submitClickHandler} />
                <div className={classes.Header}>
                    <Header />
                </div>
                <div className={classes.Wrapper}>
                    <div className={classes.Content}>
                        <div className={classes.Head}>
                            <div className={classes.Title}>To Do List</div>
                            <Button clicked={this.addNewHandler}>Add New</Button>
                        </div>
                        <ul className={classes.List}>
                            {toDoList}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        todoList : state.todoReducer.todoList,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submitHandler : (key, item) => dispatch(todoAction.onSubmit(key, item)),
        deleteHandler : (key) => dispatch(todoAction.onDelete(key)),
        initTodoList : () => dispatch(todoAction.initTodoList()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);