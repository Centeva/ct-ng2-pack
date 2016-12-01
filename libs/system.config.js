(function (global) {
	System.config({
		paths: {
			// paths serve as alias
		},
		// map tells the System loader where to look for things
		map: {
			// our app is within the app folder
			app: 'app',
			// angular bundles
			'@angular/core': 'node_modules/@angular/core/bundles/core.umd.js',
			'@angular/core/testing': 'node_modules/@angular/core/bundles/core-testing.umd.js',
			'@angular/common': 'node_modules/@angular/common/bundles/common.umd.js',
			'@angular/compiler': 'node_modules/@angular/compiler/bundles/compiler.umd.js',
			'@angular/compiler/testing': 'node_modules/@angular/compiler/bundles/compiler-testing.umd.js',
			'@angular/platform-browser': 'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
			'@angular/platform-browser/testing': 'node_modules/@angular/platform-browser/bundles/platform-browser-testing.umd.js',
			'@angular/platform-browser-dynamic': 'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
			'@angular/platform-browser-dynamic/testing': 'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
			'@angular/http': 'node_modules/@angular/http/bundles/http.umd.js',
			'@angular/router': 'node_modules/@angular/router/bundles/router.umd.js',
			'@angular/forms': 'node_modules/@angular/forms/bundles/forms.umd.js',
			'@angular2-material/core': 'node_modules/@angular2-material/core/core.umd.js',
			'@angular2-material/checkbox': 'node_modules/@angular2-material/checkbox/checkbox.umd.js',

			// other libraries
			'rxjs': 'node_modules/rxjs',
			'lodash': 'node_modules/lodash/lodash.js',
			'moment': 'node_modules/moment/min/moment.min.js',
			'angular-pipes': 'node_modules/angular-pipes/src',
			'angular-pipes/aggregate': 'node_modules/angular-pipes/src/aggregate',
			'angular-pipes/array': 'node_modules/angular-pipes/src/array',
			'angular-pipes/boolean': 'node_modules/angular-pipes/src/boolean',
			'angular-pipes/math': 'node_modules/angular-pipes/src/math',
			'angular-pipes/object': 'node_modules/angular-pipes/src/object',
			'angular-pipes/string': 'node_modules/angular-pipes/src/string',

			// testing libraries
			'systemjs': 'node_modules/systemjs',
			'traceur': 'node_modules/traceur/bin/traceur.js'
		},
		// packages tells the System loader how to load when no filename and/or no extension
		packages: {
			rxjs: {
				defaultExtension: 'js'
			},
			lodash: {
				defaultExtension: 'js'
			},
			'angular-pipes': {
				main: 'index.js'
			},
			'angular-pipes/aggregate': {
				main: 'index.js'
			},
			'angular-pipes/array': {
				main: 'index.js'
			},
			'angular-pipes/boolean': {
				main: 'index.js'
			},
			'angular-pipes/math': {
				main: 'index.js'
			},
			'angular-pipes/object': {
				main: 'index.js'
			},
			'angular-pipes/string': {
				main: 'index.js'
			},
			/* Add New Components Above */
		}
	});
})(this);
