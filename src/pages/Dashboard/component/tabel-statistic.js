import React, { useState } from 'react';
import AktivisChart from './chart/Aktivis-chart';
import KampusChart from './chart/Kampus-chart';
import JoinChart from './chart/Join-chart';
import GenderChart from './chart/Gender-chart';
import { Button } from '@material-ui/core';

const TableStatistic = () => {
    const [chart, setChart] = useState(<AktivisChart />)

    const btnAktivis = (e) => {
        e.preventDefault()
        setChart(<AktivisChart />)
    }
    const btnKampus = (e) => {
        e.preventDefault()
        setChart(<KampusChart/>)
    }
    const btnJoin = (e) => {
        e.preventDefault()
        setChart(<JoinChart/>)
    }
    const btnGender = (e) => {
        e.preventDefault()
        setChart(<GenderChart/>)
    }
    return (
        <div className="tabel-statistic" >
            <div className="nav-tabel-statistic">
                <div className="container-button">
                    <Button variant="outlined" color="primary" className="btn-chart" onClick={btnAktivis}>
                        Aktivis
                    </Button>
                    <Button variant="outlined" color="primary" className="btn-chart" onClick={btnKampus}>
                        Kampus
                    </Button>
                    <Button variant="outlined" color="primary" className="btn-chart" onClick={btnJoin}>
                        Bergabung
                    </Button>
                    <Button variant="outlined" color="primary" className="btn-chart" onClick={btnGender}>
                        Gender
                    </Button>
                </div>
            </div>
            <div className="content-tabel-statistic">
                <div className="container-chart">
                    {chart}
                </div>
            </div>

        </div>
    );
}

export default TableStatistic