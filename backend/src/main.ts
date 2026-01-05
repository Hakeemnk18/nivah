// import { env } from "./config/env";
// import 'reflect-metadata';
// import app from "./core/app";
// import { connectDB } from "./config/db";
// import { Application } from 'express';
// import userModule from './modules/user/user.module'
// import passwordResetModule from "./modules/passwordReset/password.reset.module";
// import placeModule from "./modules/place/place.module";
// import routeModule from "./modules/route/route.module";
// import busModule from "./modules/bus/bus.module";
// import taxiModule from "./modules/taxi/taxi.module";

// const PORT = env.PORT

// const startServer = async () => {
//     try {
        


//         console.log("Connecting to database...");
//         await connectDB();
//         console.log("Database connected successfully.");


//         const expressApp: Application = app;

//         userModule(expressApp);
//         passwordResetModule(expressApp)
//         placeModule(expressApp)
//         routeModule(expressApp)
//         busModule(expressApp)
//         taxiModule(expressApp)


//         expressApp.listen(PORT, () => {
//             console.log(`🚀 Server running on port ${PORT}`);
//         });


//     } catch (error) {
        

//         if (error instanceof Error) {
//             console.error(error.message);
//             console.error(error.stack); 
//         } else {
//             console.error("An unknown error occurred", error);
//         }
//         process.exit(1);
//     }
// }

// startServer()


