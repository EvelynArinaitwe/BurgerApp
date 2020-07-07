import * as actionTypes from './actions';

const initialState = {
    ingridients: {
        salad: 0,
        meat: 0,
        bacon: 0,
        cheese: 0
    },
    totalPrice: 20000,
};

const INGRIDIENT_PRICES = {
    salad: 1000,
    cheese: 5000,
    meat: 8000,
    bacon: 6000
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGRIDIENT:
            return {
                ...state,
                ingridients: {
                    ...state.ingridients,
                    [action.ingridientName]: state.ingridients[action.ingridientName] + 1
                },
                totalPrice: state.totalPrice + INGRIDIENT_PRICES[action.ingridientName]
            };
        case actionTypes.REMOVE_INGRIDIENT:
            return {
                ...state,
                ingridients: {
                    ...state.ingridients,
                    [action.ingridientName]: state.ingridients[action.ingridientName] - 1
                },
                totalPrice: state.totalPrice - INGRIDIENT_PRICES[action.ingridientName]

            };
        default:
            return state;
    }
};

export default reducer;