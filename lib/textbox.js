'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tcomb = require('tcomb');

var _tcomb2 = _interopRequireDefault(_tcomb);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Breakpoints = require('./Breakpoints');

var _Breakpoints2 = _interopRequireDefault(_Breakpoints);

var _getLabel = require('./getLabel');

var _getLabel2 = _interopRequireDefault(_getLabel);

var _getError = require('./getError');

var _getError2 = _interopRequireDefault(_getError);

var _getHelp = require('./getHelp');

var _getHelp2 = _interopRequireDefault(_getHelp);

var _renderFormGroup = require('./renderFormGroup');

var _renderFormGroup2 = _interopRequireDefault(_renderFormGroup);

var TextboxConfig = _tcomb2['default'].struct({
  addonBefore: _tcomb2['default'].Any,
  addonAfter: _tcomb2['default'].Any,
  horizontal: _tcomb2['default'].maybe(_Breakpoints2['default']),
  buttonBefore: _tcomb2['default'].Any,
  buttonAfter: _tcomb2['default'].Any
}, 'TextboxConfig');

function getInputGroupButton(button) {
  return _react2['default'].createElement(
    'div',
    { className: 'pt-input-group-btn' },
    button
  );
}

function getInputGroup(children) {
  return _react2['default'].createElement.apply(null, ['div', { className: 'pt-input-group' }].concat(children));
}

function getAddon(addon) {
  return _react2['default'].createElement(
    'span',
    null,
    addon
  );
}

function create() {
  var overrides = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  function textbox(locals) {
    locals.config = textbox.getConfig(locals);
    locals.attrs = textbox.getAttrs(locals);

    if (locals.type === 'hidden') {
      return textbox.renderHiddenTextbox(locals);
    }

    var children = locals.config.horizontal ? textbox.renderHorizontal(locals) : textbox.renderVertical(locals);

    return textbox.renderFormGroup(children, locals);
  }

  textbox.getConfig = overrides.getConfig || function getConfig(locals) {
    return new TextboxConfig(locals.config || {});
  };

  textbox.getAttrs = overrides.getAttrs || function getAttrs(locals) {
    var attrs = _tcomb2['default'].mixin({}, locals.attrs);
    attrs.type = locals.type;
    attrs.className = _classnames2['default'](attrs.className);
    attrs.className += (attrs.className ? ' ' : '') + 'form-control';
    attrs.disabled = locals.disabled;
    if (locals.type !== 'file') {
      attrs.value = locals.value;
    }
    attrs.onChange = locals.type === 'file' ? function (evt) {
      return locals.onChange(evt.target.files[0]);
    } : function (evt) {
      return locals.onChange(evt.target.value);
    };

    if (locals.help) {
      attrs['aria-describedby'] = attrs['aria-describedby'] || attrs.id + '-tip';
    }
    return attrs;
  };

  textbox.renderHiddenTextbox = overrides.renderHiddenTextbox || function renderHiddenTextbox(locals) {
    return _react2['default'].createElement('input', { type: 'hidden', value: locals.value, name: locals.attrs.name });
  };

  textbox.renderStatic = overrides.renderStatic || function renderStatic(locals) {
    return _react2['default'].createElement(
      'p',
      { className: 'form-control-static' },
      locals.value
    );
  };

  textbox.renderTextbox = overrides.renderTextbox || function renderTextbox(locals) {
    if (locals.type === 'static') {
      return textbox.renderStatic(locals);
    }
    var ret = locals.type !== 'textarea' ? textbox.renderInput(locals) : textbox.renderTextarea(locals);
    if (locals.config.addonBefore || locals.config.addonAfter || locals.config.buttonBefore || locals.config.buttonAfter) {
      ret = textbox.renderInputGroup(ret, locals);
    }
    return ret;
  };

  textbox.renderInputGroup = overrides.renderInputGroup || function renderInputGroup(input, locals) {
    return getInputGroup([locals.config.buttonBefore ? getInputGroupButton(locals.config.buttonBefore) : null, locals.config.addonBefore ? getAddon(locals.config.addonBefore) : null, input, locals.config.addonAfter ? getAddon(locals.config.addonAfter) : null, locals.config.buttonAfter ? getInputGroupButton(locals.config.buttonAfter) : null]);
  };

  textbox.renderInput = overrides.renderInput || function renderInput(locals) {
    return _react2['default'].createElement('input', locals.attrs);
  };

  textbox.renderTextarea = overrides.renderTextarea || function renderTextarea(locals) {
    return _react2['default'].createElement('textarea', locals.attrs);
  };

  textbox.renderLabel = overrides.renderLabel || function renderLabel(locals) {
    return _getLabel2['default']({
      label: locals.label,
      htmlFor: locals.attrs.id,
      breakpoints: locals.config.horizontal
    });
  };

  textbox.renderError = overrides.renderError || function renderError(locals) {
    return _getError2['default'](locals);
  };

  textbox.renderHelp = overrides.renderHelp || function renderHelp(locals) {
    return _getHelp2['default'](locals);
  };

  textbox.renderVertical = overrides.renderVertical || function renderVertical(locals) {
    return [textbox.renderLabel(locals), textbox.renderTextbox(locals), textbox.renderError(locals), textbox.renderHelp(locals)];
  };

  textbox.renderHorizontal = overrides.renderHorizontal || function renderHorizontal(locals) {
    var label = textbox.renderLabel(locals);
    var className = label ? locals.config.horizontal.getInputClassName() : locals.config.horizontal.getOffsetClassName();
    return [label, _react2['default'].createElement(
      'div',
      { className: _classnames2['default'](className) },
      textbox.renderTextbox(locals),
      textbox.renderError(locals),
      textbox.renderHelp(locals)
    )];
  };

  textbox.renderFormGroup = overrides.renderFormGroup || _renderFormGroup2['default'];

  textbox.clone = function clone() {
    var newOverrides = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return create(_extends({}, overrides, newOverrides));
  };

  return textbox;
}

exports['default'] = create();
module.exports = exports['default'];