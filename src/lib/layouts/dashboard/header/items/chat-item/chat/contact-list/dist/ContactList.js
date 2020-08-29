"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var ContactItem_1 = require("./contact-item/ContactItem");
var ContactListStyled = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    height: 100%;\n    overflow-x: hidden;\n    overflow-y: auto;\n"], ["\n    height: 100%;\n    overflow-x: hidden;\n    overflow-y: auto;\n"])));
var ContactList = function (_a) {
    var selectContact = _a.selectContact;
    return (react_1["default"].createElement(ContactListStyled, null, Array(15)
        .fill(1)
        .map(function (_, key) { return (react_1["default"].createElement(ContactItem_1["default"], { selectContact: selectContact, key: key })); })));
};
exports["default"] = ContactList;
var templateObject_1;
