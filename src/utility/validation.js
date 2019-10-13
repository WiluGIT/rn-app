const validate = (val,rules,connectedValue) =>{
    let isValid =true;
    for(let rule in rules){
        switch(rule){
            case 'isEmail':
                isValid= isValid && emailValidator(val);
                break;
            case 'minLength':
                isValid= isValid && minLengthValidatior(val,rules[rule]);
            case 'equalTo':
                isValid= isValid && equalToValidator(val,connectedValue[rule]);
            default:
                isValid=true;
        }
    }
    return isValid;
} 


const emailValidator = val =>{
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(val);
};

const minLengthValidatior = (val,minLength)=>{
    return val.length >= minLength;
}

const equalToValidator = (val,checkValue)=>{
    return val===checkValue;
}

export default validate;