// fetch css day-ta
const fetchData = async () => {
    try{
        const res = await fetch("https://cssday.nl/data.json");
        const data = await res.json();
        console.log(data);
    }
    catch(error){
        console.log(error);
    }
}

fetchData();