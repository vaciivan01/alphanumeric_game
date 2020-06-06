import React from 'react';
import axios from 'axios';

class Register extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          email:'',
          password:'',
          re_password: ''
      };
      this.handleInputChange = this.handleInputChange.bind(this);

    }

    register()
    {
        if( this.state.email  !== '' && 
            this.state.password !== '' && 
            this.state.re_password !== '' && 
            (this.state.re_password === this.state.password)
        )
        {
            axios.post(`http://127.0.0.1:8000/api/user/register`) // register url 
            .then(res => {
                console.log(res);
                
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
                <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email"/>
            </div>
            <div className="form-group">
                <label >Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
            </div>
            <div className="form-group">
                <label >Re-Password</label>
                <input type="re_password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
            </div>
            <button type="submit" className="btn btn-default" onClick={()=>{this.register()}}>Submit</button>
      </div>
    );
  }
}

export default Register;