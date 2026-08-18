import React from 'react'
import { Button,Icon } from 'semantic-ui-react'

const ActionButton = ({ label, iconName, ...props }) => { 

    return(
    <div>
      
            <Button id={props.id}
            onClick={props.clickhandler}
            {...props}>
            {iconName && <Icon name={iconName} />}
            {label}
          </Button>
    </div>
)}
export default ActionButton