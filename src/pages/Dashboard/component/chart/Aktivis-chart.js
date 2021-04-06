import React, {useState } from "react"
import { Bar } from 'react-chartjs-2';

const AktivisChart = () => {
    const [barData, ] = useState({
        labels: [ 
            'Aceh', 'Sumatera Utara', 'Sumatera Barat',
            'Riau', 'Jambi', 'Sumatera Selatan',
            'Bengkulu','Lampung','Kepulauan Bangka Belitung',
            'Dki Jakarta', 'Jawa Barat', 'Jawa Tengah',
            'Banten','Bali','Nusta Tenggara Barat',
            'Nusta Tenggara Timur','Kalimantan Barat','Kalimantan Selatan',
            'Kalimantan Timur','Kalimantan Utara','Sulawesi Utara',
            'Sulawesi Tengah','Sulawesi Selatan','Sulawesi Tenggara',
            'Gorontalo','Sulawesi Barat','Maluku',
            'Papua Barat','Papua'
        ],
        datasets: [
            {
                label: 'JAMAAH',
                data: [            
                1, 5, 2,
                1, 3, 5,
                1, 5, 2,
                1, 5, 2,
                1, 5, 2,
                1, 5, 2,
                1, 5, 2,
                1, 5, 2,
                1, 5, 2,
                1, 5, ],
                backgroundColor: 'rgba(28, 108, 125, 1)',
                borderWidth: 1,
            },
            {
                label: 'Aktivis',
                data: [            
                    1, 5, 2,
                    1, 3, 5,
                    2, 2, 2,
                    2, 5, 2,
                    1, 2, 2,
                    5, 5, 2,
                    1, 2, 2,
                    3, 5, 2,
                    1, 5, 2,
                    5, 1, ],
                backgroundColor: 'rgba(115, 197, 208, 1)',
                borderWidth: 1
            },
            {
                label: 'Kader',
                data: [            
                    1, 5, 2,
                    1, 3, 5,
                    1, 5, 2,
                    1, 5, 2,
                    1, 5, 2,
                    1, 5, 2,
                    1, 5, 2,
                    1, 5, 2,
                    1, 5, 2,
                    1, 5, ],
                backgroundColor: 'rgba(255, 167, 46, 1)',
                borderWidth: 1
            },
        ]
    });
    return(
        <>
            <div>
            <Bar
                id="chart"
                data={barData}
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
                        text: `Trend Persebaran Aktivis, `,
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
                            userCallback: function(value, index, values) {
                                value = value.toString();
                                value = value.split(/(?=(?:...)*$)/);
                                value = value.join(',');
                                return value;
                            }
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

export default AktivisChart