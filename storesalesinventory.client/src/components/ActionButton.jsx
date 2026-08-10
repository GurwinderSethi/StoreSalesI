import React from 'react'
import { Button,Icon } from 'semantic-ui-react'

const ActionButton = ({ label, iconName, ...props }) => { 
    console.log('ActionButton props:', { label, iconName, ...props }) 
    console.log('ActionButton type:', props.type);
    return(
    <div>
        {/* <Button primary onClick={() => alert(123)}>New Customer</Button> */}
        {/*<Button {...props}*/}
        {/*    id={props.id}*/}
        {/*    onClick={props.clickHandler}*/}
        {/*    type={props.type}*/}
        {/*>{props.value}</Button>*/}
            <Button id={props.id}
            onClick={props.clickhandler}
            {...props}>
            {iconName && <Icon name={iconName} />}
            {label}
          </Button>
    </div>
)}
export default ActionButton