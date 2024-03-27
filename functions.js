// de tellers
const decenniumCounter =  document.getElementById("3rd");
const jaarCounter =  document.getElementById("4th");

// alle secties
const sections = document.querySelectorAll("section:not(#flip-clock)");

// de opties voor de intersection observer
// afgaan als een element half in beeld is
let options = {
  threshold: .5
};


// functie die wordt uitgevoerd if element in/uit beeld
let callback = entries => {
	// met elk element dat de obeserver liet afgaan wat doen
	entries.forEach((entry) => {
		// bepalen of het element intersect
  	const intersecting = entry.isIntersecting		
		
		// als het element intersect
		if(intersecting) {
			const deSection = entry.target;
	
			// de waarde voor de jaren uit de section halen
			const jaren = deSection.dataset.j;
			
			// de waarde voor het decennium berekenen
			// het aantal jaren gedeeld door 10
			// en dan naar beneden afgerond
			const decennium = Math.floor( jaren / 10 );
			// de waar voor het jaar berekenen
			// het aantal jaren door 10 delen
			// en wat dan overblijft gebruiken
			// nb. dat heet ook wel de modulo of remainder
			const jaar = jaren % 10;
			
			// de waarde voor het decennium toekennen aan de decennium ul
			decenniumCounter.dataset.nummer = decennium;
			// de waarde voor het jaar toekennen aan de jaar ul
			jaarCounter.dataset.nummer = jaar;
			// als bonus het decennium ook als cut prop aan de jaar ul toekennen
			// die wordt gebruikt in de css gebruikt in de flip berekening
			// zodat de spinner tussen 19 en 20 doordraait (ipv terug)
			jaarCounter.style.setProperty("--tiental", decennium);
			
			
			// dan nog in het menu aangeven waar je bent
			
			// het huidige/oude jaar opzoeken
			const huidigeJaar = document.querySelector(".current");
			// als die gevonden is, de class current verwijderen
			if(huidigeJaar) {
				huidigeJaar.classList.remove("current");
			}
			
			// het nieuwe jaar opzoeken
			// met de ID van de section
			const nieuweJaar = document.querySelector("[href='#" + deSection.id + "']");
			
			
			// console.log(nieuweJaar);
			// als die gevonden is, de class current toevoegen
			if(nieuweJaar) {
				nieuweJaar.classList.add("current");
			}

  	};
	})
};


// de intersection observer aanmaken met de callbaack en opties
let observer = new IntersectionObserver(callback, options);


// de secties aan de observer toevoegen
// zodat de observer op ze kan letten
sections.forEach(section => {
	observer.observe(section);
});