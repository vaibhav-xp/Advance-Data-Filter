import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import { FilterContextProvider } from './utils/context/filterContext'

const Layout = () => {
    return (
        <FilterContextProvider>
            <Header />
            <div className='container mx-auto py-6'>
                <Outlet />
            </div>
        </FilterContextProvider>
    )
}

export default Layout