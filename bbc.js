function getServiceData() {
    var feed_url = 'http://www.bbc.co.uk/programmes/services.json';
    return makeAjaxCall(feed_url).services;
}

function getUpcomingData(key, outlet) {
    if (!outlet) {
        var outlet = '';
        var best_choice = {
            bbcone: "london",
            bbctwo: "england",
            radio1: "england",
            radio4: "fm",
            radioscotland: "fm",
            radiowales: "fm"
        };
        if (best_choice[key]) {
            outlet = best_choice[key] + "/";
        }        
        var upcoming_url = 'http://www.bbc.co.uk/'+key+'/programmes/schedules/'+outlet+'upcoming.json';
    } else {
        var upcoming_url = 'http://www.bbc.co.uk/'+key+'/programmes/schedules/'+outlet+'/upcoming.json';
    }
    return makeAjaxCall(upcoming_url);
}

function getNowData(key,outlet){
    var nowData = getUpcomingData(key, outlet);
    return nowData.schedule.now;
}

function getNextData(key,outlet){
    var nowData = getUpcomingData(key, outlet);
    return nowData.schedule.next;
}

function makeAjaxCall(feed_url) {
    var jsonData = null;

    $.ajax({
               url: feed_url,
               async: false,
               dataType: 'json',
               success: function (json) {
                   jsonData = json;
               }
           });
    return jsonData;
}

function getStationLogoPath(key) {
    var iplayer_key = convertProgrammesKeyToiPlayerKey(key);
    return 'http://www.bbc.co.uk/iplayer/img/station_logos/'+iplayer_key+'.png';    
}

function convertProgrammesKeyToiPlayerKey(programmes_key) {
    // we need this because the of the crazy use of
    // different url_key between iplayer and /programmes.
    var stations = {
        bbcone: "bbc_one",
        bbctwo: "bbc_two",
        bbcthree: "bbc_three",
        bbcfour: "bbc_four",
        bbchd: "bbc_hd",
        cbbc: "cbbc",
        cbeebies: "cbeebies",
        bbcnews: "bbc_news24",
        parliament: "bbc_parliament",
        bbcalba: "bbc_alba",
        radio1: "bbc_radio_one",
        '1xtra': "bbc_1xtra",
        radio2: "bbc_radio_two",
        radio3: "bbc_radio_three",
        radio4: "bbc_radio_four",
        '5live': "bbc_radio_five_live",
        '5livesportsextra': "bbc_radio_five_live_sports_extra",
        '6music': "bbc_6music",
        radio7: "bbc_7",
        asiannetwork: "bbc_asian_network",
        worldservice: "bbc_world_service",
        radioscotland: "bbc_radio_scotland",
        radionangaidheal: "bbc_radio_nan_gaidheal",
        radioulster: "bbc_radio_ulster",
        radiofoyle: "bbc_radio_foyle",
        radiowales: "bbc_radio_wales",
        radiocymru: "bbc_radio_cymru",
        berkshire: "bbc_radio_berkshire",
        bristol: "bbc_radio_bristol",
        cambridgeshire: "bbc_radio_cambridge",
        cornwall: "bbc_radio_cornwall",
        coventry: "bbc_radio_coventry_warwickshire",
        cumbria: "bbc_radio_cumbria",
        derby: "bbc_radio_derby",
        devon: "bbc_radio_devon",
        essex: "bbc_radio_essex",
        gloucestershire: "bbc_radio_gloucestershire",
        guernsey: "bbc_radio_guernsey",
        herefordandworcester: "bbc_radio_hereford_worcester",
        humberside: "bbc_radio_humberside",
        jersey: "bbc_radio_jersey",
        kent: "bbc_radio_kent",
        lancashire: "bbc_radio_lancashire",
        leeds: "bbc_radio_leeds",
        leicester: "bbc_radio_leicester",
        lincolnshire: "bbc_radio_lincolnshire",
        london: "bbc_london",
        manchester: "bbc_radio_manchester",
        merseyside: "bbc_radio_merseyside",
        newcastle: "bbc_radio_newcastle",
        norfolk: "bbc_radio_norfolk",
        northampton: "bbc_radio_northampton",
        nottingham: "bbc_radio_nottingham",
        oxford: "bbc_radio_oxford",
        sheffield: "bbc_radio_sheffield",
        shropshire: "bbc_radio_shropshire",
        solent: "bbc_radio_solent",
        somerset: "bbc_radio_somerset_sound",
        stoke: "bbc_radio_stoke",
        suffolk: "bbc_radio_suffolk",
        surrey: "bbc_radio_surrey",
        sussex: "bbc_radio_sussex",
        tees: "bbc_tees",
        threecounties: "bbc_three_counties_radio",
        wiltshire: "bbc_radio_wiltshire",
        wm: "bbc_wm",
        york: "bbc_radio_york"
    };
    return stations[programmes_key]; 
}