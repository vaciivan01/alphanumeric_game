import React from 'react';
import axios from 'axios';

class Register extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          name:'',
          email:'',
          password:'',
          re_password: ''
      };
      this.handleInputChange = this.handleInputChange.bind(this);

    }

    register()
    {
        console.log(this.state)
        if( this.state.name  !== '' && 
            this.state.email  !== '' && 
            this.state.password !== '' && 
            this.state.re_password !== '' && 
            (this.state.re_password === this.state.password)
        )
        {
            axios.post(`http://127.0.0.1:8000/api/users`,
                this.state
              ) // register url 
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
                <label >Name</label>
                <input name="name" type="name" className="form-control" placeholder="Name" onChange={this.handleInputChange}/>
            </div>
            <div className="form-group">
                <label >Email address</label>
                <input name="email" type="email" className="form-control" placeholder="Email" onChange={this.handleInputChange}/>
            </div>
            <div className="form-group">
                <label >Password</label>
                <input name="password" type="password" className="form-control" placeholder="Password" onChange={this.handleInputChange}/>
            </div>
            <div className="form-group">
                <label >Re-Password</label>
                <input name="re_password" type="password" className="form-control" placeholder="Password" onChange={this.handleInputChange}/>
            </div>
            <button type="submit" className="btn btn-default" onClick={()=>{this.register()}}>Submit</button>
      </div>
    );
  }
}

export default Register;