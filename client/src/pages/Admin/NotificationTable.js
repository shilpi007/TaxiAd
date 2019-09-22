import React, { Component } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead, MDBContainer,MDBAlert } from 'mdbreact';
class NotificationTable extends Component{

    state={
        loading:false,
        data:{}
    }

    renderContent(){
      if (this.props.data.length!==0){
        return (
          <MDBTable>
              <MDBTableHead color="primary-color" textWhite>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Contact No.</th>
                  <th>Car No.</th>
                  <th>City</th>
                  <th>Status</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
              {this.props.data.map((obj,i)=>{
                return (
                  <tr key={i}>
                <td>{i}</td>
                <td>{obj.name}</td>
                <td>{obj.number}</td>
                <td>{obj.carNo}</td>
                <td>{obj.city}</td>
                <td><button onClick={()=>this.props.ondecision(obj._id,1)}>Accept</button></td>
                    <td><button onClick={()=>this.props.ondecision(obj._id,-1)}>Reject</button></td>
              </tr>
                )
                
              })}
                
              </MDBTableBody>
            </MDBTable>
        )
        
      }else{
        return(
          <MDBAlert color="primary">No new pending Notifications</MDBAlert>
        )
      }
    }
    render(){
        return (
          <MDBContainer>
          {this.renderContent()}
          </MDBContainer>
            
          );
    }
 
}

export default NotificationTable;