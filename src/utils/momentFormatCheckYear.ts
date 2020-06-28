import moment from "moment";

export const momentFormatCheckYear = (date: any, formatOne: string, formatTwo: string) => {
    const years = moment(date).diff(date, 'years', false);
    return moment(date).format(years ? formatTwo : formatOne);
}