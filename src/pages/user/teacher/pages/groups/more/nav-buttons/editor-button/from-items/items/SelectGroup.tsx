import {Select} from "antd";
import React, {useEffect} from "react";
import {FormItem} from "../../../../../../../../../../lib/components";
import {useDispatch, useSelector} from "react-redux";
import {GroupProps, groupSelector} from "../../../../../../../../../../store/access/teacher/group/groupSlice";
import {fetchGroups} from "../../../../../../../../../../store/access/teacher/group/fetchGroups";
import {disciplineSelector} from "../../../../../../../../../../store/access/teacher/discipline/disciplineSlice";
const {Option} = Select;

const SelectGroup: React.FC = () => {
    const {activeDisciplineId} = useSelector(disciplineSelector);
    const {groups, group, fetchLoading} = useSelector(groupSelector);
    const dispatch = useDispatch();

    const groupsFilterCategory = (groups: GroupProps[]): GroupProps[] => {
        if(groups.length)
            return groups.filter((_group) => _group.category.id === group?.category.id) || [];
        return [];
    };

    const filter = (input: string, option: any) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

    useEffect(() => {
        const promise = dispatch(fetchGroups({activeDisciplineId}));
        return () => {
            promise.abort();
        }
    }, [dispatch, activeDisciplineId]);

    return <FormItem name="group_id" label="Группа" requiredMsg="Выберите группу">
        <Select
            showSearch
            loading={fetchLoading}
            optionFilterProp="children"
            filterOption={filter}
        >
            {groupsFilterCategory(groups).map((item) =>
                <Option key={item.id} value={item.id}>
                    {item.title}
                </Option>
            )}
        </Select>
    </FormItem>
};

export default SelectGroup;