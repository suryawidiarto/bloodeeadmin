import React from 'react';
import {AuthProvider} from './AuthProvider';
import Route from '../route/Route';

const Providers = () => {
    return(
        <AuthProvider>
            <Route/>
        </AuthProvider>
    );
}

export default Providers;