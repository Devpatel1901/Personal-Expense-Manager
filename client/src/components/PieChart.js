import React from 'react';
import Chart from "react-google-charts";
export default function PieChart(props) {

    return (
        <div className="container" >
            <div className="float-left" style={{display: "inline-block"}}>
                <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={props.data}
                    options={{
                        title: `My Monthly ${props.chart} Activities`,
                        is3D: true,
                    }}
                    rootProps={{ 'data-testid': '1' }}
                    />
            </div>
    </div>
    )
}
