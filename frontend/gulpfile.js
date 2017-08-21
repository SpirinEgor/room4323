'use strict';

const gulp = require('gulp');
const tsconfig = require('./tsconfig.json');
const ts = require('gulp-typescript');
const typescript = require('typescript');
const del = require('del');
const tslint = require('tslint');
const gulpTsLint = require('gulp-tslint');
const ngConstant = require('gulp-ng-constant');
const browserify = require('gulp-browserify');
const rename = require('gulp-rename');
const less = require('gulp-less');
const htmlReplace = require('gulp-html-replace');
const execSync = require('child_process').execSync;
const exec = require('child_process').exec;
const gulpInject = require('gulp-inject');
const gulpConcat = require('gulp-concat');
const _ = require('lodash');
const runSequence = require('run-sequence');
const KarmaServer = require('karma').Server;
const argv = require('yargs').argv;
const mergeStream = require('merge-stream');
const uglifyES = require('uglify-es');
const uglifyComposer = require('gulp-uglify/composer');


gulp.task('start', function() {
    runSequence('clean', 'copy-static', 'build');
    const run = exec('sudo npm run build:watch');
    const watch = exec('sudo gulp watch');
    // return mergeStream(run, watch);
});

gulp.task('clean', function () {
    return del(['build']);
});

gulp.task('copy-static', function() {
    const src = gulp
        .src(['src/*.js', 'src/*.html'])
        .pipe(gulp.dest('build/'));

    const image = gulp.src(['src/images/*.*'], {base: "./src/images"})
        .pipe(gulp.dest("build/images"));

    const html = gulp.src(['src/app/**/*.html'], {base: "./src/app"})
        .pipe(gulp.dest("build/app"));

    const css = gulp.src('src/styles/**/*.css')
        .pipe(gulp.dest("build/styles/"));

    const data = gulp.src(['src/temporary_data/*.json'], {base: "./src/temporary_data"})
        .pipe(gulp.dest("build/temporary_data"))

    return mergeStream(src, html, css, image, data);
});

gulp.task('build', function() {
    exec('sudo npm start');
});

gulp.task('install', function() {
    exec('sudo npm run build');
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.*', ['copy-static']);
})