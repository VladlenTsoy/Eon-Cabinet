import React, {useState} from 'react';
import {DeleteOutlined, FlagOutlined, PlusOutlined, UndoOutlined} from '@ant-design/icons';
import {Button, Empty, InputNumber, Form} from "antd";
import {FormItem} from "../../../../../../../../../../layouts/components";
import styled from "styled-components";
import {useAppContext} from "store/context/use-app-context";
import {FormInstance} from "antd/es/form";

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
    
      div{
        display: inline;
        padding-right: 6rem;
      }
      
      @media (max-width: 768px) {
        div{
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
    form: FormInstance,
    fields: any[],
    deleteSetting: (key: string) => void;
    clearSetting?: any;
    startApplication?: (setting: any, print: boolean) => void;
    addSettingHomework?: (setting: any) => void;
}

const WordListTable: React.FC<WordListTableProps> = (
    {
        form,
        fields,
        addSettingHomework,
        startApplication,
        clearSetting,
        deleteSetting
    }
) => {
    const {language} = useAppContext();
    const {common} = language;

    const [loading, setLoading] = useState(false);

    const submitHandler = async (values: any) => {
        if (values.several && Object.entries(values.several).length) {
            setLoading(true);
            if (addSettingHomework)
                await addSettingHomework(values);
            else if (startApplication)
                await startApplication(values, false);
        }
    };

    const severalFields = fields.filter((field: any) => new RegExp(field.name.join('|')).test('several'));

    return <Form
        form={form}
        onFinish={submitHandler}
        layout="vertical"
    >
        <TableWrapper>
            {severalFields ?
                <table>
                    <tbody>
                    {severalFields.map((field: any, key) =>
                        <tr key={key}>
                            <td className="mode">{common['tasksTraining']['wordsList']['mode'][field.value.mode]}</td>
                            <td className="type">{common['tasksTraining']['wordsList']['type'][field.value.type]}</td>
                            <td className="counter">
                                <div>{field.value.count}</div>
                                <Button
                                    ghost
                                    type="danger"
                                    icon={<DeleteOutlined/>}
                                    shape="circle"
                                    onClick={() => deleteSetting(field.name[1])}
                                />
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table> :
                <Empty/>
            }
            <div className="hideme">
                <FormItem name="several"/>
            </div>
            <FormItem
                name="time"
                label="Время (Минуты)"
                requiredMsg="Выберите время"
            >
                <InputNumber style={{width: '100%'}} min={0.1} max={30} step={0.1}/>
            </FormItem>
        </TableWrapper>
        <ButtonGroupWrapper size="large">
            {addSettingHomework ?
                <Button htmlType="submit" type="primary" icon={<PlusOutlined/>}>Добавить</Button> :
                <>
                    <Button icon={<UndoOutlined/>} onClick={clearSetting}>Очистить</Button>
                    <Button
                        htmlType="submit"
                        type="primary"
                        icon={<FlagOutlined/>}
                        loading={loading}
                    >
                        Начать
                    </Button>
                </>
            }
        </ButtonGroupWrapper>
    </Form>
};

export default WordListTable;