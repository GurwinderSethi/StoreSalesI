import * as Yup from 'yup'; 

export const productValidationSchema = Yup.object().shape({
    productName: Yup.string().min(2, 'Product name must be at least 2 characters').max(100).required('Product name is required')
        .matches(/^[a-zA-Z\s\-']+$/,
            'Name can only contain letters, spaces, hyphens, or apostrophes'
        ),

    productPrice: Yup.number()
        .typeError('Product price must be a valid number')
        .min(0, 'Product price cannot be negative')
        .required('Product price is required'),
});