import React from 'react';

import BuildControl from '../BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls = [
    {label:'Salad', type : 'salad'},
    {label:'Cheese', type : 'cheese'},
    {label:'Meat', type : 'meat'},
    {label:'Bacon', type : 'bacon'},

];

const buildControls = (props) => {
    return (
    <div className={classes.BuildControls}>
        <p>Current price USh: <strong>{props.price}</strong></p>
        {controls.map(ctrl =>(
            <BuildControl 
            key={ctrl.label} 
            label={ctrl.label} 
            added={() => props.ingridientAdded(ctrl.type)}
            removed={() => props.ingridientRemoved(ctrl.type)}
            disabled= {props.disabled[ctrl.type]}/>
        ))}
        <button 
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}>Order Now</button>
    </div>
);
    }

export default buildControls;