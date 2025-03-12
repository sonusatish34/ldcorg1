import React from 'react'
import Layout from '../components/Layout/Layout'
import About from '../components/ContactUs/About'
function about() {
    return (
        <Layout locname={'hyderabad'} phoneno={'9666-677-405'}>
            <div>
                <About/>
            </div>
        </Layout>
    )
}

export default about