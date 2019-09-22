import React, { Component } from 'react'
import Table from '../../components/Table/Table'
import {MDBCard,MDBCardBody,MDBContainer} from 'mdbreact'
class List extends Component {

    state={
        loading:false,
        data:[]
    }
    render(){
        return (
            <div>
            <MDBContainer>
            <div style={{marginTop:"30px"}}>
            <h5>Campaigns Assosited</h5>
            </div>
            <MDBCard style={{marginTop:"30px"}}>
            <MDBCardBody>
            <Table type="campaign" roles="client"/>
            </MDBCardBody>
        </MDBCard>
            </MDBContainer>
               
                
            </div>
        )
    }
}

export default List