import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStores, addStore, removeStore } from '../store/slices/storeSlice';
import { Container, Header, List, Form, Input, Button, Table, Loader, Message, Icon } from "semantic-ui-react";
import axios from 'axios';
import GenricModal from "../components/GenricModal";
import ActionButton from "../components/ActionButton";
import { storeValidationSchema } from "../validations/storeValidation";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import "../InventoryStore.css";



function Stores() {
    const dispatch = useDispatch();
    const stores = useSelector((state) => state.stores.stores);
    const [open, setOpen] = useState(false);
    const [actionType, setActionType] = useState(''); // 'add' or 'edit']
    const [formData, setFormData] = useState({ storeName: '', storeAddress: '' });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL;

    const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset } = useForm({
        resolver: yupResolver(storeValidationSchema),
        mode: 'onTouched'
    });



    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleAddStore = () => {
        setFormData({ storeName: '', storeAddress: '' }); // Reset form
        setActionType('Add')
        setOpen(true)
        reset({ storeName: '', storeAddress: '' }); // Reset form validation state

    }
    const handleEditStore = (store) => {
        setActionType('Edit')
        setFormData(store)
        setOpen(true)
        reset({ storeName: store.storeName, storeAddress: store.storeAddress }); // Reset form validation state
    }
    const handleDeleteStore = (store) => {
        setActionType('Delete')
        setFormData(store)
        setOpen(true)
        reset({ storeName: store.storeName, storeAddress: store.storeAddress }); // Reset form validation state
    }
    const fetchStores = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${apiUrl}/Store`);
            dispatch(setStores(response.data)); // Update Redux store
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
                await axios.post(`${apiUrl}/Store`, formData);
                dispatch(addStore(formData)); // Update Redux store
                await fetchStores(); // Refresh data after adding
                setOpen(false); // Close modal
            } catch (error) {
                console.error('Error saving data', error);
            }
        } else if (actionType === 'Edit') {
            try {
                await axios.put(`${apiUrl}/Store/${formData.storeId}`, formData);
                dispatch(setStores(stores.map(store => store.storeId === formData.storeId ? formData : store))); // Update Redux store
                await fetchStores(); // Refresh data after editing
                setOpen(false); // Close modal
                setFormData({ storeName: '', storeAddress: '' }); // Reset form
            } catch (error) {
                console.error('Error updating data', error);
            }

        } else if (actionType === 'Delete') {
            try {
                await axios.delete(`${apiUrl}/Store/${formData.storeId}`, {
                    headers: { 'Content-Type': 'application/json' },
                    data: { storeId: formData.storeId }
                });
                dispatch(removeStore(formData.storeId)); // Update Redux store
                await fetchStores(); // Refresh data after deleting
                setOpen(false); // Close modal
                setFormData({ storeName: '', storeAddress: '' }); // Reset form
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
            await fetchStores();
        })();

    }, [dispatch, isSubmitSuccessful, reset]); // Empty dependency array ensures this runs once when the component mounts



    if (loading) {
        return <Loader active inline='centered' />;
    }

    if (error) {
        return <Message negative>Error: {error.message}</Message>;
    }
    const formContent = actionType === 'Delete' ? (
        <p>Are you sure you want to delete this Store ?</p>
    ) : (
        <Form>
            <Form.Field>
                <label>Name</label>
                <Input {...register("storeName")} name="storeName" value={formData.storeName} onChange={handleChange} />
                <p className="error-message">{errors.storeName?.message}</p>
            </Form.Field>
            <Form.Field>
                <label>Location</label>
                <Input {...register("storeAddress")} name="storeAddress" value={formData.storeAddress} onChange={handleChange} />
                <p className="error-message">{errors.storeAddress?.message}</p>
            </Form.Field>
        </Form>
    )
    return (
        <div>
            <Container style={{ marginTop: '998px', display: 'flex', alignItems: 'center' }}>
                <div style={{ marginLeft: '120px' }}>

                    <ActionButton primary
                        style={{ position: 'absolute', top: '70px', paddingBelow: '100px' }}
                        id={"btnAddStore"}
                        type={"button"}
                        label={"Add Store"}
                        clickhandler={handleAddStore}
                        flag={actionType}
                    />


                    <div style={{ marginTop: '100px', marginBottom: '100px' }}>
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
                                {stores.map((store) => (
                                    <Table.Row key={store.storeId}>
                                        <Table.Cell>{store.storeName}</Table.Cell>
                                        <Table.Cell>{store.storeAddress}</Table.Cell>
                                        <Table.Cell>


                                            <ActionButton
                                                circular icon color='yellow'
                                                id={"btnEditStore"}
                                                type={"button"}
                                                label={"Edit"}
                                                iconName={"edit"}
                                                clickhandler={() => handleEditStore(store)}
                                                flag={actionType}
                                            />

                                        </Table.Cell>
                                        <Table.Cell>

                                            <ActionButton
                                                circular icon color='red'
                                                id={"btnDeleteStore"}
                                                type={"button"}
                                                label={"Delete"}
                                                iconName={"trash"}
                                                clickhandler={() => handleDeleteStore(store)}
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
                        title={actionType === 'Add' ? 'Create Store' : actionType === 'Edit' ? 'Edit Store' : 'Delete Store'}
                        label={actionType}
                        formContent={formContent}
                        onSubmit={handleSubmit(onSubmit)} />
                </div>
            </Container>
        </div>
    )
}
export default Stores;