import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
//Must be min 5 characters, min 1 uppercase letter, min 1 lowercase letter, 1 number

export const schema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Required field'),
  age: yup
    .number()
    .positive("The age value cannot be less than 0.")
    .min(18, 'People under the age of 18 cannot enter.')
    .max(100, "You cannot be older than 100 years old.")
    .required('Required field'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters.')
    .matches(passwordRules, 'Please type a stronger password.')
    .required('Required field'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Password does not match')
    .required('Required field'),
  terms: yup
    .boolean()
    .oneOf([true], 'You have to accept the terms.'),
});