import {useCallback} from "react";
import {ExtraTypes} from "../../../../../../store/tasks/setting/types";

interface SettingProps {
    extra: ExtraTypes;
}

type ReturnTypes = [(exercises: (string | number)[]) => (string | number)[], (exercises: any[]) => any[], (output: string) => string];

type UpdateOutputEffectTypes = (setting: SettingProps) => ReturnTypes;

export const useUpdateOutputEffect: UpdateOutputEffectTypes = ({extra}) => {
    const updateMirror = useCallback((exercises: any) => {
        return exercises.map((int: any) => Number(`${int}${Math.abs(int)}`));
    }, []);

    const updaterOutput = useCallback((output) => {
        if (extra) {
            if (extra.includes('plus') && Math.sign(output) !== -1)
                output = '+' + output;
            if (extra.includes('comma'))
                output = output.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            return output;
        }
    }, [extra]);

    const updateExercises = useCallback((exercises) => {
        return exercises.map((exercise: any) => updaterOutput(exercise));
    }, [updaterOutput, extra]);

    return [updateExercises, updateMirror, updaterOutput];
};