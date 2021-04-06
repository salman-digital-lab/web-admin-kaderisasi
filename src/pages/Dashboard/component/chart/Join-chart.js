import React, {useState } from "react"
import { Line } from 'react-chartjs-2';

const JoinChart = () => {

    const [barData, ] = useState({
        labels: [ 
            '2010', '2011', '2012',
            '2013', '2014', '2015',
            '2016', '2017', '2018',
            '2019', '2020' , '2021'],
        datasets: [
            {
                label: "JEMAAH",
                data: [
                    86, 67, 91,
                    20,12,92,
                    21,21,11,
                    12,32,50],
                fill: false,
                backgroundColor: 'rgba(28, 108, 125, 1)',
                borderColor: 'rgba(28, 108, 125, 1)',
            },
            {
                label: "AKTIVIS",
                data: [
                    86, 67, 55,
                    25,23,12,
                    23,23,12,
                    23,55,12],
                fill: false,
                backgroundColor: 'rgba(115, 197, 208, 1)',
                borderColor: 'rgba(115, 197, 208, 1)',
            },
            {
                label: "KADER",
                data: [
                    12, 27, 91,
                    33,15,52,
                    55,23,31,
                    11,12,20],
                fill: false,
                backgroundColor: 'rgba(255, 167, 46, 1)',
                borderColor: 'rgba(255, 167, 46, 1)',
            },
        ]
    });
    return(
        <>
            <div>
            <Line
                data={barData}
                id="chart"
                base={10}
                options={{
                    layout: {
                        margin: {
                            left: 50,
                            right: 0,
                            top: 0,
                            bottom: 500
                        }
                    },
                    title: {
                        display: true,
                        text: 'Trend Persebaran Data Jumlah Bergabung,',
                        fontSize: 25,
                        padding: 20,
                    }, 
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        onClick: (e) => e.stopPropagation(),
                        
                    },
                    scales:{
                        yAxes:[{
                          position:"left",
                          ticks:{
                            suggestedMin:1,
                            beginAtZero:true,
                          }
                        }]
                      },  
                    skipNull: true
                }}
            />
            </div>
        </>
    )
}

export default JoinChart