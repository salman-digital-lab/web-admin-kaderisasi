import React, { useContext, useEffect} from "react"
import { HorizontalBar } from 'react-chartjs-2';
import { AdminDashboardContext } from "../../../../context/AdminDashboardContext";

const KampusChart = () => {
    const { KampusState, functions, KampusBar, setKampusBar } = useContext(AdminDashboardContext)
    const { colors, GetKampus } = functions
    // sort by value
    if (KampusState !== undefined) {
        function compare(a, b) {
            const valueA = a.jenis_member.toUpperCase();
            const valueB = b.jenis_member.toUpperCase();
            let comparison = 0;
            if (valueA > valueB) {
                comparison = 1;
            } else if (valueA < valueB) {
                comparison = -1;
            }
            return comparison;
        }

        KampusState.sort(compare)
    }

    useEffect(() => {
        setKampusBar({
            labels: [],
            datasets: [],
            status: null,
        });

        if (KampusBar.status === null) {
            GetKampus()
        }
    }, [])

    if (KampusState !== undefined) {
        KampusState.forEach(function (e) {
            // create labels
            var labelIndex = KampusBar.labels.indexOf(e.nama_universitas)
            if (labelIndex === -1) {
                labelIndex = KampusBar.labels.length;
                KampusBar.labels.push(e.nama_universitas);
                // dummy entries for each dataset for the label
                KampusBar.datasets.forEach(function (dataset) {
                    dataset.data.push(0)
                })
            }

            // get the area dataset
            var area = KampusBar.datasets.filter(function (area) {
                return (area.label === e.jenis_member);
            })[0]
            // otherwise create it
            if (area === undefined) {
                area = {
                    label: e.jenis_member,
                    data: KampusBar.labels.map(function () {
                        return 0;
                    }),
                    fill: false,
                    backgroundColor: colors[KampusBar.datasets.length],
                    borderColor: colors[KampusBar.datasets.length]
                };
                KampusBar.datasets.push(area)
            }

            // set the value
            area.data[labelIndex] = e.jumlah_permember;
        })
    }
    return (
        <>
            <div className="container-chart">
                <HorizontalBar
                    data={KampusBar}
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
                        scales: {
                            xAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    min: 0,
                                    callback: function (value, index, values) {
                                        return value.toLocaleString();
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

export default KampusChart