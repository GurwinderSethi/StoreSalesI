import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Container } from 'semantic-ui-react';

const Navbar = () => {
    const [activeItem, setActiveItem] = useState('Customers');

    const handleItemClick = (e, { name }) => setActiveItem(name);

    return (
        <Menu fixed="top" inverted>
            <Container>
                <Menu.Item
                    as={NavLink}
                    to='/'
                    name='Customers'
                    active={activeItem === 'Customers'}
                    onClick={handleItemClick}
                    exact='true'
                >
                    Customers
                </Menu.Item>
                <Menu.Item
                    as={NavLink}
                    to='/Products'
                    name='Products'
                >
                    Products
                </Menu.Item>
                <Menu.Item
                    as={NavLink}
                    to='/Stores'
                    name='Stores'
                >
                    Stores
                </Menu.Item>

                {/* <Menu.Menu position='right'> */}
                <Menu.Item
                    as={NavLink}
                    to='/Sales'
                    name='Sales'
                >Sales</Menu.Item>

                {/* </Menu.Menu> */}
            </Container>
        </Menu>
    );
};

export default Navbar;
