"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var _ = require('lodash');
var SearchModel = (function () {
    function SearchModel(matchArray, matchObject) {
        if (matchObject === void 0) { matchObject = ''; }
        this.matchArray = [''];
        this.matchObject = '';
        this.matchArray = matchArray;
        this.matchObject = matchObject;
    }
    SearchModel = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [Array, Object])
    ], SearchModel);
    return SearchModel;
}());
exports.SearchModel = SearchModel;
var Search = (function () {
    function Search() {
    }
    Search.prototype.transform = function (value, args) {
        if (args.matchObject === (null || "")) {
            return value;
        }
        var returnVal = _.filter(value, function (x) {
            var gets;
            gets = _.map(args.matchArray, function (m) { return _.get(x, m); });
            var _loop_1 = function(get) {
                var result = void 0;
                if (typeof (args.matchObject) === 'string') {
                    result = get.toString().toLowerCase().includes(args.matchObject.toLowerCase());
                }
                else if (args.matchObject instanceof Array) {
                    result = _.some(args.matchObject, function (x) { return x === get; });
                }
                else {
                    result = get === args.matchObject;
                }
                if (result === true)
                    return { value: result };
            };
            for (var _i = 0, gets_1 = gets; _i < gets_1.length; _i++) {
                var get = gets_1[_i];
                var state_1 = _loop_1(get);
                if (typeof state_1 === "object") return state_1.value;
            }
            ;
            return false;
        });
        return returnVal;
    };
    Search = __decorate([
        core_1.Pipe({
            name: 'search',
            pure: false
        }), 
        __metadata('design:paramtypes', [])
    ], Search);
    return Search;
}());
exports.Search = Search;
//# sourceMappingURL=search.pipe.js.map