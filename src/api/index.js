import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData= async (country)=>{
    let changeableurl=url;
    if(country){
        changeableurl=`${url}/countries/${country}`
        console.log(changeableurl)
    }
    try {
        const { data: {confirmed,recovered,deaths,lastUpdate}}=await axios.get(changeableurl);
        
      
           
          return {confirmed,recovered,deaths,lastUpdate}
    } catch (error) {
        return error;
    }
}

export const fetchDailyData = async () =>{
    try {
       const {data} = await axios.get(`${url}/daily`);
       //console.log(data); 
       const modifiedData=data.map((dailyData)=>({
           confirmed: dailyData.confirmed.total,
           deaths: dailyData.deaths.total,
           date: dailyData.reportDate,
       }));
       return modifiedData;
    } catch (error) {
        return error; 
    }
}

export const fetchcountries = async () =>{
    try {
        const {data:{countries}}= await axios.get('https://covid19.mathdro.id/api/countries')
        //console.log(response)
        return countries.map((country) =>country.name)
    } catch (error) {
       return error;
    }
}
fetchcountries().then(console.log);