"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var use_user_1 = require("hooks/use-user");
var ui_1 = require("lib/ui");
var ContactItemStyled = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    display: grid;\n    gap: 1rem;\n    grid-template-columns: 50px 1fr;\n    overflow: hidden;\n    padding: 0.5rem 1rem;\n    align-items: center;\n    cursor: pointer;\n\n    :hover {\n        background: ", ";\n    }\n\n    .content {\n        overflow: hidden;\n\n        .full-name {\n            position: relative;\n            color: ", ";\n\n            span:first-child {\n                margin-right: 0.25rem;\n            }\n\n            .time {\n                font-size: 12px;\n                position: absolute;\n                color: ", ";\n                right: 0;\n            }\n        }\n\n        .last-message {\n            color: ", ";\n            display: flex;\n\n            p {\n                white-space: nowrap;\n                text-overflow: ellipsis;\n                overflow: hidden;\n                width: 100%;\n                margin-bottom: 0;\n\n                .me {\n                    color: ", ";\n                    margin-right: 0.25rem;\n                }\n            }\n\n            .notify-count {\n                background: ", ";\n                color: #ffffff;\n                border-radius: 50%;\n                margin-left: 0.5rem;\n                padding: 0 7px;\n            }\n        }\n    }\n"], ["\n    display: grid;\n    gap: 1rem;\n    grid-template-columns: 50px 1fr;\n    overflow: hidden;\n    padding: 0.5rem 1rem;\n    align-items: center;\n    cursor: pointer;\n\n    :hover {\n        background: ", ";\n    }\n\n    .content {\n        overflow: hidden;\n\n        .full-name {\n            position: relative;\n            color: ", ";\n\n            span:first-child {\n                margin-right: 0.25rem;\n            }\n\n            .time {\n                font-size: 12px;\n                position: absolute;\n                color: ", ";\n                right: 0;\n            }\n        }\n\n        .last-message {\n            color: ", ";\n            display: flex;\n\n            p {\n                white-space: nowrap;\n                text-overflow: ellipsis;\n                overflow: hidden;\n                width: 100%;\n                margin-bottom: 0;\n\n                .me {\n                    color: ", ";\n                    margin-right: 0.25rem;\n                }\n            }\n\n            .notify-count {\n                background: ", ";\n                color: #ffffff;\n                border-radius: 50%;\n                margin-left: 0.5rem;\n                padding: 0 7px;\n            }\n        }\n    }\n"])), function (props) { return props.theme.color_hover_item; }, function (props) { return props.theme.color_black; }, function (props) { return props.theme.color_second; }, function (props) { return props.theme.color_second; }, function (props) { return props.theme.color_primary; }, function (props) { return props.theme.gradient_primary; });
var Contactitem = function (_a) {
    var selectContact = _a.selectContact;
    var user = use_user_1.useUser().user;
    var onClickHandler = function () { return selectContact(user); };
    return (react_1["default"].createElement(ContactItemStyled, { onClick: onClickHandler },
        react_1["default"].createElement("div", null,
            react_1["default"].createElement(ui_1.Avatar, { src: user.image, width: "50px" })),
        react_1["default"].createElement("div", { className: "content" },
            react_1["default"].createElement("div", { className: "full-name" },
                react_1["default"].createElement("span", null, user.last_name),
                react_1["default"].createElement("span", null, user.first_name),
                react_1["default"].createElement("span", { className: "time" }, "12:58")),
            react_1["default"].createElement("div", { className: "last-message" },
                react_1["default"].createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto beatae consequuntur culpa doloribus eligendi expedita facilis, fugit nesciunt optio quas, qui quo repudiandae sapiente sit soluta ut vitae? Blanditiis, reiciendis."),
                react_1["default"].createElement("div", { className: "notify-count" }, "1")))));
};
exports["default"] = Contactitem;
var templateObject_1;
