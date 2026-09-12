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
//import "../InventoryStore.css";
import "./Sales.css";



function Sales() {
    const dispatch = useDispatch();
    const sales = useSelector((state) => state.sales.sales);
    const customers = useSelector((state) => state.customers.customers);
    const products = useSelector((state) => state.products.products);
    const stores = useSelector((state) => state.stores.stores);
   
    const [open, setOpen] = useState(false);
    const [actionType, setActionType] = useState(''); // 'add' or 'edit']
    const [formData, setFormData] = useState({
       // saleId: 0,
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
        mode: 'onTouched',
        defaultValues: {
            customer: '',
            product: '',
            store: '',
            dateSold: ''
        },
       
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
        console.log('handleChange called with name:', name, 'and value:', value);
       
        
        
        if (name === 'dateSold') {
          
            setFormData((prev) => ({ ...prev, dateSold: value }));
            console.log('Updated formData with dateSold:', formData);
        }
    };
    const handleAddSale = () => {
       
        setFormData({
            product_Id: formData.product_Id, customer_Id: formData.customer_Id,
            store_Id: formData.store_Id, dateSold: formData.dateSold, customerName: formData.customerName, productName: formData.productName, storeName: formData.storeName
           
        }); // Reset form
        
       
        setActionType('Add')
        setOpen(true)
        reset({ customer: '', product: '', store: '', dateSold: '' }); // Reset form validation state
        
        console.log('handleAddSale called, formData reset to:', formData);
    }
    const handleEditSale = (sale) => {
        setActionType('Edit')
        setFormData(sale)
        setOpen(true)
        reset({ customer: sale.customerName, product: sale.productName, store: sale.storeName, dateSold: sale.dateSold }); // Reset form validation state
    }
    const handleDeleteSale = (sale) => {
        setActionType('Delete')
        setFormData(sale)
        setOpen(true)
        reset({ customer: sale.customerName, product: sale.productName, store: sale.storeName, dateSold: sale.dateSold }); // Reset form validation state
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
                console.log('Submitting formData for addition:', formData);
                await axios.post(`${apiUrl}/Sale`, formData);
                dispatch(addSale(formData)); // Update Redux store
                await fetchSales(); // Refresh data after adding
                setOpen(false); // Close modal
                
            } catch (error) {
                console.error('Error saving data', error);
            }
        } else if (actionType === 'Edit') {
            
            try {
               // await saleValidationSchema.validate(formData);
                await axios.put(`${apiUrl}/Sale/${formData.saleId}`, formData);
                await fetchSales(); // Refresh data after editing
                setOpen(false); // Close modal
               
                setFormData({
                    product_Id: 0, customer_Id: 0,
                    store_Id:0, dateSold: '', customerName: '', productName: '', storeName: ''
                }); // Reset form
            } catch (error) {
                console.error('Error updating data', error);
            }

        } else if (actionType === 'Delete') {
            console.log('Deleting sale with ID:', formData.saleId);
           
            try {
                await axios.delete(`${apiUrl}/Sale/${formData.saleId}`, {
                    headers: { 'Content-Type': 'application/json' },
                    data: {
                        saleId: formData.saleId,
                        "product_Id": formData.product_Id,
                        "customer_Id": formData.customer_Id,
                        "store_Id": formData.store_Id,
                        "dateSold": formData.dateSold,
                        "customerName": formData.customerName,
                        "productName": formData.productName,
                        "storeName": formData.storeName
                    }
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
                    <Input fluid type="datetime-local" {...register("dateSold")} name="dateSold" value={formData.dateSold} onChange={handleChange} />
                    {errors.dateSold &&( <p className="error-message">{errors.dateSold?.message}</p>)}
                 </Form.Field>
                 <Form.Field>
                    <label>Customer</label>
                   
                   
                    <Controller
                        name="customer"
                        control={control}
                        render={({ field }) => (
                            <Form.Dropdown

                                 fluid
                                selection  
                                 search
                                 options={customerOptions}
                                placeholder='Select Customer'
                                value={field.value||''}
                                onChange={(e, data) => {
              const selectedCustomer = customerOptions.find(
                option => option.value === data.value
              );

              field.onChange(data.value);

              if (selectedCustomer) {
                setFormData(prev => ({
                  ...prev,
                  customerName: selectedCustomer.text,
                  customer_Id: selectedCustomer.value,
                }));
              }
            }}
          />
        )}
      />
                    {/*<p className="error-message">{errors.customer?.message}</p>*/}
                    {errors.customer && (
                        <p className="error-message">
                            {errors.customer.message}
                        </p>
                    )}
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
                                value={field.value||''}
                                onChange={(e, data) => {
                                    const selectedProduct = productOptions.find(
                                        option => option.value === data.value
                                    );

                                    field.onChange(data.value);

                                    if (selectedProduct) {
                                        setFormData(prev => ({
                                            ...prev,
                                            productName: selectedProduct.text,
                                            product_Id: selectedProduct.value,
                                        }));
                                    }
                                }}
                            />
                        )}
                    />
                    {errors.product && (<p className="error-message">{errors.product?.message}</p>)}
                </Form.Field>
          
                <Form.Field>
                    <label>Store</label>
                   
                    <Controller
                        name="store"
                        control={control}
                        render={({ field }) => (
                            //<Form.Dropdown
                            //    fluid
                            //    selection
                            //    search
                            //    options={storeOptions}
                            //    placeholder='Select Store'
                            //    name={field.name}
                            //    value={field.value}
                            //    onChange={handleChange}
                            ///>
                            <Form.Dropdown
                                fluid
                                selection
                                search
                                options={storeOptions}
                                placeholder='Select Store'
                                name={field.name}
                                value={field.value||''}
                                onChange={(e, data) => {
                                    const selectedStore = storeOptions.find(
                                        option => option.value === data.value
                                    );

                                    field.onChange(data.value);

                                    if (selectedStore) {
                                        setFormData(prev => ({
                                            ...prev,
                                            storeName: selectedStore.text,
                                            store_Id: selectedStore.value,
                                        }));
                                    }
                                }}
                            />
                        )}
                    />
                    {errors.store && (<p className="error-message">{errors.store?.message}</p>)}
                </Form.Field>
        </Form>
    )
    return (
        <div>
            <Container className="sales-container">
                <div className="sales-content">
                    <div className="sales-header">
                    <ActionButton primary
                        id={"btnAddSale"}
                        type={"button"}
                        label={"Add Sale"}
                        clickhandler={handleAddSale}
                        flag={actionType}
                    />
                    </div>

                    <div className="sales-table-wrapper">
                        <Table celled striped className="sales-table">
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
                                        <Table.Cell data-label="Customer">
                                            {sale.customerName}
                                        </Table.Cell>
                                        <Table.Cell data-label="Product">
                                            {sale.productName}
                                        </Table.Cell>
                                        <Table.Cell data-label="Store">
                                            {sale.storeName}
                                        </Table.Cell>
                                        <Table.Cell data-label="Date Sold">
                                            {sale.dateSold}
                                        </Table.Cell>
                                        <Table.Cell data-label="Edit">
                                            <ActionButton
                                                icon color='yellow'
                                                id={"btnEditSale"}
                                                type={"button"}
                                                label={"Edit"}
                                                iconName={"edit"}
                                                clickhandler={() => handleEditSale(sale)}
                                                flag={actionType}
                                                className="sales-action-button"
                                            />

                                        </Table.Cell>
                                        <Table.Cell data-label="Delete">

                                            <ActionButton
                                                icon color='red'
                                                id={"btnDeleteSale"}
                                                type={"button"}
                                                label={"Delete"}
                                                iconName={"trash"}
                                                clickhandler={() => handleDeleteSale(sale)}
                                                flag={actionType}
                                                className="sales-action-button"
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