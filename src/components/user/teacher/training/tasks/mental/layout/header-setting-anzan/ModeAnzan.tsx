import React from "react";
import {Radio} from "antd";
import {useSelector} from "react-redux";

interface ModeAdditionProps {
    form: any;
    mods?: string;
    changeModes?: any;
    isArray?: number;
    forceDefaultAlgorithms?: boolean;
}

const ModeAnzan: React.FC<ModeAdditionProps> = ({form, isArray, mods, forceDefaultAlgorithms}) => {
    const {language, app, user} = useSelector((state: any) => state);
    const {getFieldDecorator} = form;

    const checkCustomAlg = (name: any) => {
        return user.setting.is_custom_algorithms ? !(forceDefaultAlgorithms || app.custom_algorithms.hasOwnProperty(name)): false
    };

    return getFieldDecorator(isArray ? `mode[${isArray}]` : 'mode', {
        initialValue: 'plus',
        rules: [{required: true}],
        // getValueFromEvent: changeModes
    })(
        <Radio.Group className="setting-mode" buttonStyle="solid">
            {!mods || mods === 'addition' ?
                <>
                    <Radio.Button value="plus" disabled={checkCustomAlg('plus')}>
                        {language.common.modeNames['plus']}
                    </Radio.Button>
                    <Radio.Button value="minus" disabled={checkCustomAlg('minus')}>
                        {language.common.modeNames['minus']}
                    </Radio.Button>
                    <Radio.Button value="plus-minus" disabled={checkCustomAlg('plus-minus')}>
                        {language.common.modeNames['plus-minus']}
                    </Radio.Button>
                </> : null
            }
            {!mods || mods === 'multiplication' ?
                <>
                    <Radio.Button value="multiply"
                                  disabled={!!isArray || checkCustomAlg('multiply')}>
                        {language.common.modeNames['multiply']}
                    </Radio.Button>
                    <Radio.Button value="divide"
                                  disabled={!!isArray || checkCustomAlg('divide')}>
                        {language.common.modeNames['divide']}
                    </Radio.Button>
                </> : null
            }
        </Radio.Group>
    );
};

export default ModeAnzan;