// fetch css day-ta
const fetchData = async () => {
    try{
        const data = await fetch("https://cssday.nl/data.json");
        console.log(data);
    }
    catch(error){
        console.log(error);
    }
}

fetchData();