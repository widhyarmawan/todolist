import React, { Component } from 'react';
import classes from './Popup.module.scss';
import CSSTransition from 'react-transition-group/CSSTransition';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Icon from '../../components/UI/Icon/Icon';
import Button from '../../components/UI/Button/Button';
import TextArea from '../../components/UI/TextArea/TextArea';

class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    submitClickHandler = () => {
        
    }

    render() {
         
        return (
            <div>
                <div className={classes.Backdrop}>
                    <Backdrop showBackdrop={this.props.show}/>
                </div>
                <CSSTransition
                in={this.props.show}
                mountOnEnter
                unmountOnExit
                timeout={160}
                classNames={{
                    enterActive: classes.Open,
                    exitActive: classes.Close
                }}>
                    <div className={classes.Wrapper}>
                        <div className={classes.Container}>
                            <div className={classes.Head}>
                                <div className={classes.Title}>Title</div>
                                <div className={classes.CloseBtn} onClick={this.props.closeClicked}>
                                    <Icon name="ico-close" stroke="none" fill="#202124" />
                                </div>
                            </div>
                            <div className={classes.Body}>
                                <TextArea placeholder="Type your task..."
                                    value={this.props.task.value}
                                    changed={this.props.inputChanged}
                                    hasError={(this.props.task.hasError && this.props.task.errorMsg !== '')}
                                    errorMsg={this.props.task.errorMsg} />
                            </div>
                            <div className={classes.Foot}>
                                <Button clicked={this.props.submitClicked}>Submit</Button>
                            </div>
                        </div>
                    </div>
                </CSSTransition>
            </div>
        );
    }
}


export default Popup;