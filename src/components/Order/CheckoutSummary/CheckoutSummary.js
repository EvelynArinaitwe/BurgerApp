import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../../components/UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Hope it tastes as delicious</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingridients={props.ingridients} />
            </div>
            <Button
                btnType="Danger"
                clicked={props.checkoutCancelled}>Cancel</Button>
            <Button
                btnType="Success"
                clicked={props.checkoutContinued}>Continue</Button>
        </div>
    )
}

export default checkoutSummary;