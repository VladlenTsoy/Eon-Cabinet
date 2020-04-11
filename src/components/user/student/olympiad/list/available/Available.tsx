import React from 'react';
import Public from "./public/Public";
import {Legend} from "layouts/components";
import Invite from "./invite/Invite";

const Available = () => {
    return <>
        <Legend>Доступные олимпиад</Legend>
        <Public/>
        <Legend>Будущие олимпиады</Legend>
        <Invite/>
    </>;
};

export default Available;