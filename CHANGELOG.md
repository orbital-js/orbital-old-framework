<a name="1.0.0-alpha.25"></a>
# [1.0.0-alpha.25](https://github.com/orbital-js/orbital/compare/1.0.0-alpha.24...v1.0.0-alpha.25) (2017-09-10)


### Bug Fixes

* **core/cli:** options and default commands function as expected ([74e82a6](https://github.com/orbital-js/orbital/commit/74e82a6))
* **core/cli:** point to the right places ([5365b15](https://github.com/orbital-js/orbital/commit/5365b15))
* **core/cli:** properly address variadic arguments and methods ([6022569](https://github.com/orbital-js/orbital/commit/6022569))


### Code Refactoring

* **middlewares:** move to path based syntax ([7ad1ece](https://github.com/orbital-js/orbital/commit/7ad1ece))


### Features

* **core:** add engine property to config ([25df99c](https://github.com/orbital-js/orbital/commit/25df99c))
* **core:** add engines constant ([817a97a](https://github.com/orbital-js/orbital/commit/817a97a))
* **core/cli:** add CLI platform! ([4b540d4](https://github.com/orbital-js/orbital/commit/4b540d4))
* **middlewares/morgan:** add Morgan middleware ([fe25348](https://github.com/orbital-js/orbital/commit/fe25348))


### BREAKING CHANGES

* **middlewares:** Middlewares are now valid subfolder modules for code minimalism and organization



<a name="1.0.0-alpha.24"></a>
# [1.0.0-alpha.24](https://github.com/orbital-js/orbital/compare/1.0.0-alpha.23...1.0.0-alpha.24) (2017-08-14)


### Bug Fixes

* remove extra console logs ([1b79de5](https://github.com/orbital-js/orbital/commit/1b79de5))
* **core:** add optional path property to middleware ([a71cc04](https://github.com/orbital-js/orbital/commit/a71cc04))
* **core:** allow middleware factories with RequestHandler type on use ([d437b97](https://github.com/orbital-js/orbital/commit/d437b97))
* **core:** cycle path of middlewares ([88ff6d8](https://github.com/orbital-js/orbital/commit/88ff6d8))
* **core:** export additional classes from injection ([9310c8f](https://github.com/orbital-js/orbital/commit/9310c8f))
* **core:** make middleware config optional ([1c98e6b](https://github.com/orbital-js/orbital/commit/1c98e6b))
* **graphql:** add ExecutionResult type ([c12aea2](https://github.com/orbital-js/orbital/commit/c12aea2))
* **graphql:** explicitly type methods ([7777ae0](https://github.com/orbital-js/orbital/commit/7777ae0))
* **middlewares:** restructure to accomodate typescript's weirdness ([4910d31](https://github.com/orbital-js/orbital/commit/4910d31))
* **middlewares/body-parser:** add internal typings for modules ([29cdf30](https://github.com/orbital-js/orbital/commit/29cdf30))
* **middlewares/body-parser:** take options parameter from factory ([4e179c9](https://github.com/orbital-js/orbital/commit/4e179c9))


### Features

* **graphql:** add graphql wrapper for Orbital! Looking for feature requests and PRs to improve the module ([ca3f6c4](https://github.com/orbital-js/orbital/commit/ca3f6c4))
* **middlewares:** add middlewares package with body parser ([5d6f67b](https://github.com/orbital-js/orbital/commit/5d6f67b))



<a name="1.0.0-alpha.23"></a>
# [1.0.0-alpha.23](https://github.com/orbital-js/orbital/compare/v1.0.0-alpha.23...1.0.0-alpha.23) (2017-08-11)



<a name="1.0.0-alpha.23"></a>
# [1.0.0-alpha.23](https://github.com/orbital-js/orbital/compare/1.0.0-alpha.22...v1.0.0-alpha.23) (2017-08-11)


### Bug Fixes

* **core:** take any middleware as argument to Use ([65cc310](https://github.com/orbital-js/orbital/commit/65cc310))


### Features

* **core:** add ModuleWithProviders ([bed29d5](https://github.com/orbital-js/orbital/commit/bed29d5))
* **mongo:** complete mongo interface ([1cb44aa](https://github.com/orbital-js/orbital/commit/1cb44aa))
* **mongo:** configure mongo database provider ([17655fb](https://github.com/orbital-js/orbital/commit/17655fb))
* **mongo:** create mongo module ([d1ee287](https://github.com/orbital-js/orbital/commit/d1ee287))



<a name="1.0.0-alpha.22"></a>
# [1.0.0-alpha.22](https://github.com/orbital-js/orbital/compare/v1.0.0-alpha.18...1.0.0-alpha.22) (2017-08-03)


### Bug Fixes

* **core:** middleware decorator takes no args ([f3d9166](https://github.com/orbital-js/orbital/commit/f3d9166))
* **core:** remove extraneous config properties from middleware ([dd27e0e](https://github.com/orbital-js/orbital/commit/dd27e0e))
* **core:** remove extraneous console logs ([72183eb](https://github.com/orbital-js/orbital/commit/72183eb))
* **http:** export http provider ([8be53c3](https://github.com/orbital-js/orbital/commit/8be53c3))
* **http:** remove requirement for options argument ([13a78bc](https://github.com/orbital-js/orbital/commit/13a78bc))


### Code Refactoring

* **core:** rename route -> orbital ([0dd008a](https://github.com/orbital-js/orbital/commit/0dd008a))


### Features

* **core:** add route decorator! ([2fd7327](https://github.com/orbital-js/orbital/commit/2fd7327))
* **http:** depend on RxJS ([e5e1a8c](https://github.com/orbital-js/orbital/commit/e5e1a8c))


### BREAKING CHANGES

* **core:** rename @Route to @Orbital, and change `routes`	 property of  Module to orbitals.
* **core:** The @Route decorator is now @Orbital. @Route has changed to a property decorator
for use on multiple methods in a single Orbital. Mind this change when upgrading.



<a name="1.0.0-alpha.18"></a>
# [1.0.0-alpha.18](https://github.com/orbital-js/orbital/compare/1.0.0-alpha.17...v1.0.0-alpha.18) (2017-07-31)


### Bug Fixes

* **core:** cycle IMPORTS instead of middlewares ([2bb614a](https://github.com/orbital-js/orbital/commit/2bb614a))


### Features

* **core:** add interfaces for all and use ([28391ee](https://github.com/orbital-js/orbital/commit/28391ee))
* **core:** inject middlewares ([a5c683c](https://github.com/orbital-js/orbital/commit/a5c683c))
* **http:** complete wrapper ([a806ce9](https://github.com/orbital-js/orbital/commit/a806ce9))



<a name="1.0.0-alpha.17"></a>
# [1.0.0-alpha.17](https://github.com/orbital-js/orbital/compare/v1.0.0-alpha.17...1.0.0-alpha.17) (2017-07-31)



<a name="1.0.0-alpha.17"></a>
# [1.0.0-alpha.17](https://github.com/orbital-js/orbital/compare/1.0.0-alpha.15...v1.0.0-alpha.17) (2017-07-31)


### Bug Fixes

* **core:** clean up code and allow more methods ([8e97ef6](https://github.com/orbital-js/orbital/commit/8e97ef6))



<a name="1.0.0-alpha.15"></a>
# [1.0.0-alpha.15](https://github.com/orbital-js/orbital/compare/v1.0.0-alpha.16...1.0.0-alpha.15) (2017-07-31)


### Bug Fixes

* rename build script ([2db6cab](https://github.com/orbital-js/orbital/commit/2db6cab))



<a name="1.0.0-alpha.16"></a>
# [1.0.0-alpha.16](https://github.com/orbital-js/orbital/compare/v1.0.0-alpha.15...v1.0.0-alpha.16) (2017-07-31)


### Bug Fixes

* **core:** remove extraneous console logs ([29c587e](https://github.com/orbital-js/orbital/commit/29c587e))



<a name="1.0.0-alpha.15"></a>
# [1.0.0-alpha.15](https://github.com/orbital-js/orbital/compare/v1.0.0-alpha.14...v1.0.0-alpha.15) (2017-07-31)


### Bug Fixes

* **core:** properly inject routes ([67126b5](https://github.com/orbital-js/orbital/commit/67126b5))



<a name="1.0.0-alpha.14"></a>
# [1.0.0-alpha.14](https://github.com/orbital-js/orbital/compare/v1.0.0-alpha.13...v1.0.0-alpha.14) (2017-07-30)



<a name="1.0.0-alpha.13"></a>
# [1.0.0-alpha.13](https://github.com/orbital-js/orbital/compare/v1.0.0-alpha.12...v1.0.0-alpha.13) (2017-07-30)



<a name="1.0.0-alpha.12"></a>
# [1.0.0-alpha.12](https://github.com/orbital-js/orbital/compare/v1.0.0-alpha.11...v1.0.0-alpha.12) (2017-07-30)


### Bug Fixes

* **core:** remove extraneous export ([10f48e5](https://github.com/orbital-js/orbital/commit/10f48e5))



<a name="1.0.0-alpha.11"></a>
# [1.0.0-alpha.11](https://github.com/orbital-js/orbital/compare/v1.0.0-alpha.10...v1.0.0-alpha.11) (2017-07-29)



<a name="1.0.0-alpha.10"></a>
# [1.0.0-alpha.10](https://github.com/orbital-js/orbital/compare/v1.0.0-alpha.9...v1.0.0-alpha.10) (2017-07-29)


### Bug Fixes

* **di:** it worked all along ([aa067fa](https://github.com/orbital-js/orbital/commit/aa067fa))



<a name="1.0.0-alpha.9"></a>
# [1.0.0-alpha.9](https://github.com/orbital-js/orbital/compare/v1.0.0-alpha.8...v1.0.0-alpha.9) (2017-06-19)


### Bug Fixes

* **core:** export injectable decorator ([8e23008](https://github.com/orbital-js/orbital/commit/8e23008))



<a name="1.0.0-alpha.8"></a>
# [1.0.0-alpha.8](https://github.com/orbital-js/orbital/compare/v1.0.0-alpha.3...v1.0.0-alpha.8) (2017-06-19)


### Bug Fixes

* **route:** remove extraneous token handler ([94c43c3](https://github.com/orbital-js/orbital/commit/94c43c3))



<a name="1.0.0-alpha.3"></a>
# [1.0.0-alpha.3](https://github.com/orbital-js/orbital/compare/v1.0.0-alpha.2...v1.0.0-alpha.3) (2017-04-17)


### Bug Fixes

* **boat:** use forEach instead of for to asynchronously get each route ([933586f](https://github.com/orbital-js/orbital/commit/933586f))


### Features

* **bootstrap:** use helmet, compression, and bodyParser by default ([625e68e](https://github.com/orbital-js/orbital/commit/625e68e))



<a name="1.0.0-alpha.2"></a>
# [1.0.0-alpha.2](https://github.com/orbital-js/orbital/compare/v1.0.0-alpha.1...v1.0.0-alpha.2) (2017-04-16)


### Bug Fixes

* **route:** return target to make it work in external package ([25d359d](https://github.com/orbital-js/orbital/commit/25d359d))


### Performance Improvements

* **package:** remove extraneous console logs ([d43b263](https://github.com/orbital-js/orbital/commit/d43b263))



<a name="1.0.0-alpha.1"></a>
# [1.0.0-alpha.1](https://github.com/orbital-js/orbital/compare/v1.0.0-alpha.0...v1.0.0-alpha.1) (2017-04-16)


### Bug Fixes

* **package.json:** add typings to package ([c42fd3a](https://github.com/orbital-js/orbital/commit/c42fd3a))



<a name="1.0.0-alpha.0"></a>
# [1.0.0-alpha.0](https://github.com/orbital-js/orbital/compare/b48b3eb...v1.0.0-alpha.0) (2017-04-16)


### Bug Fixes

* **git:** ignore all the things ([ba1ae2b](https://github.com/orbital-js/orbital/commit/ba1ae2b))
* **readme:** correct spelling ([ce5a85e](https://github.com/orbital-js/orbital/commit/ce5a85e))
* **route:** take class as input for Route decorator ([6973eee](https://github.com/orbital-js/orbital/commit/6973eee))


### Features

* **bootstrap:** begin work on bootstrapping decorator ([1050304](https://github.com/orbital-js/orbital/commit/1050304))
* **controller:** begin work on controller decorator ([f0dd8f7](https://github.com/orbital-js/orbital/commit/f0dd8f7))
* **module:** preparing to modularize ([c4cc125](https://github.com/orbital-js/orbital/commit/c4cc125))
* **structure:** we're still thinking about how we wanna lay it out ([b48b3eb](https://github.com/orbital-js/orbital/commit/b48b3eb))



