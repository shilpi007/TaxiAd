import React, { Component } from 'react';
import TableView from './TableView';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import { companyTableHeader, driverTableHeader, campaignTableHeader } from './TableHeader';
class Table extends Component {
  state = {
    type: '',
    data: {},
    loading: false,
    campaignId:""
  };

  handleClick(id,city="") {
    
    if(this.props.roles==="client" && this.props.type ==="driver"){
      console.log("1")
      this.props.history.push({pathname:`/company/list/driver/${id}`,query: { _id:id,city: city } })
    }
    if(this.props.type==="company"){
      
      this.props.history.push({ pathname: `${this.props.match.path}/company/${id}`, query: { _id:id,city: city } });
    }else if(this.props.type==="driver" && this.props.roles!=="client"){
      this.props.history.push({ pathname: `${this.props.match.path}/driver/${id}`, query: { _id:id,city: city } });
    }else if(this.props.type==="campaign"){
      
      this.props.history.push({ pathname: `${this.props.match.path}/campaign/${id}`, query: { _id:id,city: city } });
    }
    
  }

  addHeader = (type, data) => {
    switch (type) {
      case 'company':
        data = data.map((obj, i) => {
          return {
            name: obj.name,
            contactPersonName: obj.contactPersonName,
            contactPersonContactNo: obj.contactPersonContactNo,
            contactPersonEmail: obj.contactPersonEmail,
            clickEvent: () => {
              this.handleClick(obj._id);
            },
          };
        });
        companyTableHeader.rows = data;
        return companyTableHeader;

      case 'driver':
        data = data.map((obj, i) => {
          return {
            name: obj.name,
            contactNo: obj.contactNo,
            carNo: obj.carNo,
            city: obj.city,
            clickEvent: () => {
              this.handleClick(obj._id,obj.city);
            },
          };
        });
        driverTableHeader.rows = data;
        return driverTableHeader;

      case 'campaign':
        data = data.map((obj, i) => {
          return {
            name: obj.name,
            contactPersonName: obj.contactPersonName,
            contactPersonContactNo: obj.contactPersonContactNo,
            contactPersonEmail: obj.contactPersonEmail,
            campanyName: obj.company.name,
            clickEvent: () => {
              this.handleClick(obj._id);
            },
          };
        });
        campaignTableHeader.rows = data;
        return campaignTableHeader;
      default:
        return null;
    }
  };
  componentWillMount() {
    this.setState({ loading: true });
    const headers = {
      'Content-Type': 'application/json',
      'Authorization':  localStorage.getItem('a_token')
    }
    let url = `/api/v1/${this.props.type}/list/all?state=1`
    if (this.props.roles === "client" && this.props.type === "driver"){
       url = `/api/v1/campaign/details?id=${this.props.id}`
    }
    
    axios
      .get(url,{headers})
      .then((res) => {
        
        let data = this.addHeader(this.props.type, res.data.data);
        console.log(res.data)
        this.setState({ data: data, loading: false });
      })
      .catch((err) => {
        console.log(err, 'something went wrong');
      });
  }
  render() {
    return <div>{this.state.loading ? 'Loading...' : <TableView type={this.props.type} data={this.state.data} />}</div>;
  }
}

function mapStateToProps(state){
  return {
    loading:state.loading.loading
  }
}

export default connect(mapStateToProps,null)(withRouter(Table));
