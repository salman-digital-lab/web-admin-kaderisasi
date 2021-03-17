import React from 'react'
import '../../assets/scss/Kader.scss';
import KaderFilter from './components/kader-filter';
import KaderTable from './components/kader-table'

const KaderSalman = () => {
    return (
    <>
        <h1 style={{ color: '#999999' }}>Aktivis dan Jamaah</h1>
        <div className="userlist">
            <div className="flex-container">
                <div className="flex-left">
                    <KaderTable/>
                </div>
                <div className="flex-right">
                    <KaderFilter/>
                </div>
            </div>
        </div>
    </>
    );
}
export default KaderSalman;