export function isEmpty(str) {
    return (!str || 0 === str.length);
}

export function validateEmail(email) {
    let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    return filter.test(email);
}

export function validatePassword(password) {
    return (password.length > 6);
}

export function confirmPassword(c_password, password) {
    return (c_password === password);
}

export function validate(form) {
    let error = {};
    let success = true;

    let keys = Object.keys(form);
    let length = keys.length;

    keys.slice(0, length).map(field => {
        if (field !== "error"){
            let { type, value } = form[field];
            if (isEmpty(value)){
                error[field] = 'Your ' + field + ' is required';
                success = false;
            }else{
                error[field] = '';

                if (type === "email" && !validateEmail(value)) {
                    error[field] = 'Enter a valid email address';
                    success = false;
                }else if (type === "password" && !validatePassword(value)) {
                    error[field] = 'Password must be at least 6 characters';
                    success = false;
                }else if (type === "confirm_password" && !confirmPassword(value, form["password"]['value'])) {
                    error[field] = 'Password does not match.';
                    success = false;
                }
            }
        }
    });

    return {success, error};
}

export function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}