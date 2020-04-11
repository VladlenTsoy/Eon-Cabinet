import React, {useState} from 'react';
import { DeleteOutlined, FlagOutlined, PlusOutlined, UndoOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Empty, InputNumber } from "antd";
import {FormItem} from "../../../../../../../../../layouts/components";
import styled from "styled-components";
import {useSelector} from "react-redux";

const TableWrapper = styled.div`
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    margin-top: 1rem;
  }
  
  table{
    width: 100%;
    font-size: 16px;
    margin-bottom: 1rem;
    
    .type{
      padding-right: 1rem;
      padding-left: 1rem;
      width: 33.5%;
    }
    
    .mode{
      padding-right: 1rem;
      padding-left: 1rem;
      width: 33.5%;
    }
    
    .counter{
      padding-right: 1rem;
      padding-left: 1rem;
      padding-bottom: 0.5rem;
    
      span{
        padding-right: 6rem;
      }
      
      @media (max-width: 768px) {
        span{
          padding-right: 2rem;
        }
      }
    }
  }
  
  @media (max-width: 576px) {
    table{
      .mode{
        padding-right: 0.5rem;
        padding-left: 0;
      }
        
      .type{
        padding-right: 0.5rem;
        padding-left: 0.5rem;      
      }
        
      .counter{
        padding-right: 0;
        padding-left: 0.5rem;
      }
    }
  }
  
  .hideme{
    display: none;
  }
`;

const ButtonGroupWrapper = styled(Button.Group)`
  width: 100%;
  text-align: center;
`;

interface WordListTableProps {
    form: any;
    deleteSetting: (key: string) => void;
    clearSetting?: any;
    startApplication?: (setting: any, print: boolean) => void;
    addSettingHomework?: (setting: any) => void;
}

const WordListTable: React.FC<WordListTableProps> = (
    {
        form,
        addSettingHomework,
        startApplication,
        clearSetting,
        deleteSetting
    }
) => {
    const {language} = useSelector((state: any) => state);
    const {common} = language;

    const [loading, setLoading] = useState(false);

    const submitHandler = (e: any) => {
        e.preventDefault();
        form.validateFields(async (err: any, values: any) => {
            if (!err && values.several && Object.entries(values.several).length) {
                setLoading(true);
                if (addSettingHomework)
                    await addSettingHomework(values);
                else if (startApplication)
                    await startApplication(values, false);
            }
        });
    };

    return (
        <Form onSubmit={submitHandler}>
            <TableWrapper>
                {form.getFieldValue('several') && Object.entries(form.getFieldValue('several')).length ?
                    <table>
                        <tbody>
                        {Object.entries(form.getFieldValue('several')).map((arr: any) =>
                            <tr key={arr[0]}>
                                <td className="mode">{common['tasksTraining']['wordsList']['mode'][arr[1].mode]}</td>
                                <td className="type">{common['tasksTraining']['wordsList']['type'][arr[1].type]}</td>
                                <td className="counter">
                                    <span>{arr[1].count}</span>
                                    <Button
                                        ghost
                                        type="danger"
                                        icon={<DeleteOutlined />}
                                        shape="circle"
                                        onClick={() => deleteSetting(arr[0])}
                                    />
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table> :
                    <Empty/>
                }
                <div className="hideme">
                    <FormItem form={form} name="several"/>
                </div>
                <FormItem form={form} name="time" label="Время (Минуты)" initialValue={1} required="Выберите время">
                    <InputNumber style={{width: '100%'}} min={0.1} max={30} step={0.1}/>
                </FormItem>
            </TableWrapper>
            <ButtonGroupWrapper size="large">
                {addSettingHomework ?
                    <Button htmlType="submit" type="primary" icon={<PlusOutlined />}>Добавить</Button> :
                    <>
                        <Button icon={<UndoOutlined />} onClick={clearSetting}>Очистить</Button>
                        <Button
                            htmlType="submit"
                            type="primary"
                            icon={<FlagOutlined />}
                            loading={loading}
                        >
                            Начать
                        </Button>
                    </>
                }
            </ButtonGroupWrapper>
        </Form>
    );
};

export default WordListTable;