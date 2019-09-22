import React, { Component } from 'react';
import Form from '../../components/Form/Form';
import { connect } from 'react-redux';
import * as actions from '../../actions/adminActions';
import axios from 'axios'
import { toast } from 'react-toastify';
class AddCampaign extends Component {
  state = {loading:false,companyList:[]};


  headers = {
    'Content-Type': 'application/json',
    'Authorization':  localStorage.getItem("token")
}
  componentWillMount(){
    this.setState({loading:true})
    axios.get('/api/v1/company/list/NameAndId').then((res)=>{
      console.log(res.data)
      this.setState({loading:false,companyList:res.data.data})
    }).catch((err)=>{
      console.log("something Want wrong")
    })


  }

  submit = async (values) => {
    try{
      this.props.add(values,'campaign');
      toast('Successfully added!');
    }catch (e) {
      toast('Error! Unable to add');
    }
  };

  render() {
    return (
      <div>
        <h3>
          <b>Add Campaign</b>
        </h3>
        {this.state.loading?"Loading...":<Form Type="Campaign" onSubmit={this.submit} companyList={this.state.companyList} />}
        
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(AddCampaign);
