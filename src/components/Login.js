import React from 'react';
import axios from 'axios';

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          loggedIn: false,
          email:'sdfg@asdf.com',
          password:'asdfasdf'
      };
      this.handleInputChange = this.handleInputChange.bind(this);

    }

    login()
    {
        if(this.state.email  !== '' && this.state.password !== '')
        {
            axios.get(`http://127.0.0.1:8000/api/users?email=`+this.state.email+`&password=`+this.state.password)
            .then(res => {
                if(res.status === 200 && res.data.result && res.data.result.id)
                {
                    console.log('Logged in');
                    window.location.href = '/userPage?id='+res.data.result.id
                }
            })
        }
    }

    handleInputChange(event) {
        let value = event.target.value;
        let name = event.target.name;
        
        this.setState({
            [name]: value
        });
    }

  render() {
    return (
      <div className="container">
            <div className="form-group">
                <label >Email address</label>
                <input type="email" className="form-control" placeholder="Email" name='email' onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
                <label >Password</label>
                <input type="password" className="form-control" placeholder="Password" name='password' onChange={this.handleInputChange} />
            </div>
            <button type="submit" className="btn btn-default" onClick={()=>{this.login()}}>Submit</button>
      </div>
    );
  }
}

export default Login;