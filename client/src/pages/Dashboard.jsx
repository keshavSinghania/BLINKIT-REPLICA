import React from 'react'
import { MyAccount } from '../components/MyAccount';
import { Outlet } from 'react-router-dom';

function Dashboard() {
    return (
        <main className='flex'>
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