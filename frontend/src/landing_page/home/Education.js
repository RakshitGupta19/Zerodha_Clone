import React from 'react'

function Education() {
    return ( 
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-6'>
                    <img src="/media/images/education.svg" style={{width: "80%"}}/>
                </div>
                <div className='col-6'>
                    <h1 className='mb-3 mt-5 fs-2'>Free and Open Market Education</h1>
                    <p className='mt-5'>Varsity, the largest online stock market education book in thw world covering everything from the basics to advanced trading.</p>
                    <a href='' style={{textDecoration:"none"}}>Versity <i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                    <p className='mt-4'>TradingQ&A, the most active trading anf investment community in India for all your market related queries.</p>
                    <a href='' style={{textDecoration:"none"}}>TradingQ&A <i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                </div>
            </div>
        </div>
     );
}

export default Education;