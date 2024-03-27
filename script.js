function getYear(data) {
  years = [];
  for (var k in data) {
    years.push(k);
  }
  return years;
}

function getArrayOfYear(data) {
  array = [];
  for (var k in data) {
    array.push(data[k]);
  }
  return array;
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
  link.setAttribute('target', '_blank');
  link.appendChild(document.createTextNode('Website'));
  query = 'section:nth-of-type('.concat(
    counter + ') .ticket div div div:nth-of-type(2)'
  );
  document.querySelector(query).appendChild(link);
}

function generateMCAltName(data, counter) {
  const mcAltName = document.querySelectorAll(
    'section:nth-of-type('.concat(counter + ') div:nth-of-type(1) img')
  );
  for (var k in mcAltName) {
    if (mcAltName.hasOwnProperty(k)) {
      mcAltName[k].setAttribute('alt', data[k].name);
    }
  }

  for (var x in data) {
    const mcName = document.createElement('p');
    mcName.appendChild(document.createTextNode(data[x].name));
    query = 'section:nth-of-type('.concat(counter + ') div:nth-of-type(1)');
    document.querySelector(query).appendChild(mcName);
  }
}

function generatePriceElement(data, counter) {
  const price = document.createElement('span');
  price.appendChild(document.createTextNode('TICKET - €'.concat(data)));
  query = 'section:nth-of-type('.concat(counter + ') .ticket div h2');
  document.querySelector(query).appendChild(price);
}

function generateRelevantSpeaker(data, counter) {
  array = [];
  for (var k in data) {
    if (data[k].talk.video.views && data[k].talk.video != 'false') {
      speakerName = data[k].name;
      titleTalk = data[k].talk.title;
      speakerAvatar = data[k].avatar;
      thumbnailTalk = data[k].talk.video.thumbnail;
      countrySpeaker = data[k].country;
      viewCount = data[k].talk.video.views;
      likesTalk = data[k].talk.video.likes;
      videoLink = data[k].talk.video['youtube-link'];

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
      array.push(tempObject);
    }
  }

  array.sort((a, b) => b.views - a.views);
  mostPopular = array[0];
  tempArray = [];
  for (var k in mostPopular) {
    tempArray.push(mostPopular[k]);
  }

  const name = document.createElement('h2');
  const title = document.createElement('h3');
  const avatar = document.createElement('img');
  const thumbnail = document.createElement('img');
  const country = document.createElement('p');
  const views = document.createElement('p');
  const likes = document.createElement('p');
  const link = document.createElement('a');
  const className = document.querySelector(
    'section:nth-of-type('.concat(counter + ') .most-popular')
  );

  if (tempArray[0] == undefined) {
    className.remove();
  } else if (tempArray[0] != undefined) {
    name.appendChild(document.createTextNode(tempArray[0]));
    title.appendChild(document.createTextNode(tempArray[1]));
    avatar.setAttribute('src', tempArray[2]);
    thumbnail.setAttribute('src', tempArray[3]);
    country.appendChild(
      document.createTextNode('Nationaliteit: '.concat(tempArray[4]))
    );
    views.appendChild(document.createTextNode('Views: '.concat(tempArray[5])));
    likes.appendChild(document.createTextNode('Likes: '.concat(tempArray[6])));
    link.setAttribute('href', tempArray[7]);
    link.setAttribute('target', '_blank');
    link.appendChild(document.createTextNode('Video'));

    className.appendChild(name);
    className.appendChild(title);
    className.appendChild(avatar);
    className.appendChild(country);
    className.appendChild(thumbnail);
    className.appendChild(views);
    className.appendChild(likes);
    className.appendChild(link);
  }
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
      generateColorElement(years[k], arrays[k], k);
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
