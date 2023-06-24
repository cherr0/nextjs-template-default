# nextjs template default

## Introduction

기본적으로 사용되는 라이브러리 구성과 환경설정이 갖춰진 Nextjs 기반 템플릿입니다.


## Used Library
### Core
* Typescript
* Next.js
* react-query
* recoil
* styled-components

### Util
* axios
* dayjs

### Config
* husky
  * lint-staged 

## Initial Setting
프로젝트 생성 시 github package 사용을 위해 .npmrc 파일 세팅이 필요합니다.

공개 패키지이지만 사용 시 접근 권한 토큰이 필요합니다.

```bash
//npm.pkg.github.com/:_authToken=[[package read token]]
@cherr0:registry=https://npm.pkg.github.com/
``` 

## Getting Started

상단의 `use this template` -> `Create a new repository` 를 눌러 신규 레포지토리 생성


