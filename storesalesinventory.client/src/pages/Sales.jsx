import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSales, addSale, removeSale } from '../store/slices/saleSlice';
import { setCustomers } from '../store/slices/customerSlice';
import { setProducts } from '../store/slices/productSlice'; 
import { setStores } from '../store/slices/storeSlice'; 
import { Container, Header, List, Form, Input, Button, Table, Loader, Message, Icon,Dropdown } from "semantic-ui-react";
import axios from 'axios';
import GenricModal from "../components/GenricModal";
import ActionButton from "../components/ActionButton";
import { saleValidationSchema } from "../validations/salesValidation";
import { useForm,Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import "../InventoryStore.css";



function Sales() {
    const dispatch = useDispatch();
    const sales = useSelector((state) => state.sales.sales);
    const customers = useSelector((state) => state.customers.customers);
    const products = useSelector((state) => state.products.products);
    const stores = useSelector((state) => state.stores.stores);
   
    const [open, setOpen] = useState(false);
    const [actionType, setActionType] = useState(''); // 'add' or 'edit']
    const [formData, setFormData] = useState({
        saleId: 0,
        product_Id: 0,
        customer_Id : 0,
        store_Id: 0,
        dateSold: '',
        customerName: '',
        productName: '',
        storeName: ''
    });
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL;
   

    const { register,control, handleSubmit, formState: { errors, isSubmitSuccessful }, reset } = useForm({
        resolver: yupResolver(saleValidationSchema),
        mode: 'onTouched'
       
    });
    
    const customerOptions = customers.map(customer => ({
        key: customer.customerId,
        text: customer.customerName,
        value: customer.customerId
    }));
    
    const productOptions = products.map(product => ({
        key: product.productId,
        text: product.productName,
        value: product.productId
    }));
   
    const storeOptions = stores.map(store => ({
        key: store.storeId,
        text: store.storeName,
        value: store.storeId
    }));
   

    
    const handleChange = (e, { name, value}) => {
       
        if (name === 'customer') {
            customerOptions.forEach(option => {
                if (option.value === value) {
                   
                    setFormData((prev) => ({ ...prev, customerName: option.text, customer_Id: option.value }));
                   
                }
            });
        }
        if (name === 'product') {
            productOptions.forEach(option => {
                if (option.value === value) {
                   
                    setFormData((prev) => ({ ...prev, productName: option.text, product_Id: option.value }));
                   
                }
            });
        }
        if (name === 'store') {
            storeOptions.forEach(option => {
                if (option.value === value) {
                    
                    setFormData((prev) => ({ ...prev, storeName: option.text, store_Id: option.value }));
                    
                }
            });
        }
        if (name === 'dateSold') {
          
            setFormData((prev) => ({ ...prev, dateSold: value }));
            
        }
    };
    const handleAddSale = () => {
       
        setFormData({
            saleId: 0, product_Id: formData.product_Id, customer_Id: formData.customerId,
            store_Id: formData.store_Id, customerName: formData.customerName, productName: formData.productName, storeName: formData.storeName, dateSold: formData.dateSold
        }); // Reset form
        //setFormData({
        //      customerName: '', productName:'', storeName: '', dateSold: ''
        //});
       
        setActionType('Add')
        setOpen(true)
        reset({ customerName: '', productName: '', storeName: '', dateSold: '' }); // Reset form validation state
        //reset({
        //    saleId: 0, product_Id: formData.productId, customer_Id: formData.customerId,
        //    store_Id: formData.storeId, customerName: formData.customerName, productName: formData.productName, storeName: formData.storeName, dateSold: formData.dateSold
        //})

    }
    const handleEditSale = (sale) => {
        setActionType('Edit')
        setFormData(sale)
        setOpen(true)
           reset({ customerName: sale.customerName, productName: sale.productName, storeName: sale.storeName, dateSold: sale.dateSold }); // Reset form validation state
    }
    const handleDeleteSale = (sale) => {
        setActionType('Delete')
        setFormData(sale)
        setOpen(true)
        reset({ customerName: sale.customerName, productName: sale.productName, storeName: sale.storeName, dateSold: sale.dateSold }); // Reset form validation state
    }
    const fetchSales = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${apiUrl}/Sale`);
            const customersResponse = await axios.get(`${apiUrl}/Customer`);
            const productsResponse = await axios.get(`${apiUrl}/Product`);
            const storesResponse = await axios.get(`${apiUrl}/Store`);
            dispatch(setSales(response.data)); // Update Redux store
            dispatch(setCustomers(customersResponse.data)); // Update Redux store with customers
            dispatch(setProducts(productsResponse.data)); // Update Redux store with products
            dispatch(setStores(storesResponse.data)); // Update Redux store with stores
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
                
                await axios.post(`${apiUrl}/Sale`, formData);
                dispatch(addSale(formData)); // Update Redux store
                await fetchSales(); // Refresh data after adding
                setOpen(false); // Close modal
                //setFormData({ customerName: '', customerAddress: '' }); // Reset form
            } catch (error) {
                console.error('Error saving data', error);
            }
        } else if (actionType === 'Edit') {
            
            try {
                await saleValidationSchema.validate(formData);
                await axios.put(`${apiUrl}/Sale/${formData.saleId}`, formData);
                await fetchSales(); // Refresh data after editing
                setOpen(false); // Close modal
                setFormData({ customerName: '', productName: '', storeName: '', dateSold: '' }); // Reset form
            } catch (error) {
                console.error('Error updating data', error);
            }

        } else if (actionType === 'Delete') {
           
            try {
                await axios.delete(`${apiUrl}/Sale/${formData.saleId}`, {
                    headers: { 'Content-Type': 'application/json' },
                    data: { saleId: formData.saleId }
                });
                dispatch(removeSale(formData.saleId)); // Update Redux store
                await fetchSales(); // Refresh data after deleting
                setOpen(false); // Close modal
                setFormData({ customerName: '', productName: '', storeName: '', dateSold: '' }); // Reset form
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
            await fetchSales();
        })();

    }, [dispatch, isSubmitSuccessful, reset]); // Empty dependency array ensures this runs once when the component mounts



    if (loading) {
        return <Loader active inline='centered' />;
    }

    if (error) {
        return <Message negative>Error: {error.message}</Message>;
    }
    const formContent = actionType === 'Delete' ? (
        <p>Are you sure you want to delete this Sale?</p>
    ) : (
        <Form>
                <Form.Field>
                    <label> Date Sold</label>
                    <Input type="datetime-local" {...register("dateSold")} name="dateSold" value={formData.dateSold} onChange={handleChange} />
                    
                    
                    <p className="error-message">{errors.dateSold?.message}</p>
                 </Form.Field>
                 <Form.Field>
                    <label>Customer</label>
                   
                   
                    <Controller
                        name="customer"
                        control={control}
                        render={({ field }) => (
                            <Form.Dropdown
                                {...field}
                                 fluid
                                selection  
                                 search
                                 options={customerOptions}
                                placeholder='Select Customer'
                                onChange={handleChange}
                                value={field.value}
                               
                                
                              />
                        )}
                    />
                  <p className="error-message">{errors.customer?.message}</p>
                </Form.Field>
            
           
                <Form.Field>
                    <label>Product</label>
                   
                    <Controller
                        name="product"
                        control={control}
                        render={({ field }) => (
                            <Form.Dropdown
                                fluid
                                selection
                                search
                                options={productOptions}
                                placeholder='Select Product'
                                name={field.name}
                                value={field.value}
                                onChange={handleChange}
                            />
                        )}
                    />
                    <p className="error-message">{errors.product?.message}</p>
                </Form.Field>
          
                <Form.Field>
                    <label>Store</label>
                   
                    <Controller
                        name="store"
                        control={control}
                        render={({ field }) => (
                            <Form.Dropdown
                                fluid
                                selection
                                search
                                options={storeOptions}
                                placeholder='Select Store'
                                name={field.name}
                                value={field.value}
                                onChange={handleChange}
                            />
                        )}
                    />
                    <p className="error-message">{errors.store?.message}</p>
                </Form.Field>
        </Form>
    )
    return (
        <div>
            <Container style={{ marginTop: '998px', display: 'flex', alignItems: 'center' }}>
                <div style={{ marginLeft: '120px' }}>

                    <ActionButton primary
                        style={{ position: 'absolute', top: '70px', paddingBelow: '100px' }}
                        id={"btnAddSale"}
                        type={"button"}
                        label={"Add Sale"}
                        clickhandler={handleAddSale}
                        flag={actionType}
                    />


                    <div style={{ marginTop: '100px', marginBottom: '100px' }}>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Customer</Table.HeaderCell>
                                    <Table.HeaderCell>Product</Table.HeaderCell>
                                    <Table.HeaderCell>Store</Table.HeaderCell>
                                    <Table.HeaderCell>Date Sold</Table.HeaderCell>
                                    <Table.HeaderCell>Actions</Table.HeaderCell>
                                    <Table.HeaderCell>Actions</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {sales.map((sale) => (
                                    <Table.Row key={sale.id}>
                                        <Table.Cell>{sale.customerName}</Table.Cell>
                                        <Table.Cell>{sale.productName}</Table.Cell>
                                        <Table.Cell>{sale.storeName}</Table.Cell>
                                        <Table.Cell>{sale.dateSold}</Table.Cell>
                                        <Table.Cell>


                                            <ActionButton
                                                circular icon color='yellow'
                                                id={"btnEditSale"}
                                                type={"button"}
                                                label={"Edit"}
                                                iconName={"edit"}
                                                clickhandler={() => handleEditSale(sale)}
                                                flag={actionType}
                                            />

                                        </Table.Cell>
                                        <Table.Cell>

                                            <ActionButton
                                                circular icon color='red'
                                                id={"btnDeleteSale"}
                                                type={"button"}
                                                label={"Delete"}
                                                iconName={"trash"}
                                                clickhandler={() => handleDeleteSale(sale)}
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
                        title={actionType === 'Add' ? 'Create Sale' : actionType === 'Edit' ? 'Edit Sale' : 'Delete Sale'}
                        label={actionType}
                        formContent={formContent}
                        onSubmit={handleSubmit(onSubmit)} />
                </div>
            </Container>
        </div>
    )
}
export default Sales;