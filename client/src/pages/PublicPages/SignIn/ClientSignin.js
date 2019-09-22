import React,{Component} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import {toast} from 'react-toastify'
import axios from 'axios';
class Signin extends Component {

    state={
      email:'',
      otp:'',
      loading:false,
      error:"",
      tempToken:""
    }

    submit=()=>{  
      const data = {
        contactNo:`+91${this.state.email}`,
        otp:this.state.otp
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization':  this.state.tempToken
      }
      console.log(this.state.tempToken)
      console.log(data)
      this.setState({loading:true})
      axios.post("/api/v1/otp/validate",data,{headers}).then((res)=>{
        localStorage.setItem('a_token', res.data.token);
        this.setState({
          loading:false
        })
        this.props.history.push('/company')
        
      }).catch((err)=>{
        console.log(err)
        this.setState({
          error:"something want wrong",
          loading:false,
          email:"",
          otp:""
        })
      })
    }

    handleChange=(e)=>{
      if (e.target.name==="email"){
        this.setState({email:e.target.value})
      }else{
          this.setState({otp:e.target.value})
      }
    }

    requestOtp=()=>{
      axios.post('/api/v1/otp/generate',{contactNo:`+91${this.state.email}`,role:"Company"}).then((res)=>{
        this.setState({loading:false,tempToken:res.data.token})
        toast("Otp successful send")
      }).catch((err)=>{
        console.log(err,"err")
        toast("Something want wrong")

      })
    
      
    }
   

    render(){
        return (
                <MDBContainer>
                  <MDBRow style={{paddingTop:"80px"}}>
                    <MDBCol md="4"></MDBCol>
                    <MDBCol md="4">
                    
                      <MDBCard>
                        <MDBCardBody>
                        
                          <form>
                            <p className="h4 text-center py-4">Sign In</p>
                            <div className="grey-text">
                              
                              <MDBInput
                                label="Phone no."
                                icon="phone"
                                type="Text"
                                validate
                                error="wrong"
                                success="right"
                                onChange={this.handleChange}
                                name="email"
                                value={this.state.email}
                              />
                              <MDBBtn onClick={this.requestOtp}>Send otp</MDBBtn>
                              <MDBInput
                                label="Otp"
                                icon="key"
                                type="Text"
                                validate
                                error="wrong"
                                success="right"
                                onChange={this.handleChange}
                                name="otp"
                                value={this.state.otp}
                              />
              
                              
                            </div>
                            <div className="text-center py-4 mt-3">
                              <MDBBtn color="cyan" onClick={this.submit}>
                                {this.state.loading?"Loading...":"Signin"}
                              </MDBBtn>
                            </div>
                          </form>
                          <h5 style={{color:"red"}}>{this.state.error}</h5>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                    <MDBCol md="4"></MDBCol>

                  </MDBRow>
                </MDBContainer>
        )
    }
  

};

export default Signin;