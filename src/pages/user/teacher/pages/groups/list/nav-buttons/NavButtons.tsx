import React from 'react';
import {Navigation, NavigationButton} from "lib/ui";
import EditorButton from "./editor-button/EditorButton";
import {PlusOutlined} from "@ant-design/icons";

const NavButtons = () => {
    return <Navigation>
        <EditorButton title="Создать группу">
            <NavigationButton type="primary" icon={<PlusOutlined/>}>
                Создать группу
            </NavigationButton>
        </EditorButton>
    </Navigation>
};

export default React.memo(NavButtons);