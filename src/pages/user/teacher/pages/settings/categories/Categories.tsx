import React from "react"
import {Card} from "../../../../../../lib/ui"
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons"
import {useSelectAllCategories} from "store/category/categorySelectors"
import {Row, Col, List, Button} from "antd"

const Categories = () => {
    const categories = useSelectAllCategories()

    console.log(categories)
    return (
        <>
            <Card>
                <Card.Title title="Категории" />
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
                    cumque dolorum impedit iusto minus! Accusantium commodi
                    corporis dolore, exercitationem odit officia pariatur porro
                    quam qui quidem sit tempore, tenetur vel.
                </p>
            </Card>
            <Row gutter={16}>
                <Col xl={8}>
                    <Card>
                        <Card.Header title="Категории" icons>
                            <span>
                                <Button disabled>Выбранные</Button>
                            </span>
                        </Card.Header>
                        <Card.Title title="По умолчанию" level={3} />
                        <List>
                            {categories.map((category) => (
                                <List.Item>{category.title}</List.Item>
                            ))}
                        </List>
                    </Card>
                </Col>
                <Col xl={8}>
                    <Card>
                        <Card.Header title="Категории" icons>
                            <span>
                                <Button>Выбрать</Button>
                            </span>
                        </Card.Header>
                        <Card.Title title="Пользовательские" level={3} />
                        <List>
                            {categories.map((category) => (
                                <List.Item
                                    actions={[
                                        <Button
                                            icon={<EditOutlined />}
                                            shape="circle"
                                            key="edit"
                                        />,
                                        <Button
                                            icon={<DeleteOutlined />}
                                            shape="circle"
                                            danger
                                            key="delete"
                                        />
                                    ]}
                                    key={category.id}
                                >
                                    {category.title}
                                </List.Item>
                            ))}
                        </List>
                        <Button block icon={<PlusOutlined />}>
                            Создать
                        </Button>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Categories
