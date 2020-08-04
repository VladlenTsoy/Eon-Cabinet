import {Button} from "antd";
import {ButtonProps} from "antd/es/button";
import {Link} from "react-router-dom";
import React from "react";

type ButtonLinkProps = ButtonProps & {
    to: string;
}

const ButtonLink: React.FC<ButtonLinkProps> = (
    {
        to = '/',
        children,
        ...props
    }
) => {
    return <Link to={to}>
        <Button {...props}>{children}</Button>
    </Link>
};

export default ButtonLink;