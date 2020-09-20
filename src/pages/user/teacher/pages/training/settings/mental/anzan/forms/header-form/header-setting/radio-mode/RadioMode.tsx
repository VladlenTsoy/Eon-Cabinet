import React from "react";
import {Form, Radio} from "antd";
import {useLanguage} from "../../../../../../../../../../../../hooks/use-language";

interface RadioModeProps {
    mods?: string;
}

// TODO - language
const RadioMode: React.FC<RadioModeProps> = ({mods}) => {
    // const {language} = useLanguage();

    return <Form.Item name="mode" required>
        <Radio.Group className="setting-mode" buttonStyle="solid">
            {!mods || mods === 'addition' ?
                <>
                    <Radio.Button value="plus">
                        {/*{language.common.modeNames['plus']}*/}
                    </Radio.Button>
                    <Radio.Button value="minus">
                        {/*{language.common.modeNames['minus']}*/}
                    </Radio.Button>
                    <Radio.Button value="plus-minus">
                        {/*{language.common.modeNames['plus-minus']}*/}
                    </Radio.Button>
                </> : null
            }
            {!mods || mods === 'multiplication' ?
                <>
                    <Radio.Button value="multiply">
                        {/*{language.common.modeNames['multiply']}*/}
                    </Radio.Button>
                    <Radio.Button value="divide">
                        {/*{language.common.modeNames['divide']}*/}
                    </Radio.Button>
                </> : null
            }
        </Radio.Group>
    </Form.Item>
};

export default React.memo(RadioMode);