import React from 'react';

import classes from './Order.css'

const order = (props) => {
    const ingridients = [];

    for (let ingridientName in props.ingridients) {
        ingridients.push(
            {
                name: ingridientName,
                amount: props.ingridients[ingridientName]
            }
        )
    }

    const ingridientOutput = ingridients.map(ing => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={ing.name}>{ing.name} ({ing.amount})</span>
    })

    return (
        <div className={classes.Order}>
            <p>Ingeredients: {ingridientOutput}</p>
            <p>Price: <strong>USh {props.price}</strong></p>
        </div>
    );

};

export default order;