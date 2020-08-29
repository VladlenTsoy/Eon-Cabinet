"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var ContactList_1 = require("./contact-list/ContactList");
var Header_1 = require("./header/Header");
var ChatMessages_1 = require("./chat-messages/ChatMessages");
var styled_components_1 = require("styled-components");
var ChatStyled = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: grid;\n  grid-auto-rows: 41px 1fr;\n  height: 100%;\n"], ["\n  display: grid;\n  grid-auto-rows: 41px 1fr;\n  height: 100%;\n"])));
var Chat = function (_a) {
    var close = _a.close;
    var _b = react_1.useState(null), contact = _b[0], setContact = _b[1];
    var selectContact = react_1.useCallback(function (contact) {
        setContact(contact);
    }, []);
    var resetContact = react_1.useCallback(function () {
        setContact(null);
    }, []);
    return react_1["default"].createElement(ChatStyled, null,
        react_1["default"].createElement(Header_1["default"], { contact: contact, back: resetContact, close: close }),
        contact ?
            react_1["default"].createElement(ChatMessages_1["default"], { contact: contact }) :
            react_1["default"].createElement(ContactList_1["default"], { selectContact: selectContact }));
};
exports["default"] = Chat;
var templateObject_1;
