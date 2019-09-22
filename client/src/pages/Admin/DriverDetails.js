import React, { Component } from 'react';
import axios from 'axios';
import {MDBBtn} from 'mdbreact';
import { toast } from 'react-toastify';
class DriverDetails extends Component {
  state = {
    loading: false,
    data: [],
    campaignId: '',
    driverId:'',
    message:""
  };

//   headers = {
//     'Content-Type': 'application/json',
//     'Authorization':  localStorage.getItem("token")
// }
  componentWillMount() {
    console.log(this.props.location.query._id )
    this.setState({ loading: true,driverId:this.props.location.query._id });
    axios
      .post('/api/v1/campaign/list/NameAndIdByCity', { city: this.props.location.query.city })
      .then((res) => {
        console.log(res)
        this.setState({ data: res.data.data, loading: false});
       
      })
      .catch((err) => {
        console.log(err,'something went wrong');
      });
  }

  onHandleChange=(e)=> {
    console.log(e.target.name, e.target.value);
    this.setState({campaignId:e.target.value})
    
  }
  submit=()=> {
    console.log("done",this.state.campaignId,this.state.driverId);
    this.setState({loading:true})
    axios.post('/api/v1/campaign/add/driver',{campaignId:this.state.campaignId,driverId:this.state.driverId})
    .then((res)=>{
      this.setState({loading:false,message:"Driver added to Campaign"})
      toast(this.state.message)
      this.props.history.push("/admin/driverlist")
    }).catch((err)=>{
      this.setState({loading:false,message:"Driver alrady added with some other campaign"})
      toast(this.state.message)
      this.props.history.push("/admin/driverlist")
      
    })
  }
  
  render() {
    return (
      <div>
        <h1>Driver Details</h1>
        <p>{this.state.message}</p>
        <select name="campaignId" value="" onChange={this.onHandleChange}>
          <option value="city"></option>
          {this.state.data.map((obj, i) => {
            return <option value={obj._id}>{obj.name}</option>;
          })}
        </select>
        <MDBBtn onClick={this.submit}>{this.state.loading?"Loading...":"Add to Campaign"}</MDBBtn>
      </div>
    );
  }
}

export default DriverDetails;
