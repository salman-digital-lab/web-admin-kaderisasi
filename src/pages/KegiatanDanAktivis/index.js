import React from 'react'
import '../../assets/scss/Kegiatan.scss';
import KegiatanFilter from './components/kegiatan-filter';
import KegiatanTable from './components/kegiatan-table'

const KegiatanDanAktivis = () => {
    return (
    <>
        <div className="kegiatan-list">
            <div className="flex-container">
                <div className="flex-left">
                    <KegiatanTable/>
                </div>
                <div className="flex-right">
                    <KegiatanFilter/>
                </div>
            </div>
        </div>
    </>
    );
}
export default KegiatanDanAktivis;
