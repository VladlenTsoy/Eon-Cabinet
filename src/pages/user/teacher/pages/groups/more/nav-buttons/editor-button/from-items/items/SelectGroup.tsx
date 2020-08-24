import {Select} from "antd";
import React, {useEffect} from "react";
import {FormItem} from "../../../../../../../../../../lib/ui";
import {fetchGroups} from "../../../../../../../../../../store/access/teacher/group/fetchGroups";
import {useTeacherDispatch} from "../../../../../../../../../../store/access/teacher/store";
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

    const filter = (input: string, option: any) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

    useEffect(() => {
        if (group?.category.id) {
            const promise = dispatch(fetchGroups({categoryId: group?.category.id}));
            return () => {
                promise.abort();
            }
        }
    }, [dispatch, group]);

    return <FormItem name="group_id" label="Группа" requiredMsg="Выберите группу">
        <Select
            showSearch
            loading={loading}
            optionFilterProp="children"
            filterOption={filter}
        >
            {groups.map((item) =>
                <Option key={item.id} value={item.id}>
                    {item.title}
                </Option>
            )}
        </Select>
    </FormItem>
};

export default React.memo(SelectGroup);