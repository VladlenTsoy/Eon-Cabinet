import {FC} from "react";
import antd from "antd";
import {ModalProps} from "antd/es/modal";
import styled from "styled-components";

const Modal: FC<ModalProps> = styled(antd.Modal)`
    .ant-modal-content {
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
    
      .ant-modal-header {
        border-bottom: 0 solid #e8e8e8;
        border-radius: 10px 10px 0 0;
    
        .ant-modal-title {
          font-size: 20px;
        }
      }
      
    .ant-modal-body {
      padding: 10px 1rem 1rem;

      .actions-block {
        text-align: right;

        button:first-child {
          margin-right: 0.5rem;
        }
      }
    }
    
      .ant-modal-footer {
        display: none;
        border-top: 0 solid #e8e8e8;
      }
    }
`;

export default Modal;