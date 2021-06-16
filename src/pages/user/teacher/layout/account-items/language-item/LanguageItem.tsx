import React, {useState} from "react"
import {Modal} from "lib/ui"
import {CheckOutlined} from "@ant-design/icons"
import {TranslationOutlined} from "@ant-design/icons"
import {
    useSelectAllLanguages,
    useSelectCurrentLanguage
} from "../../../../../../store/common/language/languageSelectors"
import styled from "styled-components"
import {fetchLanguage} from "../../../../../../store/common/language/fetchLanguage"
import {useDispatch} from "react-redux"

const LanguagesListStyled = styled.div``

const LanguageItemStyled = styled.div`
    display: flex;
    align-items: center;
    padding: 0.5rem;
    cursor: pointer;

    img {
        width: 50px;
        margin-right: 0.5rem;
    }

    .title {
        font-size: 16px;
        margin-right: auto;
    }

    .check {
        font-size: 25px;
    }

    :hover {
        background: ${props => props.theme.color_hover_item};
    }

    :not(:last-child) {
        border-bottom: 1px solid ${props => props.theme.light_color_border};
    }
`

const LanguageItem = () => {
    const currentLanguage = useSelectCurrentLanguage()
    const languages = useSelectAllLanguages()
    const [visible, setVisible] = useState<boolean>(false)
    const dispatch = useDispatch()

    const open = () => setVisible(true)
    const close = () => setVisible(false)

    const handlerChange = (abbr: string) => {
        dispatch(fetchLanguage({abbr}))
    }

    return (
        <>
            <div onClick={open}>
                <TranslationOutlined /> {currentLanguage.title}
            </div>
            <Modal title="Языки" onCancel={close} visible={visible} width={300}>
                <LanguagesListStyled>
                    {languages.map(language => (
                        <LanguageItemStyled key={language.id} onClick={() => handlerChange(language.abbr)}>
                            <img src={language.url_icon} alt={language.abbr} />
                            <span className="title">{language.title}</span>
                            {currentLanguage.abbr === language.abbr && (
                                <span className="check">
                                    <CheckOutlined />
                                </span>
                            )}
                        </LanguageItemStyled>
                    ))}
                </LanguagesListStyled>
            </Modal>
        </>
    )
}

export default LanguageItem
