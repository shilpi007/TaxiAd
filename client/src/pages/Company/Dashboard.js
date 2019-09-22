import React, { Component } from "react";
import {MDBContainer, MDBCol, MDBRow} from 'mdbreact'
import LineGraph from '../../components/Graphs/LineGraph'
import BarGraph from '../../components/Graphs/BarGraph';

import axios from 'axios';
import {toast} from 'react-toastify';

const headers = {
    'Content-Type': 'application/json',
    'Authorization':  localStorage.getItem('a_token')
  }

let finalData = {
    labels: ["2019-06-27","2019-06-28","2019-06-29","2019-06-29","2019-06-30"],

    datasets: [
      {
        label: "My First dataset",
        fill: true,
        lineTension: 0.3,
        backgroundColor: "rgba(225, 204,230, .3)",
        borderColor: "rgb(205, 130, 158)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(205, 130,1 58)",
        pointBackgroundColor: "rgb(255, 255, 255)",
        pointBorderWidth: 10,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(0, 0, 0)",
        pointHoverBorderColor: "rgba(220, 220, 220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [263,513,632,381,350]
      },
    ],
    
  }

class Dashboard extends Component {

    state={
        loading:false,
        campaignList:[],
        distanceGraph:"0",
        viewsGraph:"",
        distanceData:{},
    }

    
    componentWillMount= async ()=>{
        this.setState({ loading:true })

        try{
            let res = await axios.get('/api/v1/campaign/list/NameAndIdById',{headers})
            this.setState({loading:false,campaignList:res.data.data,distanceGraph:res.data.data[0].value})

        }catch(e){
            console.log(e)
        }

        
    }
    
    preprocessData(data){
        const keys = Object.keys(data)
        const values = Object.values(data)
        const dat = {labels:keys,values:values}
        
        return dat
        

    }

    shouldComponentUpdate(prev,next){
        return (this.state.distanceData !== next.distanceGraph)
    }
    componentDidUpdate(prev,next){
        if(this.state.distanceGraph !== next.distanceGraph){
            axios.post('/api/v1/campaign/distanceTravelled',{id:this.state.distanceGraph},{headers})
            .then((res)=>{
                console.log(res.data)
                const data = this.preprocessData(res.data.data)
                finalData.labels = data.labels
                finalData.datasets[0].data = data.values
                this.setState({distanceData:finalData})
            }).catch((err)=>{
                console.log(err)
            })
    
        }
    }

  

    handleSelect=(value)=>{
        this.setState({distanceGraph:value}  )   
    }
    render(){
        return (
            <MDBContainer fluid>
                {this.state.loading?"Loading...":
                
                (<MDBRow style={{paddingTop:"30px"}}>
                    <MDBCol sm={6}>
                        <LineGraph title="Distance Graph" list={this.state.campaignList} handleSelect={this.handleSelect} data={this.state.distanceData}/>
                    </MDBCol>
                    <MDBCol sm={6}>
                        <BarGraph title="Average views" list={this.state.campaignList} />
                    </MDBCol>

                </MDBRow>
        )}
                
            </MDBContainer>
          );
    }
  
};

export default Dashboard