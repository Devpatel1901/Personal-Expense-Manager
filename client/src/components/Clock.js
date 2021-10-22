import React from 'react';

class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date(),month: 0,day: 0 , year: 0};
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
      var day = this.state.date.getDate();
      var month = this.state.date.getMonth();
      var year = this.state.date.getFullYear();
      this.setState({
        month: month,
        day: day,
        year: year,
      })
      console.log(this.state.month + this.state.day + this.state.year);
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    tick() {
      this.setState({
        date: new Date()
      });
    }
  
    render() {
      return (
        <>
        <div className="container">
          <div className="row">
            <div className="col-6 col-md-4 alert alert-primary d-flex align-items-center" style={{width: "200px",marginLeft:"10vw"}} role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
              </svg>
              <div style={{marginLeft: "10px"}}>
                  Clock: {this.state.date.toLocaleTimeString()}
              </div>
            </div>
            <div className="col-6 col-md-4 alert alert-primary d-flex align-items-center" style={{width: "270px",marginLeft: "35vw"}} role="alert">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
              </svg>
              <div style={{marginLeft: "10px"}}>
                  Today's Date: {this.state.date.toString().slice(0,16)}
              </div>
            </div>
          </div>
        </div>
      </>
      );
    }
  }

export default Clock;
