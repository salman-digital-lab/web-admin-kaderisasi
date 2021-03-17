import React from 'react'
import clsx from "clsx";
import { styled } from './styled'
import { AdminContext } from '../../context/AdminContext'


export const Content = (props) => {
    const classes = styled();
    const { state } = React.useContext(AdminContext)
    return (
        <main className={clsx(classes.content, { [classes.contentShift]: state.openDrawer, })}>
            <div className={classes.drawerHeader} />
            {props.children}
        </main>
    )
}