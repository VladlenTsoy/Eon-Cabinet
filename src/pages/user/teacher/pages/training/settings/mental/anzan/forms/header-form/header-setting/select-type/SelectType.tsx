import React from "react"
import {FormItem} from "../../../../../../../../../../../../lib/ui"
import {Col, Select} from "antd"
import {useLanguage} from "../../../../../../../../../../../../hooks/use-language"

const {Option} = Select

interface SelectTypeProps {
    types: any[]
    isMultiplication: boolean
    isThemes: boolean
}

const SelectType: React.FC<SelectTypeProps> = ({
    types,
    isMultiplication,
    isThemes
}) => {
    const {l} = useLanguage()

    return (
        <Col sm={isMultiplication && !isThemes ? 12 : 8} xs={12}>
            <FormItem
                label={isMultiplication ? "Второе число" : "Режим"}
                name={"type"}
                requiredMsg={
                    isMultiplication
                        ? "Выберите режим!"
                        : "Выберите второе число!"
                }
            >
                <Select loading={!types.length}>
                    {types.length
                        ? types.map((type: any) => (
                              <Option key={type} value={type}>
                                  {
                                      l("typeNames")[isMultiplication ? 1 : 0][
                                          type
                                      ]
                                  }
                              </Option>
                          ))
                        : null}
                </Select>
            </FormItem>
        </Col>
    )
}

export default React.memo(SelectType)
