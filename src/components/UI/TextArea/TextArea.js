import React from 'react';
import classes from './TextArea.module.scss';
import CSSTransition from 'react-transition-group/CSSTransition';

const textArea = (props) => {
    let inputClasses = [classes.TextArea];
    if (props.hasError) {
        inputClasses.push(classes.HasError);
    }
    return (
        <div className={classes.Wrapper}>
            <textarea 
                className={inputClasses.join(' ')}
                rows="5" 
                disabled={props.disabled}
                value={props.value} 
                onChange={(event) => props.changed(event)} 
                placeholder={props.placeholder}>
            </textarea>
            <CSSTransition
                in={props.hasError}
                mountOnEnter
                unmountOnExit
                timeout={270}
                classNames={{
                    enterActive: classes.Open,
                    exitActive: classes.Close
                }}>
                <span className={classes.ErrorMsg}>{props.errorMsg}</span>
            </CSSTransition>
        </div>
    );
}

export default textArea;