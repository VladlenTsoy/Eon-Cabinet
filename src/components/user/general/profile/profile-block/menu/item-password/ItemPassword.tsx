import * as React from "react";
import PasswordBlock from "./password/Password";
import {Modal} from "../../../../../../../lib";
import {useState} from "react";
import { KeyOutlined } from '@ant-design/icons';

interface ItemPasswordProps {
    currentUser: any;
}

const ItemPassword:React.FC<ItemPasswordProps> = ({currentUser}) => {
    const [modalPassword, setModalPassword] = useState(false);

    const openPasswordModal = () => setModalPassword(true);
    const closePasswordModal = () => setModalPassword(false);

    return <>
        <div onClick={openPasswordModal}>
            <KeyOutlined />Изменить пароль
        </div>
      <Modal
          title="Изменить пароль"
          className="form-modal"
          centered
          width={300}
          visible={modalPassword}
          onCancel={() => setModalPassword(false)}
          cancelButtonProps={{hidden: true}}
          okButtonProps={{hidden: true}}
      >
          <PasswordBlock currentUser={currentUser} closeModal={closePasswordModal}/>
      </Modal>
  </>;
};

export default ItemPassword;