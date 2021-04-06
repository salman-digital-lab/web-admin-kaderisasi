import React, {useState } from "react"
import { Bar } from 'react-chartjs-2';

const GenderChart = () => {

    const [barData, ] = useState({
        labels: [ 'Jemaah', 'Aktivis', 'Kader'],
        datasets: [
            {
                label: 'Pria',
                data: [
                    1,
                    2,
                    3,
                ],
                backgroundColor: 'rgba(97, 177, 90, 0.7)',
                borderWidth: 1
            },
            {
                label: 'Wanita',
                data: [
                    3,
                    2,
                    1,
                ],
                backgroundColor: 'rgba(28, 108, 125, 1)',
                borderWidth: 1
            },
        ]
    });
    return(
        <>
            <div>
            <Bar
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
                        text: 'Trend Persebaran Data Gender Aktivis,',
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

export default GenderChart