import React from 'react';
import {Empty} from "antd";
import {Card} from "lib";
import ExerciseLists from "./exercise-lists/ExerciseLists";
import styled from "styled-components";

const ScrollWrapper = styled.div`
  max-height: 450px;
  overflow-x: auto;
  padding-right: 8px;
`;

interface AddedExercisesProps {
    homework?: any;
    exercises: any;
    updateExercises: any;
}

const AddedExercises: React.FC<AddedExercisesProps> = ({children, exercises, updateExercises}) => {
    const deleteExercise = (index: number) => {
        updateExercises(exercises.filter((exercise: any, key: number) => key !== index));
    };

    return <Card>
        {exercises.length ?
            <>
                <ScrollWrapper>
                    {exercises.map((exercise: any, key: number) =>
                        <ExerciseLists
                            edit
                            exercise={exercise}
                            key={key}
                            deleteExercise={() => deleteExercise(key)}
                        />
                    )}
                </ScrollWrapper>
                {children}
            </> :
            <Empty/>
        }
    </Card>;
};

export default AddedExercises;