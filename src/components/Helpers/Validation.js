export function required(value) {
    let hasError = false;
    let errorMsg = '';
    hasError = value.trim() === '';
    if (hasError) {
        errorMsg = 'This field is required!';
    }
    return {hasError, errorMsg, value};
}

export function isEmail(value) {
    let hasError = false;
    let errorMsg = '';
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    hasError = !pattern.test(value);
    if (hasError) {
        errorMsg = 'This field must contain a valid email address.';
    }
    return {hasError, errorMsg, value};
}

export function validate(rules, value) {
    let validate = {
        hasError : false,
        errorMsg : '',
        value    : value
    }
    if (rules) {
        for (var rule in rules) {
            switch (rule) {
                case 'required':
                    validate = required(value);
                    break;
                case 'isEmail':
                    validate = isEmail(value);
                    break;
            
                default:
                    break ;
            }
            if (validate.hasError) {
                break;
            }
        }
    }

    return validate;
}

