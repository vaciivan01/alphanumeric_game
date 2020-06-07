import React from 'react';
import axios from 'axios';

class UserPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          easy:'',
          medium:'',
          hard:'',
          id:''
      };
      this.handleInputChange = this.handleInputChange.bind(this);

    }

    componentDidMount()
    {
        let url_string = window.location.href;
        let url = new URL(url_string);
        let id = url.searchParams.get("id")
        if(id !== null)
        {
            this.setState({
                id: id
            })
        }else{
            window.location.href = '/'
        }
    }

    updateGameOption()
    {
        console.log(this.state);
        
        if(this.state.easy  !== '' && this.state.medium !== '' && this.state.hard !== '' && this.state.id !== '')
        {
            axios.get(`http://127.0.0.1:8000/api/users?email=`+this.state.email+`&password=`+this.state.password)
            .then(res => {
                if(res.status === 200 && res.data.result && res.data.result.id)
                {
                    console.log('Logged in');
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
                <label >Easy</label>
                <input type="text" className="form-control" placeholder="Time for easy mode in ms" name='easy' onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
                <label >Medium</label>
                <input type="text" className="form-control" placeholder="Time for medium mode in ms" name='medium' onChange={this.handleInputChange} />
            </div>
            <div className="form-group">
                <label >Hard</label>
                <input type="text" className="form-control" placeholder="Time for hard mode in ms" name='hard' onChange={this.handleInputChange} />
            </div>
            <button type="submit" className="btn btn-default" onClick={()=>{this.updateGameOption()}}>Submit</button>
      </div>
    );
  }
}

export default UserPage;