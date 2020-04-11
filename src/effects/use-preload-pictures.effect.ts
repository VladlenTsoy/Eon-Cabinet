import {useCallback, useState} from "react";

interface FunctionHook {
    (context?: any): [number, (pictures: any, i?: number) => Promise<any[]>];
}

export const usePreloadPictures:FunctionHook = () => {
    const [numberOfDownloaded, setNumberOfDownloaded] = useState(0);

    const preloadImage = useCallback(async (pictures: any, i = 0): Promise<any> => {
        return await new Promise((resolve, reject) => {
            pictures.map((picture: string) => {
                let img = new Image();
                img.onload = () => {
                    setNumberOfDownloaded(i++);
                    if (pictures.length <= i)
                        resolve(true);
                };
                img.onerror = reject;
                img.src = picture;
                return img;
            })
        });
    }, []);

    return [numberOfDownloaded, preloadImage];
};