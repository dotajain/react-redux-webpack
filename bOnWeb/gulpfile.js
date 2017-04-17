'use strict';

// Gulp
var gulp = require('gulp');
var chalk = require('chalk');

// General
var fs = require('fs');
var buffer = require('vinyl-buffer');
var changed = require('gulp-changed');
var replace = require('gulp-replace');
var rename = require("gulp-rename");
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var del = require('del');
var runSequence = require('run-sequence'); // Will be un-necessary after Gulp v4
var argv = require('yargs').argv;
var replace = require('gulp-replace');


// Browsersync
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var notify = require('gulp-notify');
var connectHistoryApiFallback = require('connect-history-api-fallback');
var url = require('url');
var proxy = require('proxy-middleware');

// JavaScript
var browserify = require('browserify');
var babelify = require('babelify');
var eslint = require('gulp-eslint');
var aliasify = require('aliasify');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var _ = require('lodash');
var envify = require('envify/custom');

var scsslint = require('gulp-scss-lint');

// Asset Revision
var rev = require('gulp-rev');
var collect = require('gulp-rev-collector');

// Stylesheets
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');

// JEST Testing
var shell = require('gulp-shell');

// Accessibility testing
var pa11y = require('pa11y');
var runAccessibilityTests = true;
var accessibilityStandard = 'WCAG2AA';

// CI
var zip = require('gulp-zip');

// Acceptance testing
var cucumber = require('gulp-cucumber');
var selenium = require('selenium-standalone');

// Vars
var sourceDir = './src/';
var staticFilesGlob = './src/static/**/*';
var compiledDir = './compiled/';
var htmlGlob = sourceDir + '*.{html,txt}';
var imagesGlob = sourceDir + 'images/**/*';
var fontsGlob = sourceDir + 'fonts/*';
var cssGlob = sourceDir + 'css/**/*';
var jsGlob = sourceDir + '**/*.{js,jsx}';
var unitTestsGlob = sourceDir + '**/*.spec.{js,jsx}';
var revisionBase = 'compiled';
var appVersionToken = '<!-- APP_VERSION: REPLACE -->';
var appVersionRegex = /<!-- APP_VERSION: ([0-9]|\.|REPLACE)* -->/;

var stubGlob = sourceDir + 'stub/**/*';

var packageInfo = require('./package.json');

var bank = argv.bank || 'DYB';
var env = argv.env || 'LOCAL';

function staticPath() {
	var path = [
		'./config/settings/' + bank + '/' + env + '/static/config.js',
		'./config/settings/' + bank + '/' + (env === 'LOCAL' ? 'SITB' : env) + '/static/**/*',
		'./config/stub-config.js',
	];
	return path;
}

// Kick off everything a dev will need!
gulp.task('default', function(cb) {
	runSequence(
		'clean',
		['browser-sync', 'html', 'images', 'fonts', 'sass', 'js', 'stubs', 'watch'],
		'copy-static',
		'revision',
		'version',
		cb);
});

// Run a production-optimised build. No watching.
gulp.task('prod', function(cb) {
	runSequence(
		'clean',
		'js-lint',
		'test-unit',
		['html', 'images-prod', 'fonts', 'sass-lint', 'sass-prod', 'js-prod'],
		'copy-static',
		'revision',
		cb);
});

// **** Starts CI Tasks
gulp.task('ci', function(cb) {
	runSequence(
		'clean',
		'clean-ci',
		'test-unit',
		['html', 'images-prod', 'fonts', 'sass', 'sass-lint', 'sass-prod', 'js-ci'],
		'version-prod',
		'copy-static',
		'revision',
		'package-code',
		'docs',
		'package-docs',
		cb);
});

gulp.task('clean-ci', function(cb) {
	del(['build', 'documentation/build']).then(function () {
		cb();
	});
});

gulp.task('js-ci', function() {
	return js(false, argv.release, false);
});

gulp.task('package-code', function() {
	return gulp.src('compiled/**/*')
		.pipe(zip('app.zip'))
		.pipe(gulp.dest('build/'));
});

gulp.task('package-docs', function() {
	return gulp.src('documentation/build/**/*')
		.pipe(zip('docs.zip'))
		.pipe(gulp.dest('build/'));
});
// **** Stop CI Tasks

// Watch JS and unit test files, re-run the suite on changes.
gulp.task('tdd', function() {
	return gulp.watch([unitTestsGlob, jsGlob], ['test-unit']);
});


// Copy static files.
gulp.task('copy-static', function() {
	var target = compiledDir + 'static/';
	var source = staticPath();
	return gulp.src(source)
		.pipe(changed(target))
		.pipe(gulp.dest(target));
});

gulp.task('browser-cover', function() {
	browserSync({
		port: 9000,
		ghostMode: false,
		server: {
			baseDir: './coverage/lcov-report'
		}
	});
});

// Start a browser sync server.
gulp.task('browser-sync', function() {
	var proxyOptions = url.parse('http://localhost:8090');
	proxyOptions.route = '/api';
	proxyOptions.cookieRewrite = true;
	proxyOptions.preserveHost = true;

	browserSync({
		ghostMode: false,
		server: {
			baseDir: compiledDir,
			logConnections: true,
			middleware: [
				proxy(proxyOptions),			// Reverse proxy for CORS support.
				connectHistoryApiFallback()		// Prevent browserSync trying to handle React pushState URLs.
			],
			notify: true // Initial popup in browser to indicate BrowserSync is running.
		}
	});
});

// Replace the static refereces in index.html to app.js and style.css with
// the versioned asset names.
gulp.task('revision', function() {
	return gulp.src([compiledDir + 'rev-manifest-*.json', compiledDir + 'index.html'], { base: revisionBase })
		.pipe(collect({replaceReved: true}))
		.pipe(gulp.dest(compiledDir))
		.pipe(reload({stream: true}));
});


gulp.task('version', function() {
	var packageConfig = JSON.parse(fs.readFileSync('./package.json'));
	return gulp.src([compiledDir + 'index.html'])
		.pipe(replace(appVersionRegex, appVersionToken.replace('REPLACE', packageConfig.version)))
		.pipe(gulp.dest(compiledDir));
});

gulp.task('version-prod', function() {
	return gulp.src([compiledDir + 'index.html'])
		.pipe(replace(appVersionToken, ''))
		.pipe(gulp.dest(compiledDir));
});

// Compile JS
gulp.task('js', function() {
	return js(true, false);
});

// Compile JS and watch for changes
gulp.task('js-prod', function() {
	return js(false, argv.release);
});

// Copy (changed) static HTML files.
gulp.task('html', function() {
	return gulp.src(htmlGlob)
		.pipe(gulp.dest(compiledDir));
});

// Copy (changed) image files.
gulp.task('images', function() {
	return copyImages(false);
});

// Copy (changed) image files, and minify them.
gulp.task('images-prod', function() {
	return copyImages(true);
});

// Copy font files.
gulp.task('fonts', function() {
	var fontsCompiledDir = compiledDir + 'fonts/';

	return gulp.src(fontsGlob)
		.pipe(gulp.dest(fontsCompiledDir));
});

// SASS Lint
gulp.task('sass-lint', function() {
	return gulp.src([sourceDir + 'css/**/*.*', '!' + sourceDir + 'css/vendor/**/*.*'])
	.pipe(scsslint({
		maxBuffer: 907200,
	}))
	.pipe(scsslint.failReporter());
});

// Copy (changed) stub files.
gulp.task('stubs', function() {
	return copyStubs();
});

// CSS
gulp.task('sass', function() {
	return processSass(false);
});

// CSS - Minified production build.
gulp.task('sass-prod', function() {
	return processSass(true);
});

gulp.task('test-unit', shell.task(['npm test'], {
	errorMessage: 'Unit tests failed.'
}));

gulp.task('js-lint', function() {
	return runLint();
});

/* Acceptance Testing - Start */
gulp.task('test-acceptance:setup', function(cb) {
	compiledDir = './features/compiled/';
	revisionBase = 'features/compiled'
	runSequence(
		'clean',
		'copy-static',
		['html',  'images', 'fonts', 'sass',  'js'],
		'browser-sync:acceptance',
		'revision',
		cb);
});

gulp.task('browser-sync:acceptance', function(cb) {
	var proxyOptions = url.parse('http://localhost:8090');
	proxyOptions.route = '/api';
	proxyOptions.cookieRewrite = true;

	browserSync({
		ghostMode: false,
		port: 9101,
		open: false,
		notify: false,
		server: {
			baseDir: compiledDir,
			logConnections: true,
			middleware: [
				proxy(proxyOptions),			// Reverse proxy for CORS support.
				connectHistoryApiFallback		// Prevent browserSync trying to handle React pushState URLs.
			],
		}
	}, cb);
});

gulp.task('selenium', function (done) {
	selenium.install({
		logger: function (message) { }
	}, function (err) {
		if (err) return done(err);
		selenium.start(function (err, child) {
			if (err) return done(err);
			selenium.child = child;
			done();
		});
	});
});

gulp.task('cucumber', ['test-acceptance:setup', 'selenium'], function() {
    return gulp.src('features/**/*')
		.pipe(cucumber({
		compiler: 'js:babel-register',
        'steps': 'features/**/*/steps/*.js',
        'support': ['features/support/*.js', 'features/**/*/support/*.js']
    }));
});

gulp.task('test-acceptance', ['cucumber'], function () {
	console.log('Killing selenium and browserSync processes');
	selenium.child.kill();
	browserSync.exit();
});
/* Acceptance Testing - End */


// Delete all files in the compiled folder.
gulp.task('clean', function(cb) {
	del([compiledDir]).then(function () {
		cb();
	});
});

// Run accessibility scripts.
// "access" is short for accessibility and ibility is a tough combination of keystrokes.
gulp.task('access', function() {

	var urls = [
		'http://localhost:3000/account-opening?applyFor=IM540',
		'http://localhost:3000/account-opening/step-1?applyFor=IM540',
		'http://localhost:3000/account-opening/step-2?applyFor=IM540',
		'http://localhost:3000/account-opening/review?applyFor=IM540',
		'http://localhost:3000/account-opening/submission',
		'http://localhost:3000/account-opening/security',
		'http://localhost:3000/account-opening/offer?applyFor=IM540',
		'http://localhost:3000/account-opening/id-deferred',
		'http://localhost:3000/account-opening/deferred',
		'http://localhost:3000/account-opening/sorry',
		'http://localhost:3000/account-opening/registration',
		'http://localhost:3000/account-opening/account-opened'
	];

	console.log();
	console.log(chalk.green('Running', urls.length, 'accessibility tests to', accessibilityStandard, 'standard'));

	if (runAccessibilityTests) {
		runAccessibilityTest(urls);
	}
});

gulp.task('docs', function() {
	return shell.task(['npm run docs'], {
		errorMessage: 'Docs failed to create.'
	})();
});

gulp.task('codemods', function() {
	return shell.task([
		'zsh codemods.sh'
	], {
		errorMessage: 'Codemod failed.'
	})();
});

gulp.task('docs-server', function() {
	browserSync({
		ghostMode: false,
		server: {
			baseDir: 'documentation/build/DownloadYourBankWebapp/' + packageInfo.version,
			logConnections: true,
			notify: true // Initial popup in browser to indicate BrowserSync is running.
		},
		port: 8080
	});
}
);

gulp.task('docs-serv', ['docs'],function() {
	return runSequence('docs-server');
});

// Watch files for changes and rebuild as necessary. For devs.
gulp.task('watch', function() {
	var watchers = [];

	// HTML
	watchers.push(gulp.watch(htmlGlob, function() {
		runSequence('html', 'revision');
	}));

	// Images
	watchers.push(gulp.watch(imagesGlob, function() {
		runSequence('images', 'revision');
	}));

	// CSS
	watchers.push(gulp.watch(cssGlob, function() {
		runSequence('sass', 'revision');
	}));

	// Fonts
	watchers.push(gulp.watch(fontsGlob, function() {
		runSequence('fonts', 'revision');
	}));

	watchers.push(gulp.watch('package.json', function() {
		runSequence('version');
	}));

	watchers.push(gulp.watch(staticPath(), function() {
		runSequence('copy-static');
	}));

	// Stubs
	watchers.push(gulp.watch(stubGlob, function() {
		runSequence('stubs', 'revision');
	}));

	// Unit Tests
	watchers.push(gulp.watch(unitTestsGlob, ['test-unit']));

	watchers.forEach(function(watcher) {
		watcher.on('change', onWatcherChange);
	});
});

/**
 * Run a JavaScript build.
 *
 * The 'revision' task should be run after this to update index.html
 *
 * @param  {Boolean} watch 			Start watchify. Default = false.
 * @param {Boolean} minify			Run uglify on the output? Default = false
 */
var js = function(watch, minify) {
	// Tracks if versioning via gulp-rev kicked in.
	var revisioned = false;

	// Create the initial browserify bundle.
	var bundler = browserify({
		basedir: __dirname,
		debug: !argv.release,
		entries: [sourceDir + 'js/app.jsx'],
		extensions: ['.jsx', '.js'],
		insertGlobals: true,
		cache: {},				// Needed for watchify
		packageCache: {},		// Needed for watchify
		fullPaths: watch
	});

	// Wrap the browserify bundle in a watchify bundle if necessary.
	if (watch) {
		bundler = watchify(bundler);
	}
	bundler.transform(envify({
		NODE_ENV: (!argv.release ? 'development' : 'production'),
		BANKID: bank
	}))
		.transform(babelify)
		.transform({global: true}, aliasify);

	if (minify) {
		bundler.transform('uglifyify');
	}

	var rebundle = function() {
		var _includePattern = 'js/**/*.{js,jsx}';
		var _excludePattern = 'js/**/*.spec.{js,jsx}';
		var stream = bundler.bundle();

		stream = stream.on('error', onError('Browserify error'))
			.pipe(source('app.js')) // Creates a vinyl file instance with this name
			.pipe(buffer());	// Converts vinyl file from a streaming object to a buffered one (for Uglify)

		// Shrink output for production?
		if (minify) {
			stream = stream.pipe(uglify())
				// Version assets in production.
				.pipe(rev())
				.pipe(gulp.dest(compiledDir + 'js/'))
				.pipe(rev.manifest({path: 'rev-manifest-js.json'}))
				.pipe(gulp.dest(compiledDir));

			revisioned = true;

		} else {
			stream = stream.pipe(gulp.dest(compiledDir + 'js/'));
		}

		return stream;
	};

	// Triggered by watchify when a file changes.
	bundler.on('update', function() {
		rebundle().once('finish', function(e) {
			if (revisioned) {
				runSequence('revision');
			} else {
				reload();
			}
		});
	});

	return rebundle();
};

/**
 * Process SASS files.
 *
 * The 'revision' task should be called afterwards to update index.html
 *
 * @param  {Boolean} minify 	Should the output be as small as possible?
 *                           	Default to false (i.e. dev build)
 */
var processSass = function(minify) {

	var stream = gulp.src(sourceDir + 'css/main.scss');

	if (!minify) {
		// NB - Ideally only plugins with sourcemaps support should be added here.
		// https://github.com/floridoo/gulp-sourcemaps/wiki/Plugins-with-gulp-sourcemaps-support
		stream = stream.pipe(sourcemaps.init());
	}

	stream = stream.pipe(sass())
		.on('error', onError('SASS Issue'))
		.pipe(autoprefixer());

	if (minify) {
		stream = stream.pipe(cssmin());
	} else {
		stream = stream.pipe(sourcemaps.write());
	}

	return stream.pipe(rev())
		.pipe(gulp.dest(compiledDir + 'css/'))
		.pipe(rev.manifest({path: 'rev-manifest-css.json'}))
		.pipe(gulp.dest(compiledDir));
};

/**
 * Copy images from /src/ to /compiled/
 *
 * @param  {Boolean} minify  	Run compression tool? Default to false.
 */
var copyImages = function(minify) {
	var imagesCompiledDir = compiledDir + 'images/';

	return gulp.src(imagesGlob)
		.pipe(changed(imagesCompiledDir))
		.pipe(gulp.dest(imagesCompiledDir));
};

/**
 * Copy stubs from /src/ to /compiled/
 *
 */
var copyStubs = function() {
	var stubsCompiledDir = compiledDir + 'stubs/';

	return gulp.src(stubGlob)
		.pipe(changed(stubsCompiledDir))
		.pipe(gulp.dest(stubsCompiledDir));
};

/**
 * Run the linter.
 */
var runLint = function() {
	return gulp
		.src([sourceDir + 'js/**/*.{js,jsx}'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
};

/**
 * Log errors, including arbitrary info of your own.
 *
 * @param  {str} str 			Extra text you want logged.
 * @param {Boolean} showAlert 	Prompt user with an alert popup? Default = true.
 */
var onError = function(str, showAlert) {
	if (showAlert !== false) {
		showAlert = true;
	}

	return function(err) {
		console.log(chalk.red(err));
		if (showAlert) {
			notify.onError('Gulp Task Fail - ' + str)(err);
		}
		this.emit('end');

		if (argv.release || argv.throw) {
			process.emit('exit')
		}
	};
};

process.on('exit', function () {
  process.nextTick(function () {
    process.exit(-1)
  })
})

/**
 * Log generic info about events caused by file changes.
 *
 * @param  {event} event   Watcher change event.
 */
var onWatcherChange = function(event) {
	console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
};

/**
 * Run accessibility tests
 *
 * @param  {Array} urls   An array of urls to test. The method will run until the array is empty.
 */
var runAccessibilityTest = function(urls) {

	var verboseness = {error: true, warning: false, notice: false};

	var url = _.pullAt(urls, 0)[0];

	console.log('------------------');
	console.log(chalk.blue('Checking url', url));
	console.log('------------------');

	pa11y({
		url: url,
		standard: accessibilityStandard,
		useragent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.104 Safari/537.36',
		config: {
			ignore: [
				'WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail'
			]
		},
	}, function(err, results) {

		if (err) {
			console.log(chalk.red(err));
			return;
		}

		var prefixPrimary = chalk.cyan(' > ');
		var prefixSecondary = '   ';

		var numErrors = 0;

		_.each(results.results, function(result) {

			var code = result.code;
			var message = result.message;

			switch (result.type) {
				case 'error':
					if (verboseness.error) {
						console.log(prefixPrimary + chalk.red(code));
						console.log(chalk.gray(prefixSecondary + message));
						numErrors += 1;
					}
					break;
				case 'warning':
					if (verboseness.warning) {
						console.log(prefixPrimary + chalk.yellow(code));
						console.log(chalk.gray(prefixSecondary + message));
						numErrors += 1;
					}
					break;
				case 'notice':
					if (verboseness.notice) {
						console.log(prefixPrimary + chalk.blue(code));
						console.log(chalk.gray(prefixSecondary + message));
						numErrors += 1;
					}
					break;
				default:
					break;
			}

		});

		var resultMsg;
		if (numErrors > 0) {
			resultMsg = chalk.red('Finished with', numErrors, numErrors === 1 ? 'error' : 'errors');
		} else {
			resultMsg = chalk.green('This url has met all accessibility requirements!');
		}

		console.log(prefixSecondary + resultMsg);

		// Keep running until array is empty
		if (urls.length > 0) {
			setTimeout(function() {runAccessibilityTest(urls);}, 100);
		}
	});
};

