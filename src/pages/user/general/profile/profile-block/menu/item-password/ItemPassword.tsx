import * as React from "react";
import PasswordBlock from "./password/Password";
import {Modal} from "../../../../../../../lib/ui";
import {useState} from "react";
import { KeyOutlined } from '@ant-design/icons';

interface ItemPasswordProps {
    currentUser: any;
}

const ItemPassword:React.FC<ItemPasswordProps> = ({currentUser}) => {
    const [visible, setVisible] = useState(false);

    const open = () => setVisible(true);
    const close = () => setVisible(false);

    return <>
        <div onClick={open}>
            <KeyOutlined />Изменить пароль
        </div>
      <Modal
          title="Изменить пароль"
          className="form-modal"
          centered
          width={300}
          visible={visible}
          onCancel={close}
          cancelButtonProps={{hidden: true}}
          okButtonProps={{hidden: true}}
      >
          <PasswordBlock currentUser={currentUser} closeModal={close}/>
      </Modal>
  </>;
};

export default ItemPassword;