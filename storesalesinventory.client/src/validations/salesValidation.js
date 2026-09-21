import * as Yup from 'yup'; 
export const saleValidationSchema = Yup.object().shape({
    product: Yup.string().required('Product is required'),

    customer: Yup.string().required('Customer is required'),

    store: Yup.string().required('Store is required'),

    dateSold: Yup.date()
        .transform((value, originalValue) =>
            originalValue === '' ? null : value
        )
        .nullable()
        .required('Date sold is required')
        .test(
            'not-in-future',
            'Date sold cannot be in the future',
            function (value) {
                if (!value) return true;

                const selectedDate = new Date(value);
                const now = new Date();

                selectedDate.setSeconds(0, 0);
                now.setSeconds(0, 0);

                return selectedDate <= now;
            }
        ),
});

