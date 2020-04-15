import React from "react";
import {Form, Radio} from "antd";
import {useSelector} from "react-redux";

interface ModeAdditionProps {
    mods?: string;
    changeModes?: any;
    isArray?: number;
}

const ModeAnzan: React.FC<ModeAdditionProps> = ({isArray, mods}) => {
    const {language} = useSelector((state: any) => state);

    return <Form.Item name={isArray ? `mode[${isArray}]` : 'mode'} required>
        <Radio.Group className="setting-mode" buttonStyle="solid">
            {!mods || mods === 'addition' ?
                <>
                    <Radio.Button value="plus">
                        {language.common.modeNames['plus']}
                    </Radio.Button>
                    <Radio.Button value="minus">
                        {language.common.modeNames['minus']}
                    </Radio.Button>
                    <Radio.Button value="plus-minus">
                        {language.common.modeNames['plus-minus']}
                    </Radio.Button>
                </> : null
            }
            {!mods || mods === 'multiplication' ?
                <>
                    <Radio.Button value="multiply"
                                  disabled={!!isArray}>
                        {language.common.modeNames['multiply']}
                    </Radio.Button>
                    <Radio.Button value="divide"
                                  disabled={!!isArray}>
                        {language.common.modeNames['divide']}
                    </Radio.Button>
                </> : null
            }
        </Radio.Group>
    </Form.Item>
};

export default ModeAnzan;