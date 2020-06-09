import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildContols';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGRIDIENT_PRICES = {
    salad: 1000,
    cheese: 5000,
    meat: 8000,
    bacon: 6000
};

class BurgerBuilder extends Component {
    state = {
        ingridients: {
            salad: 0,
            cheese: 0,
            meat: 0,
            bacon: 0
        },
        totalPrice: 20000,
        purchasable: false,
        purchasing:false
    };

   
    updatePurchaseState(ingridients) {

        const sum = Object.keys(ingridients)
            .map(ingKey => {
                return ingridients[ingKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchasable: sum > 0 });
    }
    addIngridientHandler = (type) => {
        const oldCount = this.state.ingridients[type];
        const updatedCount = oldCount + 1;
        const updatedIngridients = {
            ...this.state.ingridients
        };
        updatedIngridients[type] = updatedCount;
        const priceAddition = INGRIDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingridients: updatedIngridients });
        this.updatePurchaseState(updatedIngridients);
    }
    removeIngridientHandler = (type) => {
        const oldCount = this.state.ingridients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngridients = {
            ...this.state.ingridients
        };
        updatedIngridients[type] = updatedCount;
        const priceReduction = INGRIDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceReduction;
        this.setState({ totalPrice: newPrice, ingridients: updatedIngridients });
        this.updatePurchaseState(updatedIngridients);
    }

    purchaseHandler= () =>{
        this.setState({purchasing:true});
    }

    purchaseCancelHandler= () =>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler= () =>{
        alert('you continue');
    }


    render() {
        const disabledInfo = {
            ...this.state.ingridients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} ModalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                    ingridients = {this.state.ingridients}
                    price = {this.state.totalPrice}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler} />
                </Modal>
                <Burger ingridients={this.state.ingridients} />
                <BuildControls
                    ingridientAdded={this.addIngridientHandler}
                    ingridientRemoved={this.removeIngridientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler}
                    purchasable={this.state.purchasable} />
            </Aux>
        );
    }

}

export default BurgerBuilder;