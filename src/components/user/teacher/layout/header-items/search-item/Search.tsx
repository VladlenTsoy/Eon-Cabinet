import React, {useState} from "react";
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { Select } from "antd";
import {useSelector} from "react-redux";
import styled from "styled-components";
import SearchOption from "./SearchOption";
import {pdfRender} from "../../../training/tasks/print/general";

const SearchWrapper = styled.div`
  margin-right: auto;
  display: flex;
  align-items: center;
  padding: 0 0 0 1rem;
  color: ${props => props.theme.color_minimal};
  
  & > .anticon {
    margin: 0;
    line-height: 1.5;
  }
  
  :hover .anticon{
    color: ${props => props.theme.color_primary};
  }
  
  @media (max-width: 576px) {
    margin-top: 1rem;
    margin-bottom: 1rem;

    font-size: 16px;
    padding-left: 24px;

    & > .anticon {
        line-height: 25px;
        min-width: 25px;
        font-size: 25px;
        margin-right: 10px;
        vertical-align: middle;
    }
  
  }
`;

const SelectWrapper = styled(Select)`
  &.ant-select > div.ant-select-selector{
    border: 0;
    box-shadow: none !important;
    width: 200px;
  }
`;

const Search = () => {
    const {api, language} = useSelector((state: any) => state);
    const [data, setData] = useState<any>([]);
    const [timer, setTimer] = useState<any>(0);
    const [loading, setLoading] = useState(false);

    const handleSearch = (value: string) => {
        clearTimeout(timer);
        if (value.trim().length) {
            setLoading(true);
            setTimer(setTimeout(async () => {
                let response = await api.user_general.get('/algorithm/check/list', {params: {search_id: value}});
                setData(response.data.length ? response.data : null);
                setLoading(false);
            }, 1000));
        } else {
            setLoading(false);
            setData([]);
        }
    };

    const handleChange = async (value: any) => {
        const list = data.find((item: any) => item.id === Number(value));
        await pdfRender(list.settings, list, language.common);
    };

    const notFound = () => {
        if (loading)
            return <div><LoadingOutlined /> Поиск...</div>;
        if (data === null)
            return 'ID Не Найден';
        return null;
    };

    return (
        <SearchWrapper>
            <SearchOutlined />
            <SelectWrapper
                showSearch
                value={undefined}
                loading={loading}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                notFoundContent={notFound()}
                placeholder="Введите ID Листа"
                onSearch={handleSearch}
                onChange={handleChange}
            >
                {data ? data.map((d: any) =>
                    <Select.Option key={d.id} value={d.id}>
                        <SearchOption item={d}/>
                    </Select.Option>
                ) : null}
            </SelectWrapper>
        </SearchWrapper>
    );
};

export default Search;