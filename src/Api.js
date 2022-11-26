const BASE_URL = `https://m3-esp-cam-backend.vercel.app/`;
//const BASE_URL = `http://localhost:8000/`;
const Api = {
    getMode: async () => {
        const req = await fetch(`${BASE_URL}getMode`);
        const res = await req.json();
        const mode = res.mode;
        return mode;
    },
    setMode: async (mode) => {
        console.log(`${BASE_URL}setMode?mode=${mode}`)
        const req = await fetch(`${BASE_URL}setMode?mode=${mode}`,{
            method:'POST',
        });
        const res = await req.text();
        console.log(res);
        return res;
    },
    getURL: async () => {
        const req = await fetch(`${BASE_URL}getURLImage`);
        const res = await req.json();
        const URL = res.URL;
        console.log(URL);
        return URL;
    },
}
export default Api;