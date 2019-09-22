import React from 'react';
import logo from '../../assets/images/placeholder-man.png';
import { MDBListGroup, MDBListGroupItem, MDBIcon ,MDBBadge} from 'mdbreact';
import { NavLink } from 'react-router-dom';

const SideNavigation = (props) => {
  return (
    <div className="sidebar-fixed position-fixed">
      <NavLink to="#!" className="logo-wrapper waves-effect">
        <img alt="MDB React Logo" className="img-fluid" src={logo} />
      </NavLink>
      <MDBListGroup className="list-group-flush">
        <NavLink exact={true} to="/admin" activeClassName="activeClass">
          <MDBListGroupItem>
            <MDBIcon icon="chart-pie" className="mr-3" />
            Dashboard
          </MDBListGroupItem>
        </NavLink>
        <NavLink to="/admin/profile" activeClassName="activeClass">
          <MDBListGroupItem>
            <MDBIcon icon="user" className="mr-3" />
            Profile
          </MDBListGroupItem>
        </NavLink>
        
        <NavLink to="/admin/notifications" activeClassName="activeClass">
          <MDBListGroupItem>
            <MDBIcon icon="map" className="mr-3" />
            Notifications <MDBBadge>{props.count}</MDBBadge>
          </MDBListGroupItem>
        </NavLink>
      </MDBListGroup>
    </div>
  );
};

export default SideNavigation;
