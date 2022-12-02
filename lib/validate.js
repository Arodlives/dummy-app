

export default function login_validate(values){
    const errors ={}

    if (!values.email) {
    errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
    }

    //Validation for password 
    if(!values.password){
        errors.password ="Required";
    }
    else if(values.password.length<8 || values.password.length >20){
        errors.password = "Must be greater than 8 and less than 20 characteres long";
    }
    else if(values.password.includes(" ")){
        errors.password = "nvalid Password";
    }

    return errors;
}

export function register_validate(values){
    const errors ={};

    if(!values.name){
        errors.name="Required";
    }
    else if (values.name.includes(" ")){
        errors.name="Invalid name...!"
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    //Validation for password 
    if(!values.password){
        errors.password ="Required";
    }
    else if(values.password.length<8 || values.password.length >20){
        errors.password = "Must be greater than 8 and less than 20 characteres long";
    }
    else if(values.password.includes(" ")){
        errors.password = "Invalid Password";
    }
    
    //validating confirm pass
    if(!values.confirmpassword){
        errors.confirmpassword="Required";
    }
    else if(values.password!== values.confirmpassword){
        errors.confirmpassword ="Passwords do not match.Please try again."
    }
    else if(values.confirmpassword.includes(" ")){
        errors.confirmpassword="Invalid Confirm Password"
    }

    return errors;
}