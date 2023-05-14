import json

filePaths = {
	'mainSource': 'universitiesNamesAndDomainsData.json',
	'names':'universityNames.json',
	'domains':'universityDomains.json'
	''
}

universityData:dict
univerityNames = []
universityDomains = []
with open(filePaths['mainSource'], 'r') as json_file:
	universityData = json.load(json_file)

for universityInfo in universityData:
	univerityNames.append(universityInfo['name'])
	universityDomains.extend(universityInfo['domains'])
	
# Output as JSON
with open(filePaths['names'], "w") as outfile:
    outfile.write(json.dumps(univerityNames,ensure_ascii=False,indent=4))

with open(filePaths['domains'], "w") as outfile:
    outfile.write(json.dumps(universityDomains,ensure_ascii=False,indent=4))