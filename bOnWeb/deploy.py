#!/usr/bin/python
'''
This script builds the contents of the web-app-builds repo and web-app-config repo
to nexus and deploys from nexus to a given environment for CB, YB and DYB.
The script is designed to be run from within the build.sh shell script, but
can be run directly if the following environment variables are set: USERNAME (jenkins
username), PASSWORD (jenkins password), VERSION (version to be built), ENVIRONMENT
(environment to deploy codebase to).

Requirements:
  - Python 2.6+
  - Requests (can be installed using 'pip install requests')
'''

import os
import sys
import time
import collections
import subprocess
import requests
import deployConfig

HEADER = '\033[95m'
BOLD = '\033[1m'
ENDC = '\033[0m'

# ---------- Inputs ----------
global usern, passw, ver, env, branch
usern = str(os.getenv('USERNAME')).replace("'", "")
passw = str(os.getenv('PASSWORD')).replace("'", "")
ver = str(os.getenv('VERSION')).replace("'", "")
env = str(os.getenv('ENVIRONMENT')).replace("'", "")
branch = str(os.getenv('BRANCH')).replace("'", "")

# ---------- Validation ----------
assert ver == deployConfig.environmentVersionMap[env]

# ---------- Methods ----------
def refreshVariables(url):
	r = requests.get(url+"/api/json", auth=(usern, passw))
	r.raise_for_status()

	point = collections.namedtuple('point', ['inQueue', 'lastBuild', 'lastCompletedBuild', 'lastSuccessfulBuild'])
	return point(
		inQueue=r.json()["inQueue"],
		lastBuild=r.json()["lastBuild"]['number'],
		lastCompletedBuild=r.json()["lastCompletedBuild"]['number'],
		lastSuccessfulBuild=r.json()["lastSuccessfulBuild"]['number']
	)


def printNewConsoleOutputLines(url):
	global oldOutputNumberOfLines
	output = requests.get(url+"/lastBuild/consoleText", auth=(usern, passw)).text.split('\n')
	newOutputNumberOfLines = len(output)
	for lineNumber in xrange(oldOutputNumberOfLines, newOutputNumberOfLines):
		print output[lineNumber]
	oldOutputNumberOfLines = newOutputNumberOfLines


def waitWhileNotEqual(attribute, value, url, printConsoleOutput=False):
	var = getattr(refreshVariables(url), attribute)
	i = 0
	global oldOutputNumberOfLines
	oldOutputNumberOfLines = 0

	while var != value:
		if printConsoleOutput:
			printNewConsoleOutputLines(url)
		else:
			sys.stdout.write("\r    Elapsed time: " + str(i) + "s")
			sys.stdout.flush()
		time.sleep(1)
		var = getattr(refreshVariables(url), attribute)
		i += 1

	if printConsoleOutput:
		printNewConsoleOutputLines(url)
	print ENDC + ""


def buildJobAndWait(jobTitle, jobURL, jobParameters=None):
	print BOLD + "Building job: %s" % jobTitle + ENDC
	if jobParameters is None:
		buildURL = jobURL+"/build"
	else:
		print "    Building with parameters: %s" % jobParameters
		buildURL = jobURL+"/buildWithParameters"
	buildJob = requests.post(buildURL, auth=(usern, passw), params=jobParameters)
	buildJob.raise_for_status()

	print BOLD + "Job in jenkins queue. Waiting for build to start..." + ENDC
	waitWhileNotEqual('inQueue', False, jobURL)
	print BOLD + "%s job started" % jobTitle + ENDC

	print BOLD + "Job in progress. Console output:" + ENDC
	lastBuild = getattr(refreshVariables(jobURL), 'lastBuild')
	waitWhileNotEqual('lastCompletedBuild', lastBuild, jobURL, printConsoleOutput=True)

	global lastSuccessfulBuild
	lastSuccessfulBuild = getattr(refreshVariables(jobURL), 'lastSuccessfulBuild')
	print BOLD + "Asserting '%s' has built successfully" % jobTitle + ENDC
	assert lastBuild == lastSuccessfulBuild


def tagRepo(tagID):
	tagCmd = 'git tag -a %s -m "%s"' % (tagID, tagID)
	subprocess.Popen(tagCmd, stdout=subprocess.PIPE, shell=True)
	print BOLD + "Tagged web-app repo with '%s'" % tagID + ENDC


# To-do: Error handling for when build job(s) fails
# To-do: Create summary list throughout and print at end. Good for showing what's passed and what's failed.


# ---------- Script start ----------
print HEADER + BOLD + "Building web-app-builds and web-app-config to nexus" + ENDC
nexusJobParameters = {'VERSION': ver, 'delay': '0sec'}
buildJobAndWait(deployConfig.nexusTitle, deployConfig.nexusURL, nexusJobParameters)

nexusVersion = ver + "-b" + str(lastSuccessfulBuild)
print BOLD + "Build version: " + str(nexusVersion) + ENDC

tagID = "tags/"+nexusVersion
tagRepo(tagID)

if ver == '0.6.0':
	deployConfig.banksToBuild.remove('DYB')

staticJobParameters = {'NEXUS_VERSION': nexusVersion, 'ENVIRONMENT': env, 'SERVICE_VERSION': ver, 'BANK': '[BANK]', 'delay': '0sec', 'BRANCH': branch}
for bank in deployConfig.banksToBuild:
	print HEADER + BOLD + "Deploying nexus to static for %s" % bank + ENDC
	staticJobParameters['BANK'] = bank
	jobTitle = "%s (%s)" % (deployConfig.staticTitle, bank)
	buildJobAndWait(jobTitle, deployConfig.staticURL, staticJobParameters)

print HEADER + BOLD + "Deploy complete" + ENDC
print ""
try:
	webAppBranch = str(os.getenv('webAppBranch'))
	print HEADER + BOLD + "Successfully deployed web-app %s branch to Nexus. Package version: %s" % (webAppBranch, nexusVersion) + ENDC
except:
	pass
print HEADER + BOLD + "Successfully deployed %s to %s for banks %s" % (nexusVersion, env, deployConfig.banksToBuild) + ENDC
