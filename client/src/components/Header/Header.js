import React, { Component } from 'react';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink,
} from 'mdbreact';

import {withRouter} from 'react-router-dom'
class Header extends Component {
  state = {
    collapse: false,
    logout:true
  };

  onClick = () => {
    this.setState({
      collapse: !this.state.collapse,
    });
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  };

  logout = () => {
    localStorage.removeItem('a_token');
    this.props.history.push('/')
  }

  render() {
    return (
      <MDBNavbar className="flexible-navbar" light expand="md" scrolling>
        <MDBNavbarBrand >
          <strong>TaxiAd</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.onClick} />
        <MDBCollapse isOpen={this.state.collapse} navbar>
          <MDBNavbarNav left>
            <MDBNavItem>
              <MDBNavLink to="/admin/addcompany">Add Company</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/admin/addcampaign">Add Campaign</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/admin/adddriver">Add Driver</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/admin/companylist">Company List</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/admin/driverlist">Driver List</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/admin/campaignlist">Campaign list</MDBNavLink>
            </MDBNavItem>
            
          </MDBNavbarNav>
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

export default withRouter(Header);
