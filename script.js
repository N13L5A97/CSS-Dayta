// verkrijg alle jaar tallen
function getYear(data) {
  years = [];
  for (var k in data) {
    years.push(k);
  }
  return years;
}

// verkrijg alle objects uit de JSON, per jaar
function getArrayOfYear(data) {
  array = [];
  for (var k in data) {
    array.push(data[k]);
  }
  return array;
}

// verkrijg de kleur van het bijbehorende jaar
// genereer een regel dat van de kleur een CSS variabele maakt en zet deze in de stylesheet
function generateColorElement(year, data) {
  // pak een stylesheet uit de browser
  var sheet = window.document.styleSheets[0];
  // stel de kleurnaam in a.d.h.v. het jaar
  colorName = '--'.concat(year);
  // maak een regel aan voor in de stylesheet
  rule = ':root { color: var(' + colorName + ')';
  // voeg de styling toe aan de regel
  document.documentElement.style.setProperty(colorName, data.color.hex);
  // voer de regel toe aan de stylesheet
  sheet.insertRule(rule, sheet.cssRules.length);
}

// verkrijg van elk jaar de datum(s) waarop het evenement werd gehouden
// genereer hiervoor één of meerdere HTML element(en) en plaatst deze op de gespecificeerde plek
function generateDateElement(data, counter) {
  // als het evenement op één dag wordt gehouden, doe dan iets
  if (data.length === 1) {
    // maak de query voor de locatie van waar het HTML element geplaatst moet worden
    query = document.querySelector(
      'section:nth-of-type('.concat(counter + ') .ticket div div p')
    );
    // zoek het element a.d.h.v. de query en voeg een attribuut toe
    query.setAttribute('class', 'singleDate');
  }
  // voor elke key in data, doe iets
  for (var k in data) {
    // genereer het element voor de datum
    const dateData = document.createElement('time');
    // voeg de datum toe aan het gegenereerde element, met daarbij de datum in omgekeerde volgorde(DD-MM-YYYY)
    dateData.appendChild(
      document.createTextNode(data[k].split('-').reverse().join('-'))
    );
    // maak de query voor de locatie waar het HTML element geplaatst moet worden
    query = 'section:nth-of-type('.concat(counter + ') .ticket div div p');
    // zoek het element a.d.h.v. de query en voeg het HTML element toe
    document.querySelector(query).appendChild(dateData);
  }
}

// verkrijg van elk jaar de locatie waarop het evenement werd gehouden
// genereer hiervoor een HTML element en plaatst deze op de gespecificeerde plek 
function generateLocationElement(data, counter) {
  // genereer het element voor de locatie
  const location = document.createElement('p');
  // voeg de locatie toe aan het gegenereerde element
  location.appendChild(document.createTextNode(data));
  // maak de query voor de locatie waar het HTML element geplaatst moet worden
  query = 'section:nth-of-type('.concat(
    counter + ') .ticket div div div:nth-of-type(1)'
  );
  // zoek het element a.d.h.v. de query en voeg het HTML element toe
  document.querySelector(query).appendChild(location);
}

// verkrijg van elk jaar de URL naar de bijbehorende pagina op cssday.nl
// genereer hiervoor een HTML element en plaatst deze op de gespecificeerde plek
function generateLinkElement(data, counter) {
  // genereer het element voor de URL
  const link = document.createElement('a');
  // zet de URL naar de desbetreffende site als attribuut in het HTML element
  link.setAttribute('href', data);
  // stel een attribuut in waardoor de URL op een nieuw tablad wordt geopend
  link.setAttribute('target', '_blank')
  // voeg tekst toe aan het gegenereerde element.
  link.appendChild(document.createTextNode('Website'));
  // maak de query voor de locatie waar het HTML element geplaatst moet worden
  query = 'section:nth-of-type('.concat(
    counter + ') .ticket div div div:nth-of-type(2)'
  );
  // zoek het element a.d.h.v. de query en voeg het HTML element toe.
  document.querySelector(query).appendChild(link);
}

// verkrijg van elk jaar de MC(s) die op het evenement aanwezig was/waren
// genereer hiervoor één of meerdere HTML element(en) en plaatst deze op de gespecificeerde plek
function generateMCAltNameOld(data, counter) {
  // haal het element op waar de HTML element aan toe word gevoegd
    const mcAltName = document.querySelectorAll('section:nth-of-type('.concat(counter + ') div:nth-of-type(1) img'))
    // voor elke waarde in mcAltName, doe iets
    for(var k in mcAltName) {
        // als mcAltName een eigen property heeft, doe dan iets 
        if (mcAltName.hasOwnProperty(k)) {
            // geef het alt attribuut als waarde een naam van een mc uit data.
            mcAltName[k].setAttribute('alt', data[k].name)
        }
    }
    // voor elke key in data, doe iets
    for(var x in data) {
        // genereer het HTML element voor de naam van de MC
        const mcName = document.createElement('p');
        // voeg de naam van de MC toe aan het HTML element
        mcName.appendChild(document.createTextNode(data[x].name))
        // maak de query voor de locatie waar het HTML element geplaatst moet worden
        query = 'section:nth-of-type('.concat(
            counter + ') div:nth-of-type(1)'
          );
        // zoek het element a.d.h.v. de query en voeg het HTML element toe.
        document.querySelector(query).appendChild(mcName)
    }
  }

// verkrijg van elk jaar de MC(s) die op het evenement aanwezig was/waren
// genereer hiervoor één of meerdere HTML element(en) en plaatst deze op de gespecificeerde plek
function generateMCAltName(data, counter) {
  // voor elke key in data, doe iets
  for (var k in data) {
    // als k gelijk is aan 0 (1e positie), doe iets
    if (k == 0) {
      // haal het element op waar het alt attribuut aan wordt toegevoegd
      const mcAltName = document.querySelector('section:nth-of-type('.concat(counter + ') div:nth-of-type(1) img'))
      // stel als alt attribuut de naam van de MC in.
      mcAltName.setAttribute('alt', data[k].name)
      // genereer het HTML element waar de naam van de MC in komt te staan.
      const mcName = document.createElement('p');
      // geef het gegenereerde HTML als tekst de naam van de MC mee
      mcName.appendChild(document.createTextNode(data[k].name))
        // maak de query voor de locatie waar het HTML element geplaatst moet worden
        query = 'section:nth-of-type('.concat(
            counter + ') div:nth-of-type(1) div:nth-of-type(1)'
          );
        // zoek het element a.d.h.v. de query en voeg het HTML element toe.
        document.querySelector(query).appendChild(mcName)
      
    } else if (k == 1) {
      // haal het element op waar het alt attribuut aan wordt toegevoegd
      const mcAltName = document.querySelector('section:nth-of-type('.concat(counter + ') div:nth-of-type(3) img'))
      // stel als alt attribuut de naam van de MC in.
      mcAltName.setAttribute('alt', data[k].name)
      // genereer het HTML element waar de naam van de MC in komt te staan.
      const mcName = document.createElement('p');
      // geef het gegenereerde HTML als tekst de naam van de MC mee
      mcName.appendChild(document.createTextNode(data[k].name))
        // maak de query voor de locatie waar het HTML element geplaatst moet worden
        query = 'section:nth-of-type('.concat(
            counter + ') div:nth-of-type(3)'
          );
        // zoek het element a.d.h.v. de query en voeg het HTML element toe.
        document.querySelector(query).appendChild(mcName)
    }
    
  }
}

// verkrijg van elk jaar de prijs van één ticket
// genereer hiervoor één HTML element en plaatst deze op de gespecificeerde plek
function generatePriceElement(data, counter) {
    // genereer het HTML element voor de prijs van een ticket
    const price = document.createElement('span');
    // voeg de prijs van de ticket toe aan het HTML element
    price.appendChild(document.createTextNode('TICKET - €'.concat(data)));
    // maak de query voor de locatie waar het HTML element geplaatst moet worden
    query = 'section:nth-of-type('.concat(counter + ') .ticket div h2');
    // zoek het element a.d.h.v. de query en voeg het HTML element toe.
    document.querySelector(query).appendChild(price);
}

// verkrijg van elk jaar de meest relevante spreker, met de bijbehorende informatie, op basis van de views op de YouTube video van het evenement.
// genereer hiervoor meerdere HTML elementen en plaatst deze op de gespecificeerde plek
function generateRelevantSpeaker(data, counter) {
  // lege array
  array = [];
  // voor elke key in data, doe iets
  for (var k in data) {
    // als de waardes voor video en views niet leeg zijn, doe iets
    if (data[k].talk.video.views && data[k].talk.video != 'false') {
      // verkrijgen van informatie uit data
      speakerName = data[k].name;
      titleTalk = data[k].talk.title;
      speakerAvatar = data[k].avatar;
      thumbnailTalk = data[k].talk.video.thumbnail;
      countrySpeaker = data[k].country;
      viewCount = data[k].talk.video.views;
      likesTalk = data[k].talk.video.likes;
      videoLink = data[k].talk.video['youtube-link'];
      
      // nieuw Object om tijdelijk de verkregen informatie in op te slaan
      tempObject = {
        name: speakerName,
        title: titleTalk,
        avatar: speakerAvatar,
        thumbnail: thumbnailTalk,
        country: countrySpeaker,
        views: viewCount,
        likes: likesTalk,
        link: videoLink,
      };
      
      // zet het tijdelijke Object in de lege array
      array.push(tempObject); 
    } 
  }
  // sorteer de array op de views van de YouTube video, van hoog naar laag
  array.sort((a, b) => b.views - a.views);

  // zet het Object dat bovenaan staat (de meest populaire) in mostPopular
  mostPopular = array[0]
  // lege, tijdelijk array
  tempArray = []
  // voor elke key (elk stukje informatie) in mostPopular, doe iets
  for (var k in mostPopular) {
    // zet elke key uit het Object in een array
    tempArray.push(mostPopular[k])
  }
  // genereer de benodigde HTML elementen
  const name = document.createElement('h2');
  const title = document.createElement('h3');
  const avatar = document.createElement('img');
  const link = document.createElement('a');
  const thumbnail = document.createElement('img');
  const country = document.createElement('p');
  const views = document.createElement('p');
  const likes = document.createElement('p');
  const close = document.createElement('button');
  // haal het element op waar de gegenereerde HTML elementen aan worden toegevoegd
  const className = document.querySelector('section:nth-of-type('.concat(counter + ') .most-popular'))
  // als het eerste object (meest recente jaar, kan nog geen evenement voor zijn geweest) leeg is, doe dan iets
  if (tempArray[0] == undefined) {
    // verwijder het element waar de HTML elementen aan toe zouden worden gevoegd.
    className.remove();
  // als het eerste object niet leeg is, doe dan iets
  } else if (tempArray[0] != undefined) {
    // voeg de juiste attribuut/informatie toe aan het gegenereerde HTML element
    name.appendChild(document.createTextNode(tempArray[0]));
    title.appendChild(document.createTextNode(tempArray[1]));
    avatar.setAttribute('src', tempArray[2]);
    link.setAttribute('href', tempArray[7])
    link.setAttribute('target', '_blank')
    thumbnail.setAttribute('src', tempArray[3])
    country.appendChild(document.createTextNode('Nationaliteit: '.concat(tempArray[4])))
    views.appendChild(document.createTextNode('Views: '.concat(tempArray[5])))
    likes.appendChild(document.createTextNode('Likes: '.concat(tempArray[6])))

    close.appendChild(document.createTextNode('x'))
    close.setAttribute('onClick', 'hideMostRelevantSpeaker('.concat(counter + ')'))
    // voeg de gegenereerde HTML elementen toe aan het opgehaalde HTML element.
    link.appendChild(thumbnail)
    className.appendChild(name)
    className.appendChild(title)
    className.appendChild(avatar)
    className.appendChild(country)
    className.appendChild(views)
    className.appendChild(likes)
    className.appendChild(link)
    className.appendChild(close)
    className.style.display = 'none'
  }
}

function showMostRelevantSpeaker(location) {
  const className = document.querySelector('section:nth-of-type('.concat(location + ') .most-popular'))
  className.style.display = 'block'
  const cameraAnimation = document.querySelector('section:nth-of-type('.concat(location + ') .camera-wrapper'))
  cameraAnimation.classList.add('playing')
}

function hideMostRelevantSpeaker(location) {
  const className = document.querySelector('section:nth-of-type('.concat(location + ') .most-popular'))
  className.style.display = 'none'
  const cameraAnimation = document.querySelector('section:nth-of-type('.concat(location + ') .camera-wrapper'))
  cameraAnimation.classList.remove('playing')
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
      generateColorElement(years[k], arrays[k]); 
    }
    counter = 1;
    for (var i = years.length - 1; i >= 0; i--) {
      if (years[i] == '2019') {
        counter = counter + 3;
        generateDateElement(arrays[i].date, counter);
        generateLocationElement(arrays[i].venue, counter);
        generateLinkElement(arrays[i].link, counter);
        generateMCAltName(arrays[i].mc, counter);
        generatePriceElement(arrays[i].price, counter);
        generateRelevantSpeaker(arrays[i].speakers, counter);
      } else {
        counter = counter + 1;
        generateDateElement(arrays[i].date, counter);
        generateLocationElement(arrays[i].venue, counter);
        generateLinkElement(arrays[i].link, counter);
        generateMCAltName(arrays[i].mc, counter);
        generatePriceElement(arrays[i].price, counter);
        generateRelevantSpeaker(arrays[i].speakers, counter);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

fetchData();

// voeg audio toe aan het 'startscherm' van de site
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
