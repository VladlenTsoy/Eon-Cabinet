"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var antd_1 = require("antd");
var ui_1 = require("../../../../../ui");
var icons_1 = require("@ant-design/icons");
var Chat_1 = require("./chat/Chat");
var use_screen_window_effect_1 = require("../../../../../../hooks/use-screen-window.effect");
var styled_components_1 = require("styled-components");
var ChatDrawStyled = styled_components_1["default"](ui_1.Drawer)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    .ant-drawer-wrapper-body .ant-drawer-body {\n        padding: 0;\n    }\n"], ["\n    .ant-drawer-wrapper-body .ant-drawer-body {\n        padding: 0;\n    }\n"])));
var ChatItem = function () {
    var _a = react_1.useState(false), visible = _a[0], setVisible = _a[1];
    var _b = use_screen_window_effect_1.useScreenWindow({ breakpoint: "sm" }), breakpoint = _b[1];
    var toggle = function () { return setVisible(!visible); };
    var close = react_1.useCallback(function () { return setVisible(false); }, []);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(antd_1.Badge, { count: 5 },
            react_1["default"].createElement(antd_1.Button, { type: visible ? "primary" : "default", shape: "circle", onClick: toggle, icon: react_1["default"].createElement(icons_1.MessageFilled, null) })),
        react_1["default"].createElement(ChatDrawStyled, { width: breakpoint ? "100%" : 480, getContainer: ".draw-container", style: { position: "absolute" }, closable: false, mask: false, visible: visible, onClose: close, zIndex: 4, notFooter: true },
            react_1["default"].createElement(Chat_1["default"], { close: close }))));
};
exports["default"] = react_1["default"].memo(ChatItem);
var templateObject_1;
