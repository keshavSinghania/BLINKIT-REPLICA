import React from 'react'
import { MyAccount } from '../components/MyAccount';
import { Outlet } from 'react-router-dom';

function Dashboard() {
    return (
        <main className='flex overflow-x-hidden overflow-y-hidden box-border'>
        {/* left section of dashboard */}
            <section>
                <MyAccount/>
            </section>
            {/* Right section of dashboard */}
            <section>
                <Outlet></Outlet>
            </section>
        </main>
    )
}

export default Dashboard