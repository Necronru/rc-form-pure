'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _parseRules = require('./parseRules');

var _parseRules2 = _interopRequireDefault(_parseRules);

var _validateItem = require('./validateItem');

var _validateItem2 = _interopRequireDefault(_validateItem);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

var FormItem = (function(_React$PureComponent) {
  _inherits(FormItem, _React$PureComponent);

  function FormItem() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FormItem);

    for (
      var _len = arguments.length, args = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }

    return (
      (_ret = ((_temp = ((_this = _possibleConstructorReturn(
        this,
        (_ref =
          FormItem.__proto__ || Object.getPrototypeOf(FormItem)).call.apply(
          _ref,
          [this].concat(args)
        )
      )),
      _this)),
      (_this.state = {
        mirroredRules: [],
        rules: [],
        required: false,
      }),
      (_this.validatorCallback = function(message) {
        Promise.resolve().then(function() {
          return _this.props.onChangeError({
            type: _this.props.type,
            error: message,
          });
        });
      }),
      (_this.onValidateItem = function(props) {
        var rules = _this.state.rules;
        var _this$props = _this.props,
          error = _this$props.error,
          type = _this$props.type;

        (0, _validateItem2.default)(
          _extends(
            {
              type: type,
              rules: rules,
              callback: _this.validatorCallback,
              error: error,
            },
            props
          )
        );
      }),
      (_this.onChange = function(value) {
        var _this$props2 = _this.props,
          type = _this$props2.type,
          validateOnBlur = _this$props2.validateOnBlur,
          error = _this$props2.error;

        var updates = _defineProperty({}, type, value);

        _this.props.onChange({ updates: updates });

        if (!validateOnBlur) {
          _this.onValidateItem({
            value: value,
            onChangeError: _this.props.onChangeError,
          });
          // if validateOnBlur is true and it has error
        } else if (error) {
          _this.validatorCallback(null);
        }
      }),
      (_this.onBlur = function() {
        var value = _this.props.value;

        _this.onValidateItem({
          value: value,
          onChangeError: _this.props.onChangeError,
        });
      }),
      _temp)),
      _possibleConstructorReturn(_this, _ret)
    );
  }

  _createClass(
    FormItem,
    [
      {
        key: 'componentDidMount',
        value: function componentDidMount() {
          this.props.saveRefValidateItem({
            type: this.props.type,
            onValidateItem: this.onValidateItem,
          });
        },
      },
      {
        key: 'render',
        value: function render() {
          var _props = this.props,
            _props$children = _props.children,
            Component =
              _props$children === undefined
                ? function() {
                    return null;
                  }
                : _props$children,
            onChangeError = _props.onChangeError,
            _props$error = _props.error;
          _props$error = _props$error === undefined ? {} : _props$error;

          var message = _props$error.message,
            saveRefValidateItem = _props.saveRefValidateItem,
            validateOnBlur = _props.validateOnBlur,
            props = _objectWithoutProperties(_props, [
              'children',
              'onChangeError',
              'error',
              'saveRefValidateItem',
              'validateOnBlur',
            ]);

          return _react2.default.createElement(
            Component,
            _extends({}, props, {
              onChange: this.onChange,
              required: this.state.required,
              error: message || this.props.error, // user's errors (without right structure)
              validator: this.validatorCallback,
              onBlur: validateOnBlur ? this.onBlur : undefined,
            })
          );
        },
      },
    ],
    [
      {
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(nextProps, prevState) {
          if (nextProps.rules !== prevState.mirroredRules) {
            return {
              mirroredRules: nextProps.rules,
              rules: (0, _parseRules2.default)(nextProps.rules),
              required: nextProps.rules.find(function(_ref2) {
                var required = _ref2.required;
                return !!required;
              })
                ? true
                : false,
            };
          }

          return null;
        },
      },
    ]
  );

  return FormItem;
})(_react2.default.PureComponent);

FormItem.propTypes = {
  type: _propTypes2.default.string,
  saveRefValidateItem: _propTypes2.default.func,
  error: _propTypes2.default.oneOfType([
    _propTypes2.default.object,
    _propTypes2.default.array,
    _propTypes2.default.string,
  ]),
  rules: _propTypes2.default.array,
  onChange: _propTypes2.default.func,
  onChangeError: _propTypes2.default.func,
  validateOnBlur: _propTypes2.default.bool,
};
FormItem.defaultProps = {
  rules: [],
  validateOnBlur: false,
};
exports.default = FormItem;
