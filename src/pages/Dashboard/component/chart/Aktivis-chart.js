import React, { useContext, useEffect } from "react"
import { Bar } from 'react-chartjs-2';
import { AdminDashboardContext } from "../../../../context/AdminDashboardContext";

const AktivisChart = () => {
    const { AktivisState, functions, AktivisBar, setAktivisBar } = useContext(AdminDashboardContext)
    const { colors, GetAktivis } = functions
    // sort by value
    if (AktivisState !== undefined) {
        AktivisState.sort(function (a, b) {
            return a.tahun - b.tahun;
        });
    }

    useEffect(() => {
        setAktivisBar({
            labels: [],
            datasets: [],
            status: null,
        });
        if (AktivisBar.status === null) {
            GetAktivis()
        }
    }, [])


    if (AktivisState !== undefined) {
        AktivisState.forEach(function (e) {
            // create labels
            var labelIndex = AktivisBar.labels.indexOf(e.nama_provinsi)
            if (labelIndex === -1) {
                labelIndex = AktivisBar.labels.length;
                AktivisBar.labels.push(e.nama_provinsi);
                // dummy entries for each dataset for the label
                AktivisBar.datasets.forEach(function (dataset) {
                    dataset.data.push(0)
                })
            }

            // get the area dataset
            var area = AktivisBar.datasets.filter(function (area) {
                return (area.label === e.jenis_member);
            })[0]
            // otherwise create it
            if (area === undefined) {
                area = {
                    label: e.jenis_member,
                    data: AktivisBar.labels.map(function () {
                        return 0;
                    }),
                    fill: false,
                    backgroundColor: colors[AktivisBar.datasets.length],
                    borderColor: colors[AktivisBar.datasets.length]
                };
                AktivisBar.datasets.push(area)
            }

            // set the value
            area.data[labelIndex] = e.jumlah_permember;
        })
    }
    return (
        <>
            <div className="container-chart">
                <Bar
                    id="chart"
                    data={AktivisBar}
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
                            text: `Trend Persebaran Aktivis`,
                            fontSize: 25,
                            padding: 20,
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        legend: {
                            onClick: (e) => e.stopPropagation(),

                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    suggestedMin: 1,
                                    beginAtZero: true,
                                    userCallback: function (value, index, values) {
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