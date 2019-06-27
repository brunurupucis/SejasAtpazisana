import React from 'react';


/* sing out navigation to sing in and out*/
const FaceRecognition = ({imageUrl}) => {/* {imageUrl} to get to src*/
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img  alt="" src={imageUrl} width='500' heig='auto'/>{/* imageUrl from Input to imageUrl and to  FaceRecognition and here */}
            </div>
        </div>
    );
}

export default FaceRecognition;