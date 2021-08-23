# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]
### Added
- Add new version 1.0.1 in Swagger
- Add Sentry and SentryInterceptor
- Add CatsModule
- Add VerifyToken
- Add findByID, findByName and findCatAndCount in catsRepository

### Removed
- Remove node-fetch and module.hot in Main

## Release [v1.0.1] - 2021-07-17

### Added 
- Add deleteRole
- Add validation decorator permissions

### Fixed
- Add validation params pipe in endpoint update role

## Release [v1.0.0] - 2021-06-21

### Added
- Add ConfigService of TypeOrm for suing database PostgreSQL;
- Add Filter, Interceptors and Pipes;
- Add CoreModule for instance LogggingInterceptor;
- Add UsersModule with repositoy, services and controller;
- Add User entity;
- Add path shared with pagination;
- Add Jwt with AuthModule;
- Add Health to see if the database is up;
- Add RolesModule with epositoy, services and controller;
- Add Docker with Redis;
- Add @nestjs/bull;
- Add process queue users;
- Add UserConsumer;
- Add Swagger;
- Add LoadAllRoles, LoadRoleById and UpdateRole
### Changed

### Deprecated

### Fixed

### Removed

### Security