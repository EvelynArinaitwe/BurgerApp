import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildContols';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {
    state = {
        // totalPrice: 20000,
        // purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };


    componentDidMount() {
        console.log(this.props);
        // axios.get('https://burger-app-84f7a.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingridients: response.data });
        //     })
        //     .catch(error => {
        //         this.setState({error: true})
        //     });
    }

    updatePurchaseState(ingridients) {

        const sum = Object.keys(ingridients)
            .map(ingKey => {
                return ingridients[ingKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0 ;
    }
    // addIngridientHandler = (type) => {
    //     const oldCount = this.state.ingridients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngridients = {
    //         ...this.state.ingridients
    //     };
    //     updatedIngridients[type] = updatedCount;
    //     const priceAddition = INGRIDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({ totalPrice: newPrice, ingridients: updatedIngridients });
    //     this.updatePurchaseState(updatedIngridients);
    // }
    // removeIngridientHandler = (type) => {
    //     const oldCount = this.state.ingridients[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngridients = {
    //         ...this.state.ingridients
    //     };
    //     updatedIngridients[type] = updatedCount;
    //     const priceReduction = INGRIDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceReduction;
    //     this.setState({ totalPrice: newPrice, ingridients: updatedIngridients });
    //     this.updatePurchaseState(updatedIngridients);
    // }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        //alert('you continue');
        // const queryParams = [];
        // for (let i in this.state.ingridients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingridients[i]));
        // }

        // queryParams.push('price=' + this.state.totalPrice);
        // const queryString = queryParams.join('&');
        this.props.history.push('/checkout');
        //     search: '?' + queryString
        // });
    }


    render() {
        const disabledInfo = {
            ...this.state.ingridients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.state.error ? <p> Ingredients cannot be loaded!</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingridients={this.props.ings} />
                    <BuildControls
                        ingridientAdded={this.props.onIgridientAdded}
                        ingridientRemoved={this.props.onIgridientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        ordered={this.purchaseHandler}
                        purchasable={this.updatePurchaseState(this.props.ings)} />
                </Aux>
            );

            orderSummary = <OrderSummary
                ingridients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} ModalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }

}

const mapStateToProps = state => {
    return {
        ings: state.ingridients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIgridientAdded: (ingName) => dispatch ({type: actionTypes.ADD_INGRIDIENT, ingridientName: ingName}),
        onIgridientRemoved: (ingName) => dispatch ({type: actionTypes.REMOVE_INGRIDIENT, ingridientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));