function getYear(data) {
  years = [];
  for (var k in data) {
    years.push(k);
  }
  return years;
}

function generateElement(data, txt) {
  const context = document.createElement('p');
  context.appendChild(document.createTextNode(txt.concat(data)));
  document.querySelector('body').appendChild(context);
}

function generateDateElement(data, counter) {
  if (data.length === 1) {
    test = document.querySelector(
      'section:nth-of-type('.concat(counter + ') .ticket div div p')
    );
    test.setAttribute('class', 'singleDate');
  }
  for (var k in data) {
    const dateData = document.createElement('time');
    dateData.appendChild(
      document.createTextNode(data[k].split('-').reverse().join('-'))
    );
    query = 'section:nth-of-type('.concat(counter + ') .ticket div div p');
    document.querySelector(query).appendChild(dateData);
  }
}

function generateLocationElement(data, counter) {
  const location = document.createElement('p');
  location.appendChild(document.createTextNode(data));
  query = 'section:nth-of-type('.concat(
    counter + ') .ticket div div div:nth-of-type(1)'
  );
  document.querySelector(query).appendChild(location);
}

function generateLinkElement(data, counter) {
  const link = document.createElement('a');
  link.setAttribute('href', data);
  link.appendChild(document.createTextNode('Website'));
  query = 'section:nth-of-type('.concat(
    counter + ') .ticket div div div:nth-of-type(2)'
  );
  document.querySelector(query).appendChild(link);
}

function generateMCAltName(data, counter) {
    const mcAltName = document.querySelectorAll('section:nth-of-type('.concat(counter + ') div:nth-of-type(1) img'))
    for(var k in mcAltName) {
        if (mcAltName.hasOwnProperty(k)) {
            mcAltName[k].setAttribute('alt', data[k].name)
        }
    }
    
    for(var x in data) {
        const mcName = document.createElement('p');
        mcName.appendChild(document.createTextNode(data[x].name))
        query = 'section:nth-of-type('.concat(
            counter + ') div:nth-of-type(1)'
          );
        document.querySelector(query).appendChild(mcName)
    }
}

function generatePriceElement(data, counter) {
    const price = document.createElement('span');
    price.appendChild(document.createTextNode('TICKET - €'.concat(data)));
    query = 'section:nth-of-type('.concat(counter + ') .ticket div h2');
    document.querySelector(query).appendChild(price);
}

function generateMostRelevantSpeaker(data, txt) {
  array = [];
  for (var k in data) {
    if (data[k].talk.video.views && data[k].talk.video != 'false') {
      viewCount = data[k].talk.video.views;
      speakerName = data[k].name;
      description = data[k].talk.description;
      slides = data[k].talk.slides;
      title = data[k].talk.title;
      videoLink = data[k].talk.video['youtube-link'];
      array2 = {
        views: viewCount,
        name: speakerName,
        title: title,
        description: description,
        slides: slides,
        link: videoLink,
      };
      array.push(array2);
    }
  }

  array.sort((a, b) => b.views - a.views);
  const list = document.createElement('ul');
  test = array[0];
  for (var x in test) {
    const listItem = document.createElement('li');
    listItem.appendChild(document.createTextNode(test[x]));
    list.appendChild(listItem);
  }
  document.querySelector('body').appendChild(list);
}

function generateMCElement(data, txt) {
  const context = document.createElement('p');
  for (var k in data) {
    string = String(data[0].name);
    if (k > 0) {
      string = string.concat(' & ' + data[1].name);
    }
  }
  context.appendChild(document.createTextNode(txt.concat(string)));
  document.querySelector('body').appendChild(context);
}

function generateYearElement(year) {
  const context = document.createElement('h2');
  context.appendChild(document.createTextNode(year));
  document.querySelector('body').appendChild(context);
}

function generateColorElement(year, data, k) {
  var sheet = window.document.styleSheets[0];
  colorName = '--'.concat(year);
  k = parseInt(k) + 1;
  selector = 'h5:nth-of-type('.concat(k + ')');
  rule = selector.concat(' { color: var(' + colorName + ');');
  document.documentElement.style.setProperty(colorName, data.color.hex);
  sheet.insertRule(rule, sheet.cssRules.length);
  document.documentElement.style.setProperty('p:nth-of-type(1)', colorName);
}

function getArrayOfYear(data) {
  array = [];
  for (var k in data) {
    array.push(data[k]);
  }
  return array;
}

// fetch css day-ta
const fetchData = async () => {
  try {
    const res = await fetch('https://cssday.nl/data.json');
    const data = await res.json();
    console.log(data);
    years = getYear(data);
    arrays = getArrayOfYear(data);

    for (var k in years) {
      generateYearElement(years[k]);
      generateColorElement(years[k], arrays[k], k);
      generateElement(arrays[k].venue, 'Locatie: ');
      generateElement(arrays[k].attendees.count, 'Aantal bezoekers: ');
      generateMCElement(arrays[k].mc, 'MC: ');
      generateMostRelevantSpeaker(arrays[k].speakers);
    }
    counter = 1;
    for (var i = years.length - 1; i >= 0; i--) {
      if (years[i] == '2019') {
        counter = counter + 3;
        generateDateElement(arrays[i].date, counter);
        generateLocationElement(arrays[i].venue, counter);
        generateLinkElement(arrays[i].link, counter);
        generateMCAltName(arrays[i].mc, counter)
        generatePriceElement(arrays[i].price, counter);
      } else {
        counter = counter + 1;
        generateDateElement(arrays[i].date, counter);
        generateLocationElement(arrays[i].venue, counter);
        generateLinkElement(arrays[i].link, counter);
        generateMCAltName(arrays[i].mc, counter)
        generatePriceElement(arrays[i].price, counter);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

fetchData();

const openingAudio = new Audio('assets/audio/opening.mp3');

openingAudio.currentTime = 5; // Stel de begintijd in op 5 seconden

const startCountdown = () => {
  //   openingAudio.play();
  let count = 5;
  const interval = setInterval(() => {
    count--;
    if (count >= 0) {
      document.querySelector('.opening .number').textContent = count;
    } else {
      clearInterval(interval);
      document.querySelector('.opening-wrapper').style.display = 'none';
    }
  }, 1000);

  setTimeout(() => {
    openingAudio.pause();
  }, 6500); // 5000 milliseconden = 5 seconden
};

startCountdown();
