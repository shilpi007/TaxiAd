import React,{Component} from 'react';
import {MDBContainer,MDBCard,MDBCardBody} from 'mdbreact';
class Landing extends Component {
    render(){
        return(
            <div style={{marginTop:"40px"}}>
            <MDBContainer>
            <MDBCard style={{width:"500px"}}>
                <MDBCardBody>
                <div style={{}}>
                <ul>
                <a href="/admin">Admin signin</a>

                </ul>

                </div>
                <div>
                <ul>
                <a href="/company">Company signin</a>

                </ul>

                </div>
                    

                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
            </div>
        )
    }
}

export default Landing