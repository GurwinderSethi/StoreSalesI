import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, addProduct, removeProduct } from '../store/slices/productSlice';
import { Container, Header, List, Form, Input, Button, Table, Loader, Message, Icon } from "semantic-ui-react";
import axios from 'axios';
import GenricModal from "../components/GenricModal";
import ActionButton from "../components/ActionButton";
import { productValidationSchema } from "../validations/productValidation";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
//import "../InventoryStore.css";
import "./Products.css";

function Products() {
    const dispatch = useDispatch();
    const products = useSelector(( state ) =>  state.products.products);
    const [open, setOpen] = useState(false);
    const [actionType, setActionType] = useState(''); // 'add' or 'edit']
    const [formData, setFormData] = useState({ productName: '', productPrice: '' });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL;

    const
        {
            register,
            handleSubmit,
            formState:
            {
                errors,
                isSubmitSuccessful
            },
            reset,
            setValue
        } = useForm({
        resolver: yupResolver(productValidationSchema),
        mode: 'onSubmit',
        reValidateMode: 'onChange'
        });

    const formatPrice = (price) => {
        if (price === null || price === undefined || price === '') {
            return '';
        }

        return `$${Number(price).toFixed(2)}`;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        setValue(name, value, {
            shouldValidate: true
        });
    };
    const handleAddProduct = () => {
        setFormData({ productName: '', productPrice: '' }); // Reset form
        setActionType('Add')
        setOpen(true)
        reset({ productName: '', productPrice: '' }); // Reset form validation state

    }
    const handleEditProduct = (product) => {
        setActionType('Edit')
        setFormData(product)
        setOpen(true)
        reset({ productName: product.productName, productPrice: product.productPrice }); // Reset form validation state
    }
    const handleDeleteProduct = (product) => {
        setActionType('Delete')
        setFormData(product)
        setOpen(true)
        reset({ productName: product.productName, productPrice: product.productPrice }); // Reset form validation state
    }
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${apiUrl}/Product`);
            dispatch(setProducts(response.data)); // Update Redux store
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
                await axios.post(`${apiUrl}/Product`, formData);
                dispatch(addProduct(formData)); // Update Redux store
                await fetchProducts(); // Refresh data after adding
                setOpen(false); // Close modal
            } catch (error) {
                console.error('Error saving data', error);
            }
        } else if (actionType === 'Edit') {
            try {
                await axios.put(`${apiUrl}/Product/${formData.productId}`, formData);
                dispatch(setProducts(products.map(product => product.productId === formData.productId ? formData : product))); // Update Redux store
                await fetchProducts(); // Refresh data after editing
                setOpen(false); // Close modal
                setFormData({ productName: '', productPrice: '' }); // Reset form
            } catch (error) {
                console.error('Error updating data', error);
            }

        } else if (actionType === 'Delete') {
            try {
                await axios.delete(`${apiUrl}/Product/${formData.productId}`, {
                    headers: { 'Content-Type': 'application/json' },
                    data: { productId: formData.productId }
                });
                dispatch(removeProduct(formData.productId)); // Update Redux store
                await fetchProducts(); // Refresh data after deleting
                setOpen(false); // Close modal
                setFormData({ productName: '', productPrice: '' }); // Reset form
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
            await fetchProducts();
        })();

    }, [dispatch, isSubmitSuccessful, reset]); // Empty dependency array ensures this runs once when the component mounts



    if (loading) {
        return <Loader active inline='centered' />;
    }

    if (error) {
        return <Message negative>Error: {error.message}</Message>;
    }
    const formContent = actionType === 'Delete' ? (
        <p>Are you sure you want to delete this Product ?</p>
    ) : (
        <Form>
            <Form.Field>
                <label>Name</label>
                <Input {...register("productName")} name="productName" value={formData.productName} onChange={handleChange} />
                <p className="error-message">{errors.productName?.message}</p>
            </Form.Field>
            <Form.Field>
                <label>Price</label>
                <Input {...register("productPrice")} name="productPrice" value={formData.productPrice} onChange={handleChange} />
                <p className="error-message">{errors.productPrice?.message}</p>
            </Form.Field>
        </Form>
    )
    return (
        <div>
            <Container className="products-container">
                <div className="products-content">
                    <div className="products-header">
                    <ActionButton primary
                        id={"btnAddProduct"}
                        type={"button"}
                        label={"Add Product"}
                        clickhandler={handleAddProduct}
                        flag={actionType}
                    />
                    </div>

                    <div className="products-table-wrapper">
                        <Table celled striped stackable className="products-table">
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Price</Table.HeaderCell>
                                    <Table.HeaderCell>Actions</Table.HeaderCell>
                                    <Table.HeaderCell>Actions</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {products.map((product) => (
                                    <Table.Row key={product.productId}>
                                        <Table.Cell data-label="Name">
                                            {product.productName}
                                        </Table.Cell>
                                        <Table.Cell data-label="Price">
                                            {formatPrice(product.productPrice)}
                                        </Table.Cell>
                                        <Table.Cell data-label="Edit">
                                            <ActionButton
                                                icon color='yellow'
                                                id={"btnEditProduct"}
                                                type={"button"}
                                                label={"Edit"}
                                                iconName={"edit"}
                                                clickhandler={() => handleEditProduct(product)}
                                                flag={actionType}
                                                className="products-action-button"
                                            />

                                        </Table.Cell>
                                        <Table.Cell data-label="Delete">
                                            <ActionButton
                                                icon color='red'
                                                id={"btnDeleteProduct"}
                                                type={"button"}
                                                label={"Delete"}
                                                iconName={"trash"}
                                                clickhandler={() => handleDeleteProduct(product)}
                                                flag={actionType}
                                                className="products-action-button"
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
                        title={actionType === 'Add' ? 'Create Product' : actionType === 'Edit' ? 'Edit Product' : 'Delete Product'}
                        label={actionType}
                        formContent={formContent}
                        onSubmit={handleSubmit(onSubmit)} />
                </div>
            </Container>
        </div>
    )
}
export default Products;