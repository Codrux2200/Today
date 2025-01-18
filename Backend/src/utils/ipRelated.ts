import Statconnexion from "../models/Statconnexion";

export const getInfoFromIp = async (ip : string, userId : string) => {
    const url = `https://freeipapi.com/api/json/${ip}`;
    await fetch(url)
    .then(response => {
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(async data => {
        console.log(data); 
        await pushdataIp(data, userId);
    })
    .catch(error => {
        console.error('Erreur :', error);
    });
}

const pushdataIp = async (data : any, userId : string) => {

    const newStat = new Statconnexion({
        userId : userId,
        data : data
    });

    await newStat.save();
    console.log("datastat set !");
}