import React from "react"
import {Col, Select} from "antd"
import {FormItem} from "../../../../../../../../../../../../lib/ui"
import {useLanguage} from "../../../../../../../../../../../../hooks/use-language"

const {Option} = Select

interface SelectLengthProps {
    typeAnzan: string
    lengths: any[]
    isMultiplication: boolean
    isThemes: boolean
}

const SelectLength: React.FC<SelectLengthProps> = ({
    typeAnzan,
    lengths,
    isMultiplication,
    isThemes
}) => {
    const {l} = useLanguage()

    return (
        <Col sm={isMultiplication && !isThemes ? 12 : 8} xs={12}>
            <FormItem
                name={`length`}
                label="Разряд чисел"
                requiredMsg="Выберите разряд чисел!"
            >
                <Select loading={!lengths.length}>
                    {lengths.length
                        ? lengths.map((len: any) => (
                              <Option
                                  disabled={
                                      typeAnzan === "double" && Number(len) > 7
                                  }
                                  key={len}
                                  value={len}
                              >
                                  {isMultiplication
                                      ? l("lengthNames")[len]
                                      : len}
                              </Option>
                          ))
                        : null}
                </Select>
            </FormItem>
        </Col>
    )
}

export default React.memo(SelectLength)
