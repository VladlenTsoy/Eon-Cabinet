import {useCallback} from "react";

export const useAddSpaceToString = () => {
    return useCallback((n = '') => {
        n = n.toString();
        let updateString,
            digits = n.split('').length;

        if (digits % 2 === 0) updateString = n.replace(/(\d{2})(?=(\d{2})+$)/g, '$1 ');
        else if (digits % 3 === 0) updateString = n.replace(/(\d{3})(?=(\d{3})+$)/g, '$1 ');
        else {
            if ((digits - 1) % 3 === 0)
                updateString = n.substr(0, digits - 4).replace(/(\d{3})(?=(\d{3})+$)/g, '$1 ')
                    + ' ' + n.substr(digits - 4, 4).replace(/(\d{2})(?=(\d{2})+$)/g, '$1 ');
            else
                updateString = n.substr(0, digits - 2).replace(/(\d{3})(?=(\d{3})+$)/g, '$1 ')
                    + ' ' + n.substr(digits - 2, 2);
        }
        return updateString;
    }, []);
};