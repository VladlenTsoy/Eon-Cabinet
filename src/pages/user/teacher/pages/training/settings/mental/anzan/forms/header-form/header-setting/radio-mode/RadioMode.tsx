import React from "react";
import {Form, Radio} from "antd";
import {useLanguage} from "../../../../../../../../../../../../hooks/use-language";

interface RadioModeProps {
    mods?: string;
}

const RadioMode: React.FC<RadioModeProps> = ({mods}) => {
    const {l} = useLanguage()

    return <Form.Item name="mode" required>
        <Radio.Group className="setting-mode" buttonStyle="solid">
            {!mods || mods === 'addition' ?
                <>
                    <Radio.Button value="plus">
                        {l('modeNames')['plus']}
                    </Radio.Button>
                    <Radio.Button value="minus">
                        {l('modeNames')['minus']}
                    </Radio.Button>
                    <Radio.Button value="plus-minus">
                        {l('modeNames')['plus-minus']}
                    </Radio.Button>
                </> : null
            }
            {!mods || mods === 'multiplication' ?
                <>
                    <Radio.Button value="multiply">
                        {l('modeNames')['multiply']}
                    </Radio.Button>
                    <Radio.Button value="divide">
                        {l('modeNames')['divide']}
                    </Radio.Button>
                </> : null
            }
        </Radio.Group>
    </Form.Item>
};

export default React.memo(RadioMode);