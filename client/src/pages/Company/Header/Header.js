import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBIcon, MDBBreadcrumb,MDBBreadcrumbItem} from "mdbreact";
import {withRouter} from 'react-router-dom';
class NavbarPage extends Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

signout = () => {
  localStorage.removeItem('a_token')
  this.props.history.push('/company')
}

render() {
  return (
    <MDBNavbar transparent expand="md">
      <MDBNavbarBrand>
      <MDBNavLink to="/company/"><strong >Dashboard</strong></MDBNavLink>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={this.toggleCollapse} />
      <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
      <MDBNavItem left>
              <MDBNavLink to="/company/list">Campaign List</MDBNavLink>
      </MDBNavItem>
      <MDBNavbarNav right>
          <MDBNavItem >
          <h6 style={{marginTop:"8px",cursor:"pointer"}} onClick={this.logout}><b>Log out</b></h6>
      </MDBNavItem>
      </MDBNavbarNav>
      </MDBCollapse>
      
    </MDBNavbar>
    );
  }
}

export default withRouter(NavbarPage);

// <MDBNav className="justify-content-end">
//       <MDBNavItem>
//         <MDBNavLink active to="#!">Active</MDBNavLink>
//       </MDBNavItem>
//       <MDBNavItem>
//         <MDBNavLink to="#!">Link</MDBNavLink>
//       </MDBNavItem>
//       <MDBNavItem>
//         <MDBNavLink to="#!">Link</MDBNavLink>
//       </MDBNavItem>
//       <MDBNavItem>
//         <MDBNavLink disabled to="#!">Disabled</MDBNavLink>
//       </MDBNavItem>
//     </MDBNav>
