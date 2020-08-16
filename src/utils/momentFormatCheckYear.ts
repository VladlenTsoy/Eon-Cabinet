import moment from "moment";

type MomentFormatCheckYear = (date: string, currentYearFormat?: string, formatTwo?: string) => string

/**
 * Вывод даты из двух оталкиваясь от года (FormatOne текущий год)
 *
 * @param date
 * @param currentYearFormat - Текущий год
 * @param formatTwo
 */
export const momentFormatCheckYear: MomentFormatCheckYear = (date, currentYearFormat = 'DD MMM', formatTwo= 'DD/MM/YY') => {
    const years = moment(date).diff(date, 'years', false);
    return moment(date).format(years ? formatTwo : currentYearFormat);
}