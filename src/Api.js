const BASE_URL = `https://m3-esp-cam-backend.vercel.app/`;
//const BASE_URL = `http://localhost:8000/`;
const Api = {
    getLumin: async () => {
        const req = await fetch(`${BASE_URL}getlumin`);
        const res = await req.json();
        const luminosity = res.luminosity;
        return luminosity;
    },
    getMode: async () => {
        const req = await fetch(`${BASE_URL}getMode`);
        const res = await req.json();
        const mode = res.mode;
        return mode;
    },
    getMotion: async () => {
        const req = await fetch(`${BASE_URL}getMotion`);
        const res = await req.json();
        const motion = res.motion;
        return motion;
    },
    getRgb: async () => {
        const req = await fetch(`${BASE_URL}getRgb`);
        const res = await req.json();
        const rgb = `#${res.rgb}`;
        return rgb;
    },
    getLight: async () => {
        const req = await fetch(`${BASE_URL}getLight`);
        const res = await req.json();
        const light = res.light;
        return light;
    },
    setLumin: async (luminosity) => {
        console.log(`${BASE_URL}setlumin?luminosity=${luminosity}`)
        const req = await fetch(`${BASE_URL}setlumin?luminosity=${luminosity}`,{
            method:'POST',
        });
        const res = await req.text();
        console.log(res);
        return res;
    },
    setMode: async (mode) => {
        const req = await fetch(`${BASE_URL}setMode?mode=${mode}`,{
            method:'POST',
        });
        const res = await req.text();
        console.log(res);
        return res;
    },
    setMotion: async (motion) => {
        const req = await fetch(`${BASE_URL}setMotion?motion=${motion}`,{
            method:'POST',
        });
        const res = await req.text();
        console.log(res);
        return res;
    },
    setLight: async (light) => {
        const req = await fetch(`${BASE_URL}setLight?light=${light}`,{
            method:'POST',
        });
        const res = await req.text();
        console.log(res);
        return res;
    },
    setRgb: async (rgb) => {
        let rgbWithoutHashtag = rgb.replace("#","");
        console.log(`${BASE_URL}setRgb?rgb=${rgb}`)
        const req = await fetch(`${BASE_URL}setRgb?rgb=${rgbWithoutHashtag}`,{
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