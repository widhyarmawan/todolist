import React from 'react';
import classes from './Backdrop.module.scss';
import CSSTransition from 'react-transition-group/CSSTransition';

const backdrop = (props) => {
    return (
        <CSSTransition
            in={props.showBackdrop}
            mountOnEnter
            unmountOnExit
            timeout={270}
            classNames={{
                enterActive: classes.Open,
                exitActive: classes.Close
            }}>
            <div className={classes.Backdrop} onClick={props.backdropClicked}></div>
        </CSSTransition>
    );
}

export default backdrop;