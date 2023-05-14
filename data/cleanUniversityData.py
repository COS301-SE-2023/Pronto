import json

filePaths = {
	'mainSource': 'universitiesNamesAndDomainsData.json',
	'names':'universityNames.json',
	'domains':'universityDomains.json',
	'namesWithDomains': 'universityNamesWithDomains.json',
	'country': 'countriesList.json'
}

universityData:dict
univerityNames = []
universityDomains = []
universityNamesWithDomains = []
countries = []
with open(filePaths['mainSource'], 'r') as json_file:
	universityData = json.load(json_file)

# Extract Important data
for universityInfo in universityData:   
	del universityInfo['web_pages']
	del universityInfo['alpha_two_code']
	if 'state-province' in universityInfo:
		del universityInfo['state-province']
	univerityNames.append(universityInfo['name'])
	universityDomains.extend(universityInfo['domains'])
	universityNamesWithDomains.append(universityInfo)
	if universityInfo['country'] not in countries:
		countries.append(universityInfo['country'])
	
# Output as JSON
with open(filePaths['names'], "w") as outfile:
    outfile.write(json.dumps(univerityNames,ensure_ascii=False,indent=4))

with open(filePaths['domains'], "w") as outfile:
    outfile.write(json.dumps(universityDomains,ensure_ascii=False,indent=4))

with open(filePaths['namesWithDomains'], "w") as outfile:
    outfile.write(json.dumps(universityNamesWithDomains,ensure_ascii=False,indent=4))

with open(filePaths['country'], "w") as outfile:
    outfile.write(json.dumps(countries,ensure_ascii=False,indent=4))