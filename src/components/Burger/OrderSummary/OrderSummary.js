import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    UNSAFE_componentWillUpdate () {
        console.log('[OrderSummary] WillUpdate');
    }

    render() {
        const ingridientSummary = Object.keys(this.props.ingridients)
            .map(ingKey => {
                return (<li key={ingKey}>
                    <span style={{ textTransform: 'capitalize' }}>{ingKey}</span>: {this.props.ingridients[ingKey]}
                </li>);
            });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with these ingredients:</p>
                <ul>
                    {ingridientSummary}
                    <p><strong>TotalPrice: {this.props.price}</strong></p>
                </ul>
                <p>Continue to checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>Continue</Button>
            </Aux>
        );
    }
}

export default OrderSummary;