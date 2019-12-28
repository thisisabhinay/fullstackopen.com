import React from 'react'

const Total = ({exercises}) => {
    const totalExercises = exercises.reduce((acc, val) => acc + val);
    return(
        <p>
           No. of exercises: {totalExercises}
        </p>
    );
}

export default Total