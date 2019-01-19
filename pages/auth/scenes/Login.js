import React from 'react';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import {actions as auth} from "../index"

import Form from "../components/Form"

const {login} = auth;

const fields = [
    {
        key: 'email',
        label: "Email Address",
        placeholder: "Email Address",
        autoFocus: false,
        secureTextEntry: false,
        value: "",
        type: "email"
    },
    {
        key: 'password',
        label: "Password",
        placeholder: "Password",
        autoFocus: false,
        secureTextEntry: true,
        value: "",
        type: "password"
    }
];

const error = {
    general: "",
    email: "",
    password: ""
}

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            error: error
        }
    }

    onForgotPassword() {
        Actions.ForgotPassword()
    }

    onSubmit = (data) => {
        this.setState({error: error}); //clear out error messages

        this.props.login(data)
            .then(({exists, user}) => {
                if (!exists) Actions.CompleteProfile({user})
            })
            .catch(this.onError)
    }

    onError = (error) => {
        let errObj = this.state.error;

        if (error.hasOwnProperty("message")) {
            errObj['general'] = error.message;
        } else {
            let keys = Object.keys(error);
            keys.map((key, index) => {
                errObj[key] = error[key];
            })
        }
        this.setState({error: errObj});
    }

    render() {
        return (
            <Form fields={fields}
                  showLabel={false}
                  onSubmit={this.onSubmit}
                  buttonTitle={"LOG IN"}
                  error={this.state.error}
                  onForgotPassword={this.onForgotPassword}/>
        );
    }
}

export default connect(null, {login})(Login);