import {useCallback} from "react";
import IconAbacus from "../../../../../../../assets/images/tasks/abacus.svg";
import {message} from "antd";
import {usePreloadPictures} from "../../../../../../../hooks/use-preload-pictures.effect";

type picturesFunction = (exercises: any) => any[];

interface Props {
    pictures?: string[] | 'abacus' | picturesFunction;
}

type ReturnType = [(data: any) => Promise<any>];

type LoadPicturesTypes = (props: Props) => ReturnType;

export const useLoadPicturesEffect: LoadPicturesTypes = ({pictures}) => {
    const [, preloadImage] = usePreloadPictures();

    const picturesLoad = useCallback(async (data) => {
        try {
            if (typeof pictures === "string" && pictures === 'abacus')
                return await new Promise((resolve => {
                    const iconAbacus = new Image();
                    iconAbacus.onload = () => resolve(true);
                    iconAbacus.src = IconAbacus;
                }));

            if (typeof pictures === "function")
                return await preloadImage(pictures(data));

            if (typeof pictures === "object")
                return await preloadImage(pictures);
        } catch (e) {
            message.error("Ошибка, не удалось загрузить изображения!")
        }
    }, [pictures, preloadImage]);

    return [picturesLoad];
};