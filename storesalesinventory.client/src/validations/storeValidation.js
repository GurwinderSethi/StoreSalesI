import * as Yup from 'yup';
export const storeValidationSchema = Yup.object().shape({
    storeName: Yup.string().min(2, 'Store name must be at least 2 characters').max(100).required('Store name is required')
        .matches(/^[a-zA-Z\s\-']+$/,
            'Name can only contain letters, spaces, hyphens, or apostrophes'
        ),

    storeAddress: Yup.string().min(5, 'Store address must be at least 5 characters').max(200).required("Store Address is Required"),
});
