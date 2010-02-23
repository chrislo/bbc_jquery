$(document).ready(
    function(){
        test("Parses service type from the /programmes services feed", 
             function() {
                 var serviceData = getServiceData();
                 equals( 'bbcone', serviceData[0].key );
             });
        
        test("Returns upcoming information for a key and outlet",
             function() {
                 var key = 'bbcone';
                 var outlet = 'london';
                 var upcomingData = getUpcomingData(key, outlet);
                 equals( 'bbcone', upcomingData.schedule.service.key);
             }
            );
        test("Defaults to best choice outlets when not specified",
             function() {
                 var key = 'bbcone';
                 var upcomingData = getUpcomingData(key);
                 equals( 'london', upcomingData.schedule.service.outlet.key);
             }
            );
        test("Returns now information for a key and outlet",
             function() {
                 var key = 'bbcone';
                 var outlet = 'london';
                 var nowData = getNowData(key, outlet);
                 ok( nowData.hasOwnProperty('broadcast') );
             }
            );
        test("Returns next information for a key and outlet",
             function() {
                 var key = 'bbcone';
                 var outlet = 'london';
                 var nowData = getNextData(key, outlet);
                 ok( nowData.hasOwnProperty('broadcasts') );
             }
            );
        test("Get an iPlayer schedule image for a given key",
             function() {
                 var key = 'bbcone';
                 equals('http://www.bbc.co.uk/iplayer/img/station_logos/bbc_one.png',getStationLogoPath(key));
             }
            );
        test("Mapping of /programmes keys to iPlayer keys",
             function() {
                 equals('cbeebies', convertProgrammesKeyToiPlayerKey('cbeebies'));
                 equals('bbc_1xtra', convertProgrammesKeyToiPlayerKey('1xtra'));
                 equals('bbc_6music', convertProgrammesKeyToiPlayerKey('6music'));
             }
            );
    });
