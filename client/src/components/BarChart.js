import React from 'react';
import Chart from "react-google-charts";
export default function Bar(props) {

    return (
        <div className="container">
            <div className="float-left" style={{display: "inline-block"}}>
                <Chart
                width={'500px'}
                height={'300px'}
                chartType="Bar"
                loader={<div>Loading Chart</div>}
                data={props.data}
                options={{
                    chart: {
                    title: `${props.chart} Graph`
                    },
                }}
                rootProps={{ 'data-testid': '2' }}
                />
            </div>
        </div>
    )
}
