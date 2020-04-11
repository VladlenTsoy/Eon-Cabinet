import React, {useState} from 'react';
import {FormItem} from "../../../../../../../../lib";
import {DatePicker} from "antd";
import moment, {Moment} from "moment";

interface RangePickerProps {
    form: any;
    first: boolean;
}

const RangePicker: React.FC<RangePickerProps> = ({form, first}) => {
    const currentTime = moment().subtract(1, "days").valueOf();
    const [startValue, setStartValue] = useState<Moment | null>(form.getFieldValue('start_at'));
    const [endValue, setEndValue] = useState<Moment | null>(null);
    const [endOpen, setEndOpen] = useState(false);

    const disabledStartDate = (startValue: any): boolean => {
        if (!startValue || !endValue)
            return currentTime >= startValue.valueOf();
        if (endValue)
            return currentTime >= startValue.valueOf() || startValue.valueOf() > endValue.valueOf();
        return currentTime >= startValue.valueOf();
    };

    const disabledEndDate = (endValue: any): boolean => {
        if (!endValue || !startValue)
            return false;
        if (startValue)
            return endValue.valueOf() < startValue.valueOf();
        return false;
    };

    const onStartChange = (value: any) => {
        setStartValue(value)
    };

    const onEndChange = (value: any) => {
        setEndValue(value);
    };

    const handleStartOpenChange = (open: any) => {
        if (!open)
            setEndOpen(true);
    };

    const handleEndOpenChange = (open: any) => {
        setEndOpen(open)
    };

    return <>
        <FormItem
            form={form}
            name="start_at"
            label="C какого"
            required="Выберите с какого!"
        >
            <DatePicker
                disabled={!first}
                disabledDate={disabledStartDate}
                onChange={onStartChange}
                onOpenChange={handleStartOpenChange}
                style={{width: '100%'}}
                showToday={false}
                showTime={{
                    format: 'HH:mm',
                    minuteStep: 10,
                    defaultValue: moment('12:00', 'HH:mm'),
                }}
                format="YYYY-MM-DD HH:mm"
            />

        </FormItem>
        <FormItem
            form={form}
            name="end_at"
            label="По какое"
            required="Выберите по какое!"
        >
            <DatePicker
                disabledDate={disabledEndDate}
                onChange={onEndChange}
                open={endOpen}
                onOpenChange={handleEndOpenChange}
                style={{width: '100%'}}
                showToday={false}
                showTime={{
                    format: 'HH:mm',
                    minuteStep: 10,
                    defaultValue: moment('12:00', 'HH:mm')
                }}
                format="YYYY-MM-DD HH:mm"
            />
        </FormItem>
    </>;
};

export default RangePicker;