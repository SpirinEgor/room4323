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
const argv = require('yargs').argv;
const mergeStream = require('merge-stream');
const uglifyES = require('uglify-es');
const uglifyComposer = require('gulp-uglify/composer');


gulp.task('build', function() {
    runSequence('clean', 'copy-static', 'tslint', 'ts');
});

gulp.task('clean', function () {
    return del(['build']);
});

gulp.task('copy-static', function() {
    const src = gulp
        .src(['src/*.js'])
        .pipe(gulp.dest('build/'));

    const image = gulp.src(['src/images/*.*'])
        .pipe(gulp.dest("build/images"));

    const html = gulp.src(['src/**/*.html'])
        .pipe(gulp.dest("build/"));

    const css = gulp.src('src/styles/**/*.*')
        .pipe(gulp.dest("build/styles/"));

    const data = gulp.src(['src/temporary_data/*.json'])
        .pipe(gulp.dest("build/temporary_data/"))

    return mergeStream(src, html, css, image, data);
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.ts', ['ts']);
    gulp.watch('src/**/*.html', ['copy-static']);
    gulp.watch('src/*.js', ['copy-static']);
    gulp.watch('src/images/*.*', ['copy-static']);
    gulp.watch('src/styles/*.css', ['copy-static']);
    gulp.watch('src/temporary_data/*.json', ['copy-static']);
});

gulp.task('tslint', function () {
    const program = tslint.Linter.createProgram('./tsconfig.json');
    return gulp.src(['src/app/**/*.ts'])
        .pipe(gulpTsLint({
            program,
            formatter: 'prose'
        }))
        .pipe(gulpTsLint.report({
            emitError: true
        }));
});

gulp.task('ts', function() {
    const tsProject = ts.createProject('tsconfig.json');
    return tsProject
        .src()
        .pipe(tsProject())
        .pipe(gulp.dest(tsProject.config.compilerOptions.outDir))
});