import React from 'react';
/*import { sign } from 'crypto';*/

/*copy paste from tokyons page sign in form http://tachyons.io/components/forms/sign-in/index.html and edited some things */
class Signin extends React.Component {

    constructor(props) { // constructor created to make empty password and email and later make function with setState to get acess to the entered text. 
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    // acessing input value
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = () => { 
        fetch('http://localhost:3000/signin',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data ==='success') {
                this.props.onRouteChange('home');
            }
        })
       
    }

    render(){
        const{ onRouteChange} = this.props;
        return (
            <article className="br3 ba b--black-10 mw4 w-100 w-50-m w-25-1 mw6 shadow-5 center">
                <main className="pa4 black-80">
                        <form className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                                <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  id="email-address"
                                onChange={this.onEmailChange}// sending info to emailchange and with this.state concole.log info entererd
                                />
                                </div>
                                <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password"
                                onChange={this.onPasswordChange}
                                // sending info to passwordchange and with this.state going to onsubmitsignin and console.log
                                />
                                </div>
                            </fieldset>
                            <div className="">
                                <input 
                                onClick={this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Sign in"/>
                            </div>
                            <div className="lh-copy mt3">
                                <p onClick={()=> onRouteChange('register')} href="#0" className="f6 link dim black db pointer">Register</p>
                            </div>
                        </form>
                </main>
            </article>
        );
    }
   
}

export default Signin;