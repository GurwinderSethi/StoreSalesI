import * as Yup from 'yup'; 
export const saleValidationSchema = Yup.object().shape({
   
     product: Yup.string().required('Product is required'),
     customer: Yup.string().required('Customer is required'),
     store: Yup.string().required('Store is required'),
    //dateSold: Yup.date().required('Date sold is required').max(new Date(), 'Date sold cannot be in the future'),
    dateSold: Yup.date()
        .transform((value, originalValue) =>
            originalValue === '' ? null : value
        )
        .nullable()
        .required('Date sold is required')
        .max(new Date(), 'Date sold cannot be in the future'),
});

