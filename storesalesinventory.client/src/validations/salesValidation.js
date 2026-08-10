import * as Yup from 'yup'; 
export const saleValidationSchema = Yup.object().shape({
    //customerName: Yup.string().required('Please select Customer'),
    //productName: Yup.string().required('Please select Product'),
    //storeName: Yup.string().required('Please select Store'),
    productName: Yup.string().required('Product is required'),
    customerName: Yup.string().required('Customer is required'),
    storeName: Yup.string().required('Store is required'),
    dateSold: Yup.date().required('Date sold is required').max(new Date(), 'Date sold cannot be in the future'),
});
