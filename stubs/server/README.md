# Template with Nodejs/Express/Typescript

This repository template can be used as a reference to some of the configuration or, using it as a boilerplate.

## Pre-defined Packages/Configurations

- Nodejs + Expressjs + Prisma With Typescript.
- Lodash + PM2.
- Prettier Script to format.
- {{builderType}}
- Docker compose template for Node app + MySQL + Adminer.

## Commands

- Start the Express server using PM2:

   ```bash
    yarn start
    yarn prod  # pm2 in Production
   ```

- Bundle the files:

   ```bash
    yarn dev # Build one time
    yarn watch # Watch changes
    yarn build # Build for production
   ```

- Docker compose:

   ```bash
    yarn docker:install # Pull images 
    yarn up # Create Docker-compose container 
    yarn down # Delete Docker-compose container 
   ```

## License

This repository is under [MIT LICENSE](LICENSE)
