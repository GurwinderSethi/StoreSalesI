import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCustomers,addCustomer,removeCustomer } from '../store/slices/customerSlice';
import { Container, Header, List, Form, Input, Button,Table,Loader,Message,Icon } from "semantic-ui-react";
import axios from 'axios';
import GenricModal from "../components/GenricModal";
import ActionButton from "../components/ActionButton";
import { customerValidationSchema } from "../validations/customerValidation"; 
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import "../InventoryStore.css"; 



function Customers() {
    const dispatch = useDispatch();
    const customers = useSelector((state) => state.customers.customers);
    const [open, setOpen] = useState(false);
    const [actionType, setActionType] = useState(''); // 'add' or 'edit']
    const [formData, setFormData] = useState({ customerName: '', customerAddress: '' });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL;

    const { register, handleSubmit, formState: { errors,isSubmitSuccessful},reset } = useForm({
        resolver: yupResolver(customerValidationSchema),
        mode:'onTouched'
    });


   
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleAddCustomer = () => {
        setFormData({ customerName: '', customerAddress: '' }); // Reset form
        setActionType('Add')
        setOpen(true)
        reset({ customerName: '', customerAddress: '' }); // Reset form validation state
        
    }
    const handleEditCustomer = (customer) => {
        setActionType('Edit')
        setFormData(customer)   
        setOpen(true)
        reset({ customerName: customer.customerName, customerAddress: customer.customerAddress }); // Reset form validation state
    }
    const handleDeleteCustomer = (customer) => {
        setActionType('Delete')
        setFormData(customer)
        setOpen(true)
        reset({ customerName: customer.customerName, customerAddress: customer.customerAddress }); // Reset form validation state
    }
    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${apiUrl}/Customer`);
            dispatch(setCustomers(response.data)); // Update Redux store
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error);
            setLoading(false);
        }
    };
    const onSubmit = async () => {
        if (actionType === 'Add') {
            try {
                await axios.post(`${apiUrl}/Customer`, formData);
                dispatch(addCustomer(formData)); // Update Redux store
                await fetchCustomers(); // Refresh data after adding
                setOpen(false); // Close modal
            } catch (error) {
                console.error('Error saving data', error);
            }
        } else if (actionType === 'Edit') {
            try {
                await customerValidationSchema.validate(formData);
                await axios.put(`${apiUrl}/Customer/${formData.customerId}`, formData);
                await fetchCustomers(); // Refresh data after editing
                setOpen(false); // Close modal
                setFormData({ customerName: '', customerAddress: '' }); // Reset form
            } catch (error) {
                console.error('Error updating data', error);
            }

        } else if (actionType === 'Delete') {
            try {
                await axios.delete(`${apiUrl}/Customer/${formData.customerId}`, {
                    headers: { 'Content-Type': 'application/json' },
                    data: { customerId: formData.customerId } });
                dispatch(removeCustomer(formData.customerId)); // Update Redux store
                await fetchCustomers(); // Refresh data after deleting
                setOpen(false); // Close modal
                setFormData({ customerName: '', customerAddress: '' }); // Reset form
            } catch (error) {
                console.error('Error deleting data', error);
            }
        }
    }


    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
          }

        (async () => {
            await fetchCustomers();
        })();

    }, [dispatch,isSubmitSuccessful,reset]); // Empty dependency array ensures this runs once when the component mounts

    

    if (loading) {
        return <Loader active inline='centered' />;
    }

    if (error) {
        return <Message negative>Error: {error.message}</Message>;
    }
    const formContent = actionType === 'Delete' ? (
        <p>Are you sure you want to delete this Customer ?</p>
    ) : (
            <Form>
                <Form.Field>
                    <label>Name</label>
                    <Input {...register("customerName")} name="customerName" value={formData.customerName} onChange={handleChange} />
                    <p className="error-message">{errors.customerName?.message}</p>
                </Form.Field>
                <Form.Field>
                    <label>Address</label>
                    <Input {...register("customerAddress")} name="customerAddress" value={formData.customerAddress} onChange={handleChange} />
                    <p className="error-message">{errors.customerAddress?.message}</p>
                </Form.Field>
            </Form>
    )
    return (
        <div>
            <Container style={{ marginTop: '998px', display: 'flex', alignItems: 'center'}}>
                <div style={{ marginLeft: '120px' }}>
                   
                    <ActionButton primary
                        style={{ position: 'absolute', top: '70px', paddingBelow: '100px' }}
                        id={"btnAddCustomer"}
                        type={"button"}
                        label={"Add Customer"}
                        clickhandler={handleAddCustomer}
                        flag={actionType}
                    />
                           
                   
                    <div style={{ marginTop: '100px' ,marginBottom:'100px' }}>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Address</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {customers.map((user) => (
                                <Table.Row key={user.customerId}>
                                    <Table.Cell>{user.customerName}</Table.Cell>
                                    <Table.Cell>{user.customerAddress}</Table.Cell>
                                    <Table.Cell>
                                      

                                        <ActionButton
                                            circular icon color='yellow'
                                            id={"btnEditCustomer"}
                                            type={"button"}
                                            label={"Edit"}
                                            iconName={"edit"}
                                            clickhandler={() => handleEditCustomer(user)}
                                            flag={actionType}
                                        />
                                               
                                    </Table.Cell>
                                    <Table.Cell>
                                      
                                        <ActionButton
                                            circular icon color='red'
                                            id={"btnDeleteCustomer"}    
                                            type={"button"}
                                            label={"Delete"}
                                            iconName={"trash"} 
                                            clickhandler={() => handleDeleteCustomer(user)}
                                            flag={actionType}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                        </Table>
                    </div>
                </div>
                <div>
                    <GenricModal
                        open={open}
                        setOpen={setOpen}
                        title={actionType === 'Add' ? 'Create Customer':actionType === 'Edit'? 'Edit Customer':'Delete Customer'} 
                        label={actionType}
                        formContent={formContent}
                        onSubmit={handleSubmit(onSubmit)}/>   
                </div>
            </Container>
        </div>
    )
}
export default Customers;