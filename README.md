# Mán Dashboard

[![Greenkeeper badge](https://badges.greenkeeper.io/Nebo15/man.web.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/Nebo15/man.web.svg?branch=master)](https://travis-ci.org/Nebo15/man.web)

[![Build history](https://buildstats.info/travisci/chart/Nebo15/man.web)](https://travis-ci.org/Nebo15/man.web)

![Man Logo](https://github.com/Nebo15/man.api/raw/master/docs/images/logo.png)

Mán stores templates (in `iex`, `mustache`) or `markdown` documents, renders it over HTTP API with dispatch in PDF, JSON or HTML formats.

> "Mán" translates from the Sindarin as "Spirit". Sindarin is one of the many languages spoken by the immortal Elves.

API: https://github.com/Nebo15/man.api

## Demo

![UI Demo](https://github.com/Nebo15/man.web/raw/master/docs/images/ui-animated.gif)

Try it here: http://man-web.herokuapp.com/

## Installation

### Heroku One-Click Deployment

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/nebo15/man.web)

### Docker

Dashboard can be deployed as a single container from [nebo15/man.web](https://hub.docker.com/r/nebo15/man.web/) Docker Hub.

## Configurations

Application supports these environment variables:

| Environment Variable  | Default Value           | Description |
| --------------------- | ----------------------- | ----------- |
| `PORT`                | `8080`                  | Node.js server port. |
| `API_ENDPOINT`            | `https://man-api.herokuapp.com` | Mán API endpoint. |
| `SITEMAP_HOSTNAME`    | `http://localhost:8080` | URL will be used in sitemap generated urls |
| `LANG_COOKIE_NAME`    | `lang`                  | Name of the cookie, where storing language variable |

## Docs

Dashboard works on top of [Man management API](http://docs.man2.apiary.io).

## Technologies

- React
- Redux
- Webpack
- Enzyme
- Karma
- Nightwatch

## Workflow

### Git flow

Every task should start a new branch. Branch should be named as task number what its corresponding.
After finish work on a task, you need to create PR.

### Testing

To contribute to the repository be ready to write some tests.

- Unit tests for business logic (we use Mocha)
- Integration tests for UI components (we use Enzyme)
- Acceptance tests for user stories (we use Nightwatch)

### PR

Every task finishes with PR. Eslint, Stylelint, and tests are blocking PRs. To simplify PR review, we deploy every PR's branch automatically on Heroku.

## License

See [LICENSE.md](LICENSE.md).
