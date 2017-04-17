#!/bin/bash
BOLD='\033[1m'
NC='\033[0m'
echo "${BOLD}Prerequisites:${NC}"
echo '  1. Ensure you have the web-app-builds repository at ../web-app-builds'
echo "  2. Make sure 'npm install' successfully installs the required node packages before running this script"
echo "  3. Python 2.6+ and python module 'requests' (install with command 'pip install requests')"
echo "  4. ${BOLD}Please make sure you are on the NAG VPN${NC}"
echo "  5. ${BOLD}Make sure your branch is up to date if deploying master${NC}"
echo
echo 'This script will compile and deploy the current branch of web-app to the environment you specify'
echo

#---------- Config ----------
export PYTHONDONTWRITEBYTECODE=1
possibleVersions=($(python -c 'import deployConfig; print deployConfig.getPossibleVersions()' | tr -d '[],'))

#---------- Inputs ----------
read -p 'Please enter jenkins username: ' USERNAME
read -s -p 'Please enter jenkins password: ' PASSWORD
echo

echo '\nPlease select version number:'
select VERSION in "${possibleVersions[@]}"; do test -n "$VERSION" && echo "Version number: $VERSION" && break; echo ">>> Invalid Selection"; done

possibleEnvironments=($(python -c "import deployConfig; print deployConfig.getPossibleEnvironments($VERSION)" | tr -d '[],'))

echo '\nPlease select environment:'
select ENVIRONMENT in "${possibleEnvironments[@]}"; do test -n "$ENVIRONMENT" && echo "Environment selected: $ENVIRONMENT" && break; echo ">>> Invalid Selection"; done
echo

read -p 'Generate release build? [yN] ' RELEASE
echo

CURRENT_BRANCH='master'

read -p "Config branch (${CURRENT_BRANCH}): " BRANCH
echo

if [ -z "${BRANCH}" ]; then
	BRANCH=$CURRENT_BRANCH
fi

export USERNAME
export PASSWORD
export VERSION
export ENVIRONMENT
export BRANCH

#---------- Variables ----------
export webAppBranch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
commitMessage="$VERSION build. Web-app branch: $webAppBranch Web-app-config branch: $BRANCH"

echo
echo "${BOLD}Resetting & updating web-app-builds repo${NC}"
cd ../web-app-builds
git fetch
git reset --hard
git clean -f
git checkout master
git pull origin master
cd ../web-app

echo "${BOLD}Compiling web-app...${NC}"
if [ "${RELEASE}" == y ]; then
	(gulp prod --release); result=$?
else
	(gulp prod --throw); result=$?
fi

if [ "$result" = 0 ]
then
	echo "${BOLD}Removing unused compiled files...${NC}"
	cd compiled
	rm -rf static
	rm -rf rev-manifest-*
	cd ..


	echo "${BOLD}Removing previous web-app-builds content${NC}"
	rm -rf ../web-app-builds/*
	echo "${BOLD}Copying compiled web-app to web-app-builds local repo${NC}"
	cp -r compiled/* ../web-app-builds


	echo "${BOLD}Pushing updating web-app-builds repo to remote${NC}"
	cd ../web-app-builds
	git add .
	git commit -a -m "$commitMessage"
	git push

	echo "${BOLD}Running deploy script${NC}"
	cd ../web-app
	python deploy.py
else
    echo "Gulp has returned nonzero exit code. Check for errors above."
fi
