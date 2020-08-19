import React from 'react';
import {Alert} from "../../../../../lib/ui";

const Notification = () => {
    return true ? <Alert
        message="This is an error message about copywriting."
        description="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
        type="error"
        showIcon
    /> : null;
};

export default Notification;