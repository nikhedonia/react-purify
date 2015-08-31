'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _extend = require('extend');

var _extend2 = _interopRequireDefault(_extend);

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

var use = function use(context) {
  var get = arguments.length <= 1 || arguments[1] === undefined ? function (x) {
    return x;
  } : arguments[1];

  var Types = {};
  if (Array.isArray(context)) {
    context.forEach(function (k) {
      Types[k] = _reactAddons2['default'].PropTypes.any;
    });
  } else {
    Types = context;
  }
  var wrapper = function wrapper(Component) {
    return (function () {
      _createClass(_class, null, [{
        key: 'contextTypes',
        value: Types,
        enumerable: true
      }]);

      function _class() {
        _classCallCheck(this, _class);

        console.log('constructing use');
      }

      _createClass(_class, [{
        key: 'render',
        value: function render() {
          return _reactAddons2['default'].createElement(Component, _extends({}, this.props, get(this.context)));
        }
      }]);

      return _class;
    })();
  };

  return (/*(this)?wrapper(this):*/wrapper
  );
};

exports.use = use;
var compute = function compute(_compute) {
  var wrapper = function wrapper(Component) {
    return (function () {
      function _class2(props) {
        _classCallCheck(this, _class2);

        console.log('constructing compute');
        console.log('recompute', props);
        this.computed = _compute(props);
      }

      _createClass(_class2, [{
        key: 'componentWillUpdate',
        value: function componentWillUpdate(props) {
          if (_reactAddons2['default'].addons.PureRenderMixin.shouldComponentUpdate.call(this, props)) {
            console.log('recompute', props);
            this.computed = _compute(props);
          }
        }
      }, {
        key: 'render',
        value: function render() {
          return _reactAddons2['default'].createElement(Component, _extends({}, this.props, this.computed));
        }
      }]);

      return _class2;
    })();
  };

  return (/*(this)?wrapper(this):*/wrapper
  );
};

exports.compute = compute;
var inject = function inject(context) {

  var Types = Object.entries(context).reduce(function (contextTypes, _ref) {
    var _ref2 = _slicedToArray(_ref, 2);

    var k = _ref2[0];
    var v = _ref2[1];

    contextTypes[k] = _reactAddons2['default'].PropTypes.any;
    return contextTypes;
  }, {});

  var wrapper = function wrapper(Component) {
    return (function () {
      function _class3() {
        _classCallCheck(this, _class3);
      }

      _createClass(_class3, [{
        key: 'getChildContext',
        value: function getChildContext() {
          return context;
        }
      }, {
        key: 'render',
        value: function render() {
          return _reactAddons2['default'].createElement(Component, _extends({}, this.props, this.context));
        }
      }], [{
        key: 'childContextTypes',
        value: Types,
        enumerable: true
      }]);

      return _class3;
    })();
  };

  return (/*(this)?wrapper(this):*/wrapper
  );
};

exports.inject = inject;
var mix = function mix(mixins) {
  var wrapper = function wrapper(Component) {
    mixins.forEach(function (mixin) {
      return (0, _extend2['default'])(Component.prototype, mixin);
    });
    return Component;
  };

  return (/*(this)?wrapper(this):*/wrapper
  );
};

exports.mix = mix;
var pure = function pure() {
  return mix.call(this, [_reactAddons2['default'].addons.PureRenderMixin]);
};

exports.pure = pure;
var pureUI = function pureUI(renderFunc) {
  return (function () {
    function _class4() {
      _classCallCheck(this, _class42);
    }

    _createClass(_class4, [{
      key: 'render',
      value: function render() {
        return renderFunc.call(this, this.props);
      }
    }]);

    var _class42 = _class4;
    _class4 = pure()(_class4) || _class4;
    return _class4;
  })();
};

exports.pureUI = pureUI;
var UI = function UI(renderFunc) {
  return (function () {
    function _class5() {
      _classCallCheck(this, _class5);
    }

    _createClass(_class5, [{
      key: 'render',
      value: function render() {
        return renderFunc.call(this, this.props);
      }
    }]);

    return _class5;
  })();
};
exports.UI = UI;