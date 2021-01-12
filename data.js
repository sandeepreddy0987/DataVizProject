$.getJSON("./casesdata.json", function(result){
 getdata(result.data)
});
 // color reference from color brewer
 mapBrew = ['rgb(255,255,204)','rgb(217,240,163)','rgb(173,221,142)','rgb(120,198,121)','rgb(65,171,93)'];
 // population density range used for choropleth and legend
 mapRange = [ 19000,12000,5000,800,500 ]; 

  
var mainObj = {}

function getdata(maindata){
  var coord = {
    'Quebec': '[-78.019173,62.59193]',
    'Prairies': '[-110.394402,78.752213]',
   'ON': '[-79.547096,51.460129]',
    'Atlantic': '[-64.482773,47.91777]',
    'BC': '[-132.6633,53.67944]'
  }
  
  var transmission = {
    1: 'Domestic acquisition',
    2: 'International travel',
    9: 'Not stated'
  }
  
  var death = { YES: 'Yes', NO: 'No', 9: 'Not stated' }
  
  var ageGroup = {
    1: '0-19yrs',
    2: '20-29yrs',
    3: '30-39yrs',
    4: '40-49yrs',
    5: '50-59yrs',
    6: '60-69yrs',
    7: '70-79yrs',
    8: '80+yrs',
    99: 'Not stated'
  }
  var EpisodeWeek ={

  }
  
  var hospitalizationStatus = {
    1: 'Hospitalized and in Intensive care unit',
    2: 'Hospitalized, but not in intensive care unit',
    3: 'Not hospitalized',
    9: 'Not Stated'
  }
  
  var occupation = {
    1: 'Health care worker',
    2: 'School or daycare worker/attendee',
    3: 'Long term care resident',
    4: 'Other',
    9: 'Not stated'
  }
  
  var recovered = { 1: 'Yes', 2: 'No', 9: 'Not Stated' }

  maindata.map(data => {
    if (mainObj[data.Region]) {
      mainObj[data.Region]['cases'] += 1
      mainObj[data.Region]['transmission'][transmission[data.Transmission]] += 1
      mainObj[data.Region]['gender'][data.Gender] += 1
      mainObj[data.Region]['death'][death[data.Death]] += 1
      mainObj[data.Region]['ageGroup'][ageGroup[data['Age group']]] += 1
      mainObj[data.Region]['hospitalizationStatus'][
        hospitalizationStatus[data['Hospital status']]
      ] += 1
      mainObj[data.Region]['occupation'][occupation[data.Occupation]] += 1
      mainObj[data.Region]['recovered'][recovered[data.Recovered]] += 1
      if(mainObj[data.Region]['weeks'][data['Episode week']]){
            mainObj[data.Region]['weeks'][data['Episode week']]['totalCases'] += 1
      if(data.Recovered === '1'){
        mainObj[data.Region]['weeks'][data['Episode week']]['recovered'] += 1
      }
     
      if(data.Death === 'YES'){
        mainObj[data.Region]['weeks'][data['Episode week']]['deaths'] += 1
      }
      } else {
        mainObj[data.Region]['weeks'][data['Episode week']] = {
             'totalCases': 1,
             'recovered': 0,
             'deaths': 0
           }
           if(data.Recovered === '1'){
        mainObj[data.Region]['weeks'][data['Episode week']]['recovered'] = 1
      }
     
      if(data.Death === 'YES'){
        mainObj[data.Region]['weeks'][data['Episode week']]['deaths'] = 1
      }
      }
   
 
    } else {
      mainObj[data.Region] = {}
      mainObj[data.Region]['name'] = data.Region
      mainObj[data.Region]['coord'] = coord[data.Region]
      mainObj[data.Region]['cases'] = 1
      mainObj[data.Region]['gender'] = {
        Male: 0,
        FeMale: 0
      }
      mainObj[data.Region]['gender'][data.Gender] = 1
      mainObj[data.Region]['transmission'] = {
        'Domestic acquisition': 0,
        'International travel': 0,
        'Not stated': 0
      }
      mainObj[data.Region]['transmission'][transmission[data.Transmission]] = 1
 
      mainObj[data.Region]['death'] = {
        Yes: 0,
        No: 0,
        'Not stated': 0
      }
      mainObj[data.Region]['death'][death[data.Death]] = 1
      mainObj[data.Region]['ageGroup'] = {
        '0-19yrs': 0,
        '20-29yrs': 0,
        '30-39yrs': 0,
        '40-49yrs': 0,
        '50-59yrs': 0,
        '60-69yrs': 0,
        '70-79yrs': 0,
        '80+yrs': 0,
        'Not stated': 0
      }
      mainObj[data.Region]['ageGroup'][ageGroup[data['Age group']]] = 1
 
      mainObj[data.Region]['hospitalizationStatus'] = {
        'Hospitalized and in Intensive care unit': 0,
        'Hospitalized, but not in intensive care unit': 0,
        'Not hospitalized': 0,
        'Not Stated': 0
      }
      mainObj[data.Region]['hospitalizationStatus'][
        hospitalizationStatus[data['Hospital status']]
      ] = 1
      mainObj[data.Region]['occupation'] = {
        'Health care worker': 0,
        'School or daycare worker/attendee': 0,
        'Long term care resident': 0,
        Other: 0,
        'Not stated': 0
      }
      mainObj[data.Region]['weeks']= {}
      mainObj[data.Region]['weeks'][data['Episode week']] = 1
      mainObj[data.Region]['weeks'][data['Episode week']] = {
             'totalCases': 1,
             'recovered': 0,
             'deaths': 0
           }
      if(data.Recovered === '1'){
        mainObj[data.Region]['weeks'][data['Episode week']]['recovered'] = 1
      }
     
      if(data.Death === 'YES'){
        mainObj[data.Region]['weeks'][data['Episode week']]['deaths'] = 1
      }
      mainObj[data.Region]['occupation'][occupation[data.Occupation]] = 1
      mainObj[data.Region]['recovered'] = {
        Yes: 0,
        No: 0,
        'Not Stated': 0
      }
 
      mainObj[data.Region]['recovered'][recovered[data.Recovered]] = 1
    }
  })

  console.log(mainObj)


}


    

  