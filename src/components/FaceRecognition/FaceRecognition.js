import React from 'react';
import './FaceRecognition.css';


/* sing out navigation to sing in and out*/
const FaceRecognition = ({imageUrl, box}) => {/* {imageUrl} to get to src*/
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img  alt=""  id='inputimage' src={imageUrl} width='500' heig='auto'/>{/* imageUrl from Input to imageUrl and to  FaceRecognition and here */}
            <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>
        </div>
    );
}

export default FaceRecognition; 