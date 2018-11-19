import _Object$keys from 'babel-runtime/core-js/object/keys';
import _typeof from 'babel-runtime/helpers/typeof';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import Config from './config.js';

var Fetch = function (_Config) {
	_inherits(Fetch, _Config);

	function Fetch(url, params, successFunc, errorFunc) {
		var _this;

		_classCallCheck(this, Fetch);

		var _this = _possibleConstructorReturn(this, (Fetch.__proto__ || _Object$getPrototypeOf(Fetch)).call(this));

		_this.url = (_this = _possibleConstructorReturn(this, (Fetch.__proto__ || _Object$getPrototypeOf(Fetch)).call(this)), _this)._URL + url;
		_this.params = params;
		_this.successFunc = successFunc;
		_this.errorFunc = errorFunc;
		return _this;
	}

	//发送GET请求


	_createClass(Fetch, [{
		key: 'getFetch',
		value: function getFetch() {
			var that = this;
			var str = '';
			if (_typeof(that.params) === 'object' && that.params) {
				str += '?';
				_Object$keys(that.params).forEach(function (val) {
					str += val + '=' + encodeURIComponent(that.params[val]) + '&';
				});
			}
			fetch(this.url + str, {
				method: 'GET'
			}).then(function (res) {
				if (res.ok) {
					res.json().then(function (data) {
						that.successFunc(data);
					});
				} else if (res.status === 401) {
					console.log('请求失败');
					that.errorFunc();
				}
			}, function (e) {
				console.log('请求失败');
				that.errorFunc();
			});
		}

		//发送POST请求

	}, {
		key: 'postFetch',
		value: function postFetch() {
			var that = this;
			var formData = new FormData();
			for (var k in that.params) {
				formData.append(k, that.params[k]);
			}
			formData.append('oper_id', '11');
			formData.append('oper_name', 'kong');
			fetch(this.url, {
				method: 'POST',
				mode: 'cors',
				body: formData
			}).then(function (res) {
				if (res.ok) {
					res.json().then(function (data) {
						that.successFunc(data);
					});
				} else {
					console.log('请求失败');
					that.errorFunc();
				}
			}, function (e) {
				console.log('请求失败');
				that.errorFunc();
			});
		}
	}]);

	return Fetch;
}(Config);

export default Fetch;