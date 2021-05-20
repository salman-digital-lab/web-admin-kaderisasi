import axios from "axios";
import React, {useContext, useEffect, useState } from "react"
import { Bar } from 'react-chartjs-2';
import { AdminDashboardContext } from "../../../../context/AdminDashboardContext";

const GenderChart = () => {
    const { functions } = useContext(AdminDashboardContext)
    const { colors, jenis_gender } = functions
    const [myJSONData, setMyJSONData] = useState()

    // sort by value
    if(myJSONData !== undefined) {
        myJSONData.sort(function (a, b) {
            return a.tahun - b.tahun;
        });
    }


    const [barData, setBarData] = useState({
        labels: [],
        datasets: [],
        status: null,
    });


    useEffect(() => {
        if(barData.status === null){
            axios.get('https://admin-api-kaderisasi-dev.salmanitb.com/v1/dashboard/get/all/gender')
            .then(res => {
                let result =  res.data.data

                setMyJSONData(result)

            })
            .catch(error => {
                console.log(error)
            })
        }
    },[barData, setBarData])

    
    if(myJSONData !== undefined){
        barData.labels.push("Gender Aktivis");
        myJSONData.forEach(function (e) {
            if(e.gender !== null){
            // create labels
            var labelIndex = barData.labels.indexOf(e.gender)
            if (labelIndex === -1) {
                labelIndex = barData.labels.length;
                // dummy entries for each dataset for the label
                barData.datasets.forEach(function (dataset) {
                    dataset.data.push(0)
                })
            }
    
            // get the area dataset
            var area = barData.datasets.filter(function(area){
                return (area.label === e.gender);
            })[0]
            // otherwise create it
            if (area === undefined) {
                area = {
                    label: jenis_gender[barData.datasets.length],
                    data: barData.labels.map(function () {
                        return 0;
                    }),
                    fill: false,
                    backgroundColor: colors[barData.datasets.length],
                    borderColor: colors[barData.datasets.length]
                };
                barData.datasets.push(area)
            }
    
            // set the value
            area.data[0] = e.jumlah;
            }
        })
    }
    return(
        <>
            <div className="container-chart">
            <Bar
                data={barData}
                id="chart"
                base={0}
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
                        text: 'Trend Persebaran Data Gender Aktivis',
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