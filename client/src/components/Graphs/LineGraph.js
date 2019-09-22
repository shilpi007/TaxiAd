import React from "react";
import { Line } from "react-chartjs-2";
import { MDBCard,MDBCardBody,MDBCardHeader } from "mdbreact";

class ChartsPage extends React.Component {

  state = {
      
    dataLine: {
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
  };

  componentWillMount(){
    console.log(this.props.data)
  }

  handleSelect=(e)=>{
    this.props.handleSelect(e.target.value,e.target.name)
  }

 
  render() {
    console.log(this.props.data)
    return (  
        <MDBCard>
            <MDBCardHeader style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                <h5>{this.props.title}</h5>
                <select name="distance" onChange={this.handleSelect}>
                <option>Campaign</option>
                {this.props.list.map((obj,i)=>{
                return (<option keys={i} value={obj.value} >{obj.label}</option>)
})} 
                </select>
            </MDBCardHeader>
            <MDBCardBody>
                <Line data={this.props.data} options={{ responsive: true,legend:{postion:"bottom"} }} />
            </MDBCardBody>
        </MDBCard>
    );
  }
}

export default ChartsPage;