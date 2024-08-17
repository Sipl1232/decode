import * as React from "react";

const Loader = React.memo(({ text = 'Loading...', imageUrl = './favicon.png' }) => (
    <>
        <div className="main-div">
            <div className='position-relative'>
                <div className="loader"></div>
                <img src={imageUrl} loading='eager' alt='' />
                <h2 className="text-center">{text}</h2>
            </div>
        </div>
    </>
));


export default Loader;