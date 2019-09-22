import React, {Component} from 'react';
import { MDBCardBody,MDBCol,MDBRow,MDBCardHeader,MDBCardFooter,MDBBtn} from 'mdbreact'
class ImageDisplay extends Component{
    render(){
        return (
            <div> 
                    <MDBCardHeader>{this.props.title}</MDBCardHeader>
                    <MDBCardBody>
                        <MDBRow>
                            <MDBCol sm="4"><img src={this.props.image[0]} className="img-fluid z-depth-1" alt="image1" /></MDBCol>
                            <MDBCol sm="4"><img src={this.props.image[1]} className="img-fluid z-depth-1" alt="image2" /></MDBCol>
                            <MDBCol sm="4"><img src={this.props.image[2]} className="img-fluid z-depth-1" alt="image3" /></MDBCol>
                        </MDBRow>
                    </MDBCardBody>
                    
            </div>
        )
    }
}

export default ImageDisplay
