import {Select} from "antd";
import React, {useEffect} from "react";
import {FormItem} from "../../../../../../../../../../lib/ui";
import {fetchGroups} from "../../../../../../../../../../store/access/teacher/group/fetchGroups";
import {useTeacherDispatch} from "../../../../../../../../../../store/access/teacher/store";
import {Group} from "../../../../../../../../../../lib/types/teacher/Group";
import {useParams} from "react-router-dom";
import {ParamsProps} from "../../../../Group";
import {
    useLoadingGroups,
    useSelectAllGroups,
    useSelectGroupById
} from "../../../../../../../../../../store/access/teacher/group/groupSelectors";

const {Option} = Select;

const SelectGroup: React.FC = () => {
    const {id} = useParams<ParamsProps>();
    const group = useSelectGroupById(Number(id));
    const groups = useSelectAllGroups()
    const loading = useLoadingGroups()
    const dispatch = useTeacherDispatch();

    const groupsFilterCategory = (groups: Group[]): Group[] => {
        if (groups.length)
            return groups.filter((_group) => _group.category.id === group?.category.id) || [];
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
            loading={loading}
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

export default React.memo(SelectGroup);