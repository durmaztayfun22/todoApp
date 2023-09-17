const url = "https://www.floatrates.com/daily/usd.json";

const dolarAl = async () => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Yanıt olumlu değil");
        }
        const data = await response.json();
        const istenilenFormat = {
            TL: data.try.inverseRate,
            DOLAR: data.try.rate,
        };
        console.log(istenilenFormat);
    } catch (error) {
        console.log(error);
    }
};

// const dolarAlthen = async () => {
//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error("Yanıt olumlu değil");
//         }
//         const data = await response.json();
//         const jsonFormat = {
//             TL: data.try.inverseRate,
//             DOLAR: data.try.rate,
//         };
//         console.log(jsonFormat);
//     } catch (error) {
//         console.log(error);
//     }
// };

module.exports = { dolarAl };
