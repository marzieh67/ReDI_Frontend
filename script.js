const api_url= 'http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={c71eb334b9f16ce9ac215af9464c2b86}';
async function getTepm(){
    const response=await fetch(api_url);
    const data = await response.json();
    console.log(data);
}
getTepm();