import appExpress from "./app.js";
import config from "./src/utils/config.js";

const main = () => {
    appExpress.listen(config.server, () => console.log(`http://${config.server.hostname}:${config.server.port}`));
    console.log(`Sever corriendo en puerto ${config.server.port}`);
}

main()
