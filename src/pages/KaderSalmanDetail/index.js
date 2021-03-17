import React from 'react'
import '../../assets/scss/KaderDetail.scss';
import KaderDetail from './components/kader-detail';
import KaderTimeline from './components/kader-timeline'
import { Card, Box, CardContent, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Delete, ArrowBack } from '@material-ui/icons';

const KaderSalmanDetail = () => {
    return (
    <>
        <div className="userdetail">
        <Card>
            <CardContent className="filter-content">
                <Box pl={5} pr={5}>
                <div className="userdetail-data">
                    <div className="button-area">
                        <div className="button-left">
                            <Button size="small" className="back-button" variant="outlined">
                                <Link to={'/aktivis'}><ArrowBack fontSize="inherit" />KEMBALI</Link>
                            </Button>
                        </div>
                        <div className="button-right">
                            <Button color="secondary" size="small" className="edit-button" variant="contained">SUNTING</Button>
                            <Button color="secondary" size="small" className="delete-button" variant="contained">
                                <Delete fontSize="small" />
                                HAPUS
                            </Button>
                        </div>
                    </div>
                    <KaderDetail/>
                    <br/>
                    <KaderTimeline/>
                </div>
                </Box>
            </CardContent>
        </Card>
        </div>
    </>
    );
}
export default KaderSalmanDetail