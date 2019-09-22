import React,{Component} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import axios from 'axios';
class Signin extends Component {

    state={
      email:'',
      password:'',
      loading:false,
      error:""
    }

    submit=()=>{  
      const data = {
        email:this.state.email,
        password:this.state.password
      }
      this.setState({loading:true})
      axios.post("/api/v1/admin/signin",data).then((res)=>{
        localStorage.setItem('a_token', res.data.token);
        this.setState({
          loading:false
        })
        console.log("herer")
        this.props.history.push('/admin')
        
      }).catch((err)=>{
        console.log(err)
        this.setState({
          error:"something want wrong",
          loading:false,
          email:"",
          password:""
        })
      })
    }

    handleChange=(e)=>{
      if (e.target.name==="email"){
        this.setState({email:e.target.value})
      }else{
        this.setState({password:e.target.value})
      }
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
                                label="Your email"
                                icon="envelope"
                                type="email"
                                validate
                                error="wrong"
                                success="right"
                                onChange={this.handleChange}
                                name="email"
                                value={this.state.email}
                              />
              
                              <MDBInput
                                label="Your password"
                                icon="lock"
                                
                                type="password"
                                validate
                                onChange={this.handleChange}
                                name="password"
                                value={this.state.password}
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