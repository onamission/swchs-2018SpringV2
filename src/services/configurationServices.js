class configurationServices{
    getConfig(){
        return {
            appUrl: process.env.APP_URL || "http://localhost:3100"
        }
    }
}
module.exports = configurationServices;