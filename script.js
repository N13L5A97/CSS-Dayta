function getYear(data) {
    years = []
    for(var k in data) {
        years.push(k)
    }
    return years
}

function generateElement(data, txt) {
    const context = document.createElement('p')
    context.appendChild(document.createTextNode(txt.concat(data)))
    document.querySelector('body').appendChild(context)
}

function generateDateElement(data, txt) {
    for(var k in data) {
        const date = document.createElement('time')
        date.appendChild(document.createTextNode(data[k]))
        document.querySelector('.ticket div div p').appendChild(date)
    }
    
    //for(var k in data) {
    //    string = data[0].substring(5)
    //    if (k > 0) {
    //        string = string.concat(' & ' + data[1].substring(5))
    //    }   
    //}
    //context.appendChild(document.createTextNode(txt.concat(string)))
    
}

function generateMostRelevantSpeaker(data, txt) {

    array = []
    for(var k in data) {
            if (data[k].talk.video.views && data[k].talk.video != 'false') {
            viewCount = data[k].talk.video.views
            speakerName = data[k].name
            description = data[k].talk.description
            slides = data[k].talk.slides
            title = data[k].talk.title
            videoLink = data[k].talk.video['youtube-link']
            array2 = {views: viewCount, name: speakerName, title: title, description: description, slides: slides, link: videoLink}
            array.push(array2)
        }
    }
    
    array.sort((a, b) => b.views - a.views)
    const list = document.createElement('ul')
    test = array[0]
    for(var x in test) {
        const listItem = document.createElement('li')
        listItem.appendChild(document.createTextNode(test[x]))
        list.appendChild(listItem)
    }
    document.querySelector('body').appendChild(list)
}

function generateMCElement(data, txt) {
    const context = document.createElement('p')
    for(var k in data) {
        string = String(data[0].name)
        if (k > 0) {
            string = string.concat(' & ' + data[1].name)
        }   
    }
    context.appendChild(document.createTextNode(txt.concat(string)))
    document.querySelector('body').appendChild(context)  
}

function generateYearElement(year) {
    const context = document.createElement('h2')
    context.appendChild(document.createTextNode(year))
    document.querySelector('body').appendChild(context)
}

function generateColorElement(year, data, k) {
    var sheet = window.document.styleSheets[0];
    colorName = '--'.concat(year)
    k = parseInt(k) + 1
    selector = 'h5:nth-of-type('.concat(k + ')')
    rule = selector.concat(' { color: var(' + colorName + ');')
    document.documentElement.style.setProperty(colorName, data.color.hex)
    sheet.insertRule(rule, sheet.cssRules.length);
    document.documentElement.style.setProperty('p:nth-of-type(1)', colorName)
}

function getArrayOfYear(data) {
    array = []
    for(var k in data) {
        array.push(data[k])
    }
    return array
}

// fetch css day-ta
const fetchData = async () => {
    try{
        const res = await fetch("https://cssday.nl/data.json");
        const data = await res.json();
        console.log(data);
        console.log(getYear(data))
        years = getYear(data)
        arrays = getArrayOfYear(data)
        for(var k in years) {
            generateYearElement(years[k])
            generateColorElement(years[k], arrays[k], k)
            
            generateElement(arrays[k].price, 'Prijs: ')
            generateElement(arrays[k].venue, 'Locatie: ')
            generateElement(arrays[k].attendees.count, 'Aantal bezoekers: ')
            generateMCElement(arrays[k].mc, 'MC: ')
            generateMostRelevantSpeaker(arrays[k].speakers)
        
        }   
        for (var i = years.length - 1; i >= 0; i--) {
            console.log(years[i]);
            generateDateElement(arrays[i].date, years[i]);
        }
    }
    catch(error){
        console.log(error);
    }
}

fetchData();