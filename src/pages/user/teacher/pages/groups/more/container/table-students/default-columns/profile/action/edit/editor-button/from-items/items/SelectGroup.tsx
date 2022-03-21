import {Select} from "antd";
import React, {useEffect} from "react";
import {FormItem} from "../../../../../../../../../../../../../../../lib/ui";
import {useDispatch} from "store/store";
import {useParams} from "react-router-dom";
import {ParamsProps} from "../../../../../../../../../Group";
import {
    useLoadingSelectsGroupsByCategoryId,
    useAllSelectsGroupsByCategoryId,
    useSelectGroupById
} from "store/group/groupSelectors";
import {fetchSelectsGroups} from "store/group/fetchSelectsGroups";

const {Option} = Select;

const SelectGroup: React.FC = () => {
    const {id} = useParams<ParamsProps>();
    const group = useSelectGroupById(Number(id));
    const groups = useAllSelectsGroupsByCategoryId(group?.category.id || 0)
    const loading = useLoadingSelectsGroupsByCategoryId(group?.category.id || 0)
    const dispatch = useDispatch();

    const filter = (input: string, option: any) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

    useEffect(() => {
        if (group?.category.id) {
            const promise = dispatch(fetchSelectsGroups({groupId: group?.id, categoryId: group?.category.id}));
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
