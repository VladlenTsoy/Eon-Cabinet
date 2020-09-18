import React from "react"
import {CreditCardOutlined} from "@ant-design/icons"
import {useHistory} from "react-router-dom"

const PaymentItem = () => {
    const history = useHistory()

    const toPayment = () => history.push("/settings/payments")

    return (
        <div onClick={toPayment}>
            <CreditCardOutlined /> Оплата
        </div>
    )
}

export default PaymentItem
