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
var forms_1 = require('@angular/forms');
var searchOptions_1 = require('./component/searchOptions');
var editForm_1 = require('./component/editForm');
var editList_1 = require('./component/editList');
var checkList_1 = require('./component/checkList');
var pipe_module_1 = require('./pipe/pipe.module');
var Ng2PackModule = (function () {
    function Ng2PackModule() {
    }
    Ng2PackModule = __decorate([
        core_1.NgModule({
            exports: [
                searchOptions_1.SearchOptionsModule,
                editForm_1.EditformModule,
                editList_1.EditListModule,
                checkList_1.CheckListModule,
                pipe_module_1.PipesModule
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], Ng2PackModule);
    return Ng2PackModule;
}());
exports.Ng2PackModule = Ng2PackModule;
//# sourceMappingURL=ng2Pack.module.js.map