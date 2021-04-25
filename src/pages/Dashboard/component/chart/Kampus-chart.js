import React, {useState } from "react"
import { HorizontalBar  } from 'react-chartjs-2';

const KampusChart = () => {

    const [barData, ] = useState({
        labels: [ 
            'Institut Teknologi Bandung, Bandung', 'Universitas Pendidikan Indonesia, Bandung', 'Universitas Islam Negeri (UIN) Sunan Gunung Djati Bandung',
            'Universitas Padjajaran, Bandung', 'Universitas Diponegoro', 'Institut Pertanian Bogor',
            'Universitas Surakarta Sebelas Maret','Politeknik negeri bandung','Universitas Gajah Mada',
            'Universitas Sriwijaya', 'Universitas Andalas', 'Universitas Siliwangi',
            'Banten','Institut Teknologi sepuluh Nopember','UIN syarif hidayahtullah',
            'Universitas Kesehatan Kemenkes','Universitas Jendral sudirman','Universitas Islam Bandung',
            'Universitas Negeri Yogyakarta','Universitas negeri semarang',

        ],
        datasets: [
            {
                label: 'JAMAAH',
                data: [            
                1, 5, 2,
                3, 3, 5,
                1, 2, 2,
                2, 5, 2,
                1, 2, 2,
                5, 5, 2,
                1, 3, ],
                backgroundColor: 'rgba(28, 108, 125, 1)',
                borderWidth: 1,
            },
            {
                label: 'Aktivis',
                data: [            
                    3, 5, 2,
                    2, 3, 5,
                    2, 2, 2,
                    5, 2, 2,
                    2, 2, 2,
                    5, 3, 2,
                    1, 2, ],
                backgroundColor: 'rgba(115, 197, 208, 1)',
                borderWidth: 1
            },
            {
                label: 'Kader',
                data: [            
                    3, 5, 2,
                    2, 3, 5,
                    1, 2, 2,
                    2, 5, 2,
                    1, 2, 2,
                    5, 3, 2,
                    1, 5,  ],
                backgroundColor: 'rgba(255, 167, 46, 1)',
                borderWidth: 1
            },
        ]
    });
    return(
        <>
            <div className="container-chart">
            <HorizontalBar 
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
                        text: 'Trend Persebaran Data Kampus',
                        fontSize: 25,
                        padding: 20,
                    }, 
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        onClick: (e) => e.stopPropagation(),
                        
                    },
                    scales:{
                        xAxes:[{
                          ticks:{
                            suggestedMin:5,
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

export default KampusChart