import React from 'react';
import {store} from "../../../store/reducers/director-franchise/store";
import {Provider} from "react-redux";
import DirectorFranchiseRoutes from "./DirectorFranchise.routes";

const DirectorFranchise = () =>
    <Provider store={store}>
    <DirectorFranchiseRoutes/>
</Provider>;

export default DirectorFranchise;