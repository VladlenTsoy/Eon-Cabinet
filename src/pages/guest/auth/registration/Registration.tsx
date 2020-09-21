import React, {useState} from "react"
import {FormItem, InputPassword, Logo} from "lib/ui"
import {Button, Form, Input, Select} from "antd"
import {Link, useHistory} from "react-router-dom"
import {ArrowLeftOutlined} from "@ant-design/icons"
import {useDispatch, useSelector} from "react-redux"
import {registrationUser} from "../../../../store/common/user/registrationUser"
import styled from "styled-components"
import {useLanguage} from "../../../../hooks/use-language"
import {languageSelector} from "../../../../store/common/language/languageSlice"
import {fetchLanguage} from "../../../../store/common/language/fetchLanguage"
import bg from "assets/images/security_SVG.svg"

const {Option} = Select

const RegistrationStyled = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

const HeaderStyled = styled.div`
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: rgba(0, 0, 0, 0.05) 0 2px 15px 0;
`

const BackButtonStyled = styled.div`
    font-size: 20px;

    a {
        color: ${(props) => props.theme.color_main};
    }

    a:hover {
        color: ${(props) => props.theme.color_primary};
    }
`

const LogoStyled = styled.div`
    width: 76px;
    padding: 0.5rem 1rem;
`

const LanguagesStyled = styled.div``

const ContainerStyled = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    padding: 1rem;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
`
const BGContainerStyled = styled.div`
    width: 100%;
    height: 100%;
    background: url(${bg}) no-repeat center;
    background-size: 65%;
`

const FormContainerStyled = styled.div`
    max-width: 350px;
    width: 100%;
    margin-left: 1rem;
`

export const TitleStyled = styled.h1`
    font-weight: bolder;
    text-align: left;
    //font-size: 40px;
    //margin-bottom: 2rem;
`
export const SubTitleStyled = styled.p`
    margin-bottom: 2rem;
`

const FooterStyled = styled.div`
    text-align: center;
    margin-bottom: 0.5rem;
`

const Registration = () => {
    const {l} = useLanguage()
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const language = useSelector(languageSelector)
    const dispatch = useDispatch()

    const handlerChange = (abbr: any) => {
        dispatch(fetchLanguage(abbr))
    }

    const handleSubmit = async (values: any) => {
        setLoading(true)
        const response = await dispatch(registrationUser(values))
        // @ts-ignore
        if (response?.type === "user/registration/fulfilled") history.push("/")
        else setLoading(false)
    }

    return (
        <RegistrationStyled>
            <HeaderStyled>
                <BackButtonStyled>
                    <Link to="/">
                        <ArrowLeftOutlined /> {l("back")}
                    </Link>
                </BackButtonStyled>
                <LogoStyled>
                    <Logo to="/" />
                </LogoStyled>
                <LanguagesStyled>
                    <Select
                        defaultValue={language.abbr}
                        onChange={handlerChange}
                    >
                        {language.languages.map((lang) => (
                            <Option value={lang.abbr} key={lang.id}>
                                <img
                                    src={lang.url_icon}
                                    alt={lang.title}
                                    width="20px"
                                />{" "}
                                {lang.title}
                            </Option>
                        ))}
                    </Select>
                </LanguagesStyled>
            </HeaderStyled>
            <ContainerStyled>
                <BGContainerStyled />
                <FormContainerStyled>
                    <TitleStyled>{l("registration")}</TitleStyled>
                    <SubTitleStyled>
                        Setup a new account in a minute.
                    </SubTitleStyled>
                    <Form
                        layout="vertical"
                        size="large"
                        onFinish={handleSubmit}
                    >
                        <FormItem
                            name="first_name"
                            requiredMsg={`${l("enter_name")}!`}
                        >
                            <Input placeholder={l("name")} />
                        </FormItem>
                        <FormItem
                            name="last_name"
                            requiredMsg={`${l("enter_surname")}!`}
                        >
                            <Input placeholder={l("surname")} />
                        </FormItem>
                        <FormItem
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: `${l("enter_email")}!`
                                },
                                {
                                    type: "email",
                                    message: `${l("invalid_email")}!`
                                }
                            ]}
                        >
                            <Input placeholder={l("email")} />
                        </FormItem>
                        <InputPassword />
                        <Form.Item
                            style={{marginBottom: "0.75rem", marginTop: "2rem"}}
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                size="large"
                                loading={loading}
                            >
                                {l("sing_up")}
                            </Button>
                        </Form.Item>
                    </Form>
                </FormContainerStyled>
            </ContainerStyled>
            <FooterStyled>
                Copyright © 2020 Eon. Developed by Vladlen
            </FooterStyled>
        </RegistrationStyled>
    )
}

export default Registration
