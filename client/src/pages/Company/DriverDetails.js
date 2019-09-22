import React, { Component } from "react";
import {MDBCard,MDBContainer,MDBRow,MDBCol} from 'mdbreact';
import index11 from '../../assets/brandingPhotoes/index11.jpeg'


import index7 from '../../assets/brandingPhotoes/index7.jpeg'
import index9 from '../../assets/brandingPhotoes/index9.jpeg'
// import index3 from '../../assets/brandingPhotoes/index3'
// import index4 from '../../assets/brandingPhotoes/index4'
// import index5 from '../../assets/brandingPhotoes/index5'
// import index6 from '../../assets/brandingPhotoes/index6'
// import index7 from '../../assets/brandingPhotoes/index7'
// import index8 from '../../assets/brandingPhotoes/index8'
// import index9 from '../../assets/brandingPhotoes/index9'

// import index11 from '../../assets/brandingPhotoes/index11'
// import index12 from '../../assets/brandingPhotoes/index12'
import ImageDisplay from '../../components/ImageDisplay/ImageDisplay'
class DriverDetails extends Component {
    render(){
        return (
            <div>
                <MDBContainer>
                <MDBRow style={{paddingTop:"30px"}}>
                    <MDBCol>
                <h3>Images uploaded during starting the campaign</h3>

                    </MDBCol>
                </MDBRow>
                <MDBCard>
                <ImageDisplay image={[index11,index7,index9]} title="Anmol gupta"/>

                </MDBCard>
                <hr/>
                <h3>Images to be uploaded after campaign ends</h3>
                <p>images uploaded after compaign end...</p>
                </MDBContainer>
                
            </div>
          );
    }
  
};

export default DriverDetails