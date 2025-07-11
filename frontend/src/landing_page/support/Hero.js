import React from 'react'

function Hero() {
    return ( 
        <section className='container-fluid' id='supportHero'>
            <div className='p-5' id='supportWrapper'>
                <h4>Support Portal</h4>
                <a href=''>Track Tickets</a>
            </div>
            <div className='row p-3 m-3'>
                <div className='col-6 p-5'>
                    <h1 className='fs-3'>Search for an answer or browse help topics to create a ticket</h1>
                    <input className='mt-3 mb-3' placeholder='Eg. how do I activte F&O, why is my order getting rejected..'/><br/>
                    <a href=''>Track account opening</a>&nbsp;&nbsp;
                    <a href=''>Track segment activation</a>&nbsp;&nbsp;
                    <a href=''>Intraday margins</a>&nbsp;&nbsp;
                    <a href=''>Kite user manual</a>
                </div>
                <div className='col-1'></div>
                <div className='col-5 p-5'>
                    <h1 className='fs-3'>Featured</h1>
                    <ol style={{lineHeight:"2"}}>
                        <li><a href=''>Current Takeovers and Delisting - January 2025</a></li>
                        <li><a href=''>Latest Intraday leverages - MIS & CO</a></li>
                    </ol>
                </div>
            </div>
        </section>
     );
}

export default Hero;