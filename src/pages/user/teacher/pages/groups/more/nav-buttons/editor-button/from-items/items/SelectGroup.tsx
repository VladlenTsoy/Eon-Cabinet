import {Select} from "antd";
import React, {useEffect} from "react";
import {FormItem} from "../../../../../../../../../../lib/ui";
import {useSelector} from "react-redux";
import {groupSelector} from "../../../../../../../../../../store/access/teacher/group/groupSlice";
import {fetchGroups} from "../../../../../../../../../../store/access/teacher/group/groups/fetchGroups";
import {useTeacherDispatch} from "../../../../../../../../../../store/access/teacher/store";
import {Group} from "../../../../../../../../../../lib/types/teacher/Group";

const {Option} = Select;

const SelectGroup: React.FC = () => {
    const {groups, group} = useSelector(groupSelector);
    const dispatch = useTeacherDispatch();

    const groupsFilterCategory = (groups: Group[]): Group[] => {
        if (groups.length)
            return groups.filter((_group) => _group.category.id === group.detail?.category.id) || [];
        return [];
    };

    const filter = (input: string, option: any) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

    useEffect(() => {
        const promise = dispatch(fetchGroups());
        return () => {
            promise.abort();
        }
    }, [dispatch]);

    return <FormItem name="group_id" label="Группа" requiredMsg="Выберите группу">
        <Select
            showSearch
            loading={group.loading}
            optionFilterProp="children"
            filterOption={filter}
        >
            {groupsFilterCategory(groups.data).map((item) =>
                <Option key={item.id} value={item.id}>
                    {item.title}
                </Option>
            )}
        </Select>
    </FormItem>
};

export default SelectGroup;