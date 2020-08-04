import React from 'react';
import {Provider} from "react-redux";
import {store} from "../../../store/access/admin/store";
import AdminRoutes from "./Admin.routes";

const Admin: React.FC = () => {
    return <Provider store={store}>
        <AdminRoutes/>
    </Provider>
};

export default Admin;