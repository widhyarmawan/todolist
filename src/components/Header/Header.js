import React, { Component } from 'react';
import classes from './Header.module.scss';
import logoSrc from '../../assets/images/logo.svg';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div className={classes.Wrapper}>
                <div className={classes.Container}>
                    <img className={classes.Img} src={logoSrc} alt="logo" />
                </div>
            </div>
        );
    }
}

export default Header;