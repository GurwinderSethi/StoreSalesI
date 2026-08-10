import * as Yup from 'yup'; 
export const customerValidationSchema = Yup.object().shape({
//  id: Yup.string().uuid().required(),
    customerName: Yup.string().min(2,'Customer name must be at least 2 characters').max(100).required('Customer name is required')
        .matches(/^[a-zA-Z\s\-']+$/,
            'Name can only contain letters, spaces, hyphens, or apostrophes'
        ),

  customerAddress: Yup.string().min(5,'Customer address must be at least 5 characters').max(200).required("Customer Address is Required"),
});




