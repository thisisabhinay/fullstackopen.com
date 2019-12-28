import React from 'react'

const Total = ({exercises}) => {
    const totalExercises = exercises.reduce((acc, val) => acc + val);
    return(
        <p className="bold text-bright">
           No. of exercises: {totalExercises}
        </p>
    );
}

export default Total