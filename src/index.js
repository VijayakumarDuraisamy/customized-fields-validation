import 'core-js/es6/promise';
import 'core-js/es6/set';
import 'core-js/es6/map';
import * as yup from 'yup';


const customValidations = require('custom-validations');

function customValidations(validations) {

    const validations = yup.object().shape({
        firstName: yup
            .string()
            .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
            .max(40)
            .required(),
    },
        {
            middleName: yup
                .string()
                .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
                .max(40),
        },
        {
            lastName: yup
                .string()
                .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
                .max(40)
                .required(),
        },
        {
            age: yup
                .number()
                .required("Please enter age")
                .min(18, "Age at-least 18 years")
        },
        {
            email: yup
                .string()
                .email("Invalid email")
                .required("Email is a required field"),
        },
        {
            password: yup
                .string()
                .required("Please enter your password")
                .matches(
                    /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                    "Password must contain at least 8 characters, one uppercase, one number and one special case character")
        },
        {
            confirmPassword: yup
                .string()
                .required("Please confirm your password")
                .when("password", {
                    is: password => (password && password.length > 0 ? true : false),
                    then: yup.string().oneOf([yup.ref("password")], "Password doesn't match")
                })
        },

    )
    return (validations);
}
module.exports = (customValidations)