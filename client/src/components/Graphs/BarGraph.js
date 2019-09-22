import React from "react";
import { Bar } from "react-chartjs-2";
import { MDBCard,MDBCardBody,MDBCardHeader } from "mdbreact";


class ChartsPage extends React.Component {
  state = {
    dataBar: {
      labels: ["week1","week2","week3","week4"],
      datasets: [
        {
          label: "No of Views",
          data: [120, 190, 160, 210],
          backgroundColor: [
            "rgba(255, 134,159,0.4)",
            "rgba(98,  182, 239,0.4)",
            "rgba(255, 218, 128,0.4)",
            "rgba(113, 205, 205,0.4)",
            "rgba(170, 128, 252,0.4)",
            "rgba(255, 177, 101,0.4)"
          ],
          borderWidth: 2,
          borderColor: [
            "rgba(255, 134, 159, 1)",
            "rgba(98,  182, 239, 1)",
            "rgba(255, 218, 128, 1)",
            "rgba(113, 205, 205, 1)",
            "rgba(170, 128, 252, 1)",
            "rgba(255, 177, 101, 1)"
          ]
        }
      ]
    },
    barChartOptions: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        xAxes: [
          {
            barPercentage: 1,
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)"
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)"
            },
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  }


  render() {
    return (
        <MDBCard>
            <MDBCardHeader style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                <h5>{this.props.title}</h5>
                <select name="distance">
                  <option>Campaign</option>
                    {this.props.list.map((obj,i)=>{
                        return <option keys={i} value={obj.value}>{obj.label}</option>
                    })}
                    

                </select>
            </MDBCardHeader>
            <MDBCardBody>
            <Bar data={this.state.dataBar} options={this.state.barChartOptions} />
            </MDBCardBody>
        </MDBCard>
    );
  }
}

export default ChartsPage;

