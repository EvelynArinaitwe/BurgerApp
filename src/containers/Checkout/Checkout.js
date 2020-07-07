import React, { Component} from 'react';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {
    // state = {
    //     ingridients: null,
    //     price: 0
    // }

    // UNSAFE_componentWillMount () {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingridients ={};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         if(param[0]=== 'price') {
    //             price = param[1];
    //         } else {
    //             ingridients[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState({ingridients: ingridients, totalPrice: price});
    // }

    checkoutContinuedHandler =() => {
        this.props.history.replace('/checkout/contact-data');
    }

    checkoutCancelledHandler = () =>{
        this.props.history.goBack();
    }

    render () {
        return (
            <div>
                <CheckoutSummary 
                    ingridients={this.props.ings}
                    checkoutContinued={this.checkoutContinuedHandler}
                    checkoutCancelled={this.checkoutCancelledHandler}/>
                    <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData} />
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        ings: state.ingridients,
    }
};

export default connect(mapStateToProps)(Checkout);