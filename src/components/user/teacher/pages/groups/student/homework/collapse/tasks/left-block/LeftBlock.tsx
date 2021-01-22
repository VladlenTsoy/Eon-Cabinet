import React, {useState} from 'react';
import winIcon from "assets/images/illustrations/win.svg";
import lossIcon from "assets/images/illustrations/loss.svg";
import { SettingOutlined, DownloadOutlined } from '@ant-design/icons';
import {Button, message} from "antd"
import styled from "styled-components";
import ExerciseLists from "../../../../../../homework/editor/tabs-tasks/added-exercises/exercise-lists/ExerciseLists";
import {Modal} from "lib";
import {useAppContext} from "../../../../../../../../../../store/context/use-app-context"

const LeftBlockWrapper = styled.div`
  display: grid;
  grid-gap: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  align-items: center;
    
  h3 {
    text-align: center;
    margin-bottom: 0;
    line-height: 1;
    font-size: 16px;
  }
  
  .exodus {
    width: 100%;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }  
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    //grid-gap: 0.5rem;
    
    .exodus {
      grid-row-start: 1;
      grid-row-end: 4;
    }
  }
`;

interface LeftBlockProps {
    task: any;
    state: string;
    setState: (state: string) => void;
}

const LeftBlock: React.FC<LeftBlockProps> = ({task, state, setState}) => {
    const {language} = useAppContext();
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const open = () => setVisible(true);
    const close = () => setVisible(false);

    const clickHandler = async () => {
        setLoading(true)
        const {pdfRender} = await import("../../../../../../../pages/training/settings/print/general");

        try {
            task.data = task.first.totals
            if(task.settings?.custom_exercises_id && (task.settings.mode === 'multiply' || task.settings.mode === 'divide'))
            task.data = task.data.map((val: any) => ({...val, exercise: `${val.exercise[0]} ${task.settings.mode === 'multiply' ? '*':'/'} ${val.exercise[0]}`}))
            await pdfRender(task.settings, task, language.common);
            setLoading(false)
        } catch (e) {
            console.error(e)
            message.error('Ошибка!')
            setLoading(false)
        }
    }

    const clickStateHandler = () => {
        setState(state === 'first' ? 'second' : 'first');
    };

    return (
        <LeftBlockWrapper>
            <h3>Попытка №{state === 'first' ? '1' : '2'}</h3>
            {task[state].exodus ?
                <img src={winIcon} alt=""
                     className="exodus"/> :
                <img src={lossIcon} alt=""
                     className="exodus"/>
            }
            <Button disabled={!task.second} onClick={clickStateHandler}>Попытка №{state === 'first' ? '2' : '1'}</Button>
            <Button icon={<DownloadOutlined />} onClick={clickHandler} loading={loading}>Скачать</Button>
            <Button icon={<SettingOutlined />} onClick={open}>Настройки</Button>
            <Modal
                visible={visible}
                onCancel={close}
            >
                <ExerciseLists exercise={task}/>
            </Modal>
        </LeftBlockWrapper>
    );
};

export default LeftBlock;