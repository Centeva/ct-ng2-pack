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
var platform_browser_1 = require('@angular/platform-browser');
var dictionary_pipe_1 = require('./dictionary.pipe');
var isEmpty_pipe_1 = require('./isEmpty.pipe');
var search_pipe_1 = require('./search.pipe');
var PipesModule = (function () {
    function PipesModule() {
    }
    PipesModule = __decorate([
        core_1.NgModule({
            declarations: [
                dictionary_pipe_1.Dictionary,
                isEmpty_pipe_1.IsEmpty,
                search_pipe_1.Search,
            ],
            exports: [
                dictionary_pipe_1.Dictionary,
                isEmpty_pipe_1.IsEmpty,
                search_pipe_1.Search,
            ],
            imports: [
                platform_browser_1.BrowserModule
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], PipesModule);
    return PipesModule;
}());
exports.PipesModule = PipesModule;
//# sourceMappingURL=pipe.module.js.map