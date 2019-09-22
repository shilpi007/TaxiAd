import React, {Component} from 'react';
import NotificationTable from './NotificationTable'
import ImageDisplay from '../../components/ImageDisplay/ImageDisplay'
import axios from 'axios'
import {toast} from 'react-toastify';
import {MDBCard,MDBCardFooter,MDBBtn} from 'mdbreact'
class Notification extends Component {
    state={
        loading:false,
        newDriver:[],
        photoes:[]
    }

    headers = {
        'Content-Type': 'application/json',
        'Authorization':  localStorage.getItem("a_token")
    }

    componentWillMount(){
        this.setState({
            loading:true
        })
        // axios.all([
        //     axios.get(`/api/v1/driver/list/all?state=0`,this.headers),
        //     axios.get('/api/v1',this.headers)
        // ])
        // .then(axios.spread(function (newDriver, photoes) {
        //     var newDrive = newDriver.data.data || [];
        //     var photoe = photoes.data || [];
        //     // var vehicles = seatDa.concat(volkswagenData);
        //     this.setState({ newDriver:newDrive,photoes:photoe })
        //   }))
        //   .catch(error => console.log(error));

        axios.get(`/api/v1/driver/list/all?state=0`,this.headers).then((res)=>{
            this.setState({loading:false,newDriver:res.data.data})
        }).catch((err)=>{
            console.log("something want wrong")
        })
        
        
    }

    preProcessData(){

    }

    removeDriver(id){
        console.log(this.state);
    }

    handleDecision(id,status){
        
        axios.post("/api/v1/driver/update/state",{driverId:id,state:status}).then((res)=>{
            let newList = [];
            this.state.newDriver.forEach(driver=>{
                if(driver._id !== id){
                    newList.push(driver);
                }
            });
            this.setState({newDriver:newList});
            if(status === 1)
                toast("Driver is Approved");
            else
                toast("Driver is Rejected");
            console.log("done")

        }).catch((err)=>{
            console.log(err);
            toast("something want wrong")
            console.log(err,"something Want Wrong")
        })
    }

    photoesDecision(id,status){
        axios.post('',{driverId:id,state:status}).then((res)=>{
            toast("Driver's uploaded photoes are successfuly approved")
        })
        .catch((err)=>{
            console.log("something want wrong")
        })
    }

    render(){
        return(
            <div>
            {this.state.loading?"loading...":(<div>
                <h3>Notification</h3>
                <NotificationTable data={this.state.newDriver} ondecision={this.handleDecision.bind(this)}/>
                {this.state.photoes.map((obj,i)=>{
                    return (
                        <MDBCard>
                            <ImageDisplay/>
                            <MDBCardFooter style={{display:"flex",justifyContent:"space-around"}}>
                                <MDBBtn onClick={()=>this.photoesDecision(obj._id,true)}>Approve</MDBBtn>
                                <MDBBtn onClick={()=>this.photoesDecision(obj._id,false)}>Disapprove</MDBBtn>
                            </MDBCardFooter>
                        </MDBCard>
                    )
                })}
            </div>)}
            </div>
            
            
        )
    }
}

export default Notification;