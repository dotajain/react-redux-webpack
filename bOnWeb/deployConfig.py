#!/usr/bin/python
'''
DeployConfig contains the environmentVersionMap dictionary, mapping available environments to
available versions. The build.sh shell script uses getPossibleVersions() method to return the
versions listed in environmentVersionMap, then calls getPossibleEnvironments() to list the available
environments for the user given version. The deploy.py python script asserts the correct version /
environment combination from here before running.
'''

global environmentVersionMap
environmentVersionMap = {
    'FAT1': '1.1.0',
    'INT3': '1.1.0',
}

def getPossibleVersions():
	possibleVersions = []
	for version in environmentVersionMap.values():
		if version not in possibleVersions:
			possibleVersions.append(version)
	possibleVersions.sort()
	return possibleVersions

def getPossibleEnvironments(givenVersion):
	possibleEnvironments = []
	for environment, version in environmentVersionMap.items():
		if version == givenVersion:
			if environment not in possibleEnvironments:
				possibleEnvironments.append(environment)
	possibleEnvironments.sort()

	return possibleEnvironments

jenkinsURL = "http://10.207.209.30"
banksToBuild = ['CB', 'YB', 'DYB']

nexusTitle = "Upload Account Opening Static to Nexus"
jenkinsBuildToNexusJob = "/job/Upload%20Account%20Opening%20Static%20to%20Nexus"
nexusURL = jenkinsURL + jenkinsBuildToNexusJob

staticTitle = "INT Deploy Account Opening Static"
jenkinsBuildToStaticJob = "/job/INT%20Deploy%20Account%20Opening%20Static/"
staticURL = jenkinsURL + jenkinsBuildToStaticJob
