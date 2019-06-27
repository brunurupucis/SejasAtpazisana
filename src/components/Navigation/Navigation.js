import React from 'react';


/* sing out navigation to sing in and out*/
const Navigation = () => {
    return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p className='f3 link dim black underline pa3 pointer'> Sign Out</p>
        </nav>
    );
}

export default Navigation;