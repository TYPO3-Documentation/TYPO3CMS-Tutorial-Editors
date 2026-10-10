#!/usr/bin/env bash

#
# Runner of the Editors Tutorial, based on docker/podman: installs the TYPO3
# Core that the screenshots are taken from, and takes them.
#

cleanUp() {
  ATTACHED_CONTAINERS=$(${CONTAINER_BIN} ps --filter network=${NETWORK} --format='{{.Names}}')
  for ATTACHED_CONTAINER in ${ATTACHED_CONTAINERS}; do
    ${CONTAINER_BIN} rm -f ${ATTACHED_CONTAINER} >/dev/null
  done
  ${CONTAINER_BIN} network rm ${NETWORK} >/dev/null
}

loadHelp() {
  # Load help text into $HELP
  read -r -d '' HELP <<EOF
Runner of the Editors Tutorial.

Usage: $0 [options] [name ...]

Options:
  -s <...>
    Specifies which suite to run
      - composerUpdate: "composer update", handy if host has no PHP
      - screenshots: screenshots from a TYPO3 instance, optionally only
       the ones named as arguments

  -b <docker|podman>
    Container environment:
      - docker
      - podman

    If not specified, podman will be used if available. Otherwise, docker is used.

  -h
    Show this help.

Examples:
  # Take all screenshots
  ./Build/Scripts/runTests.sh -s screenshots

  # Take only one screenshot
  ./Build/Scripts/runTests.sh -s screenshots ContentElements/PageModule
EOF
}

# Test if docker exists, else exit out with error
if ! type "docker" >/dev/null 2>&1 && ! type "podman" >/dev/null 2>&1; then
  echo "This script relies on docker or podman. Please install" >&2
  exit 1
fi

# Option defaults
TEST_SUITE="screenshots"
PHP_VERSION="8.5"
CI_PARAMS="${CI_PARAMS:-}"
CONTAINER_BIN=""

# Option parsing updates above default vars
# Reset in case getopts has been used previously in the shell
OPTIND=1
# Array for invalid options
INVALID_OPTIONS=()
# Simple option parsing based on getopts (! not getopt)
while getopts "b:s:h" OPT; do
  case ${OPT} in
    s)
      TEST_SUITE=${OPTARG}
      ;;
    b)
      if ! [[ ${OPTARG} =~ ^(docker|podman)$ ]]; then
        INVALID_OPTIONS+=("${OPTARG}")
      fi
      CONTAINER_BIN=${OPTARG}
      ;;
    h)
      loadHelp
      echo "${HELP}"
      exit 0
      ;;
    \?)
      INVALID_OPTIONS+=("${OPTARG}")
      ;;
    :)
      INVALID_OPTIONS+=("${OPTARG}")
      ;;
  esac
done

# Exit on invalid options
if [ ${#INVALID_OPTIONS[@]} -ne 0 ]; then
  echo "Invalid option(s):" >&2
  for I in "${INVALID_OPTIONS[@]}"; do
    echo "-"${I} >&2
  done
  echo >&2
  echo "call \"Build/Scripts/runTests.sh -h\" to display help and valid options"
  exit 1
fi

HOST_UID=$(id -u)
USERSET=""
if [ $(uname) != "Darwin" ]; then
  USERSET="--user $HOST_UID"
fi

# Go to the directory this script is located, so everything else is relative
# to this dir, no matter from where this script is called, then go up two dirs.
THIS_SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null && pwd)"
cd "$THIS_SCRIPT_DIR" || exit 1
cd ../../ || exit 1
ROOT_DIR="${PWD}"

# Create .cache dir: composer need this.
mkdir -p .Build/.cache

TYPO3_IMAGE_PREFIX="ghcr.io/typo3/"
CONTAINER_INTERACTIVE="-it --init"
# ENV var "CI" is set by GitHub Actions. It has no terminal to attach to.
if [ "${CI}" == "true" ]; then
  CONTAINER_INTERACTIVE=""
fi

# determine default container binary to use: 1. podman 2. docker
if [[ -z "${CONTAINER_BIN}" ]]; then
  if type "podman" >/dev/null 2>&1; then
    CONTAINER_BIN="podman"
  elif type "docker" >/dev/null 2>&1; then
    CONTAINER_BIN="docker"
  fi
fi

IMAGE_PHP="${TYPO3_IMAGE_PREFIX}core-testing-$(echo "php${PHP_VERSION}" | sed -e 's/\.//'):latest"
IMAGE_PLAYWRIGHT="mcr.microsoft.com/playwright:v1.63.0-noble"

# Set $1 to first mass argument, this is the optional list of screenshots
shift $((OPTIND - 1))

SUFFIX=$(echo $RANDOM)
NETWORK="t3docs-editors-${SUFFIX}"
${CONTAINER_BIN} network create ${NETWORK} >/dev/null

if [ ${CONTAINER_BIN} = "docker" ]; then
  CONTAINER_COMMON_PARAMS="${CONTAINER_INTERACTIVE} --rm --network ${NETWORK} ${USERSET} -v ${ROOT_DIR}:${ROOT_DIR} -w ${ROOT_DIR}"
else
  CONTAINER_COMMON_PARAMS="${CONTAINER_INTERACTIVE} ${CI_PARAMS} --rm --network ${NETWORK} -v ${ROOT_DIR}:${ROOT_DIR} -w ${ROOT_DIR}"
fi

# Suite execution
case ${TEST_SUITE} in
  composerUpdate)
    rm -rf .Build/bin/ .Build/vendor .Build/public ./composer.lock
    COMMAND=(composer update --no-ansi --no-interaction --no-progress)
    ${CONTAINER_BIN} run ${CONTAINER_COMMON_PARAMS} --name composer-install-${SUFFIX} -e COMPOSER_CACHE_DIR=.Build/.cache/composer ${IMAGE_PHP} "${COMMAND[@]}"
    SUITE_EXIT_CODE=$?
    ;;
  screenshots)
    export PHP_RUN="${CONTAINER_BIN} run ${CONTAINER_COMMON_PARAMS} ${IMAGE_PHP}"
    export WEB_START="${CONTAINER_BIN} run -d ${CONTAINER_COMMON_PARAMS} --name screenshots-web-${SUFFIX} ${IMAGE_PHP} php -S 0.0.0.0:8080 -t .Build/public Build/Screenshots/router.php"
    export WEB_STOP="${CONTAINER_BIN} rm -f screenshots-web-${SUFFIX}"
    # Like CONTAINER_COMMON_PARAMS, only docker needs the user to be set
    BROWSER_USER=""
    if [ ${CONTAINER_BIN} = "docker" ]; then
      BROWSER_USER="${USERSET}"
    fi
    export BROWSER_RUN="${CONTAINER_BIN} run --rm --network container:screenshots-web-${SUFFIX} ${BROWSER_USER} -e HOME=/tmp -e DUMP -v ${ROOT_DIR}:${ROOT_DIR} -w ${ROOT_DIR}/Build/Screenshots ${IMAGE_PLAYWRIGHT}"
    Build/Screenshots/run.sh "$@"
    SUITE_EXIT_CODE=$?
    ;;
  *)
    loadHelp
    echo "Invalid -s option argument ${TEST_SUITE}" >&2
    echo >&2
    echo "${HELP}" >&2
    exit 1
    ;;
esac

cleanUp

exit $SUITE_EXIT_CODE
