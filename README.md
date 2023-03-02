<details>
  <summary><h3><strong>1. Setup</strong></h3></summary><br />
  <details>
  <summary><h4><strong>1.1 Criando o projeto</strong></h4></summary><br />

  1. Crie um diretório

  ~~~bash
  mkdir <nome-do-diretório> && cd <nome-do-diretório>
  ~~~

  2. Inicie a aplicação

  ~~~bash
  npm init -y
  ~~~

  3. Instale o `express`

  ~~~bash
  npm install express
  ~~~

  4. Instale o `dotenv`

  ~~~bash
  npm i dotenv
  ~~~

  5. Instale o `Sequelize`

  ~~~bash
  npm i sequelize
  ~~~

  > Atalho

  ~~~bash
  npm i express dotenv sequelize
  ~~~

  6. Instale o `mysql2`

  ~~~bash
  npm i -D mysql2
  ~~~

  7. Instale o `sequelize-cli`

  ~~~bash
  npm i -D sequelize-cli
  ~~~

  > Atalho

  ~~~bash
  npm i -D mysql2 sequelize-cli
  ~~~

  8. Instale a biblioteca `http-status-codes` ❗️ *Opcional* ❗️

  ~~~bash
  npm install http-status-codes
  ~~~

  9. Crie os arquivos `index.ts` e `app.ts` dentro do diretório `src`

  ~~~bash
  mkdir src && touch src/index.ts src/app.ts
  ~~~

  10. Você pode usar os templates abaixo nos seus arquivos ❗️ *Opcional* ❗️

  ~~~TypeScript
  // src/index.ts

  import app from './app';

  const PORT = 8000;

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
  ~~~

  ~~~TypeScript
  // src/app.ts

  import express from 'express';
  import { StatusCodes } from 'http-status-codes';

  const app = express();

  app.use(express.json());

  app.get('/', (req, res) => {
    res.status(StatusCodes.OK).send('Express + TypeScript')
  });

  export default app;
  ~~~

  11. Instale a biblioteca `express-async-errors`

  > Essa biblioteca ajuda com tratamento de erros sem precisar usar try/catch

  ~~~bash
  npm install express-async-errors
  ~~~

  > Importe a biblioteca logo após a importação do express;

  ~~~TypeScript
  // ./app.ts

  import express, { Request, Response } from 'express';
  import 'express-async-errors';
  import { StatusCodes } from 'http-status-codes';

  // ..
  ~~~

  </details>
  
  <details>
  <summary><h4><strong>1.2 Configurando o TypeScript</strong></h4></summary><br />

  1. Instale o `typescript`

  ~~~bash
  npm install -D typescript
  ~~~

  2. Instale o `@types/sequelize`

  ~~~bash
  npm install -D @types/sequelize
  ~~~

  3. Instale o `@types/express`

  ~~~bash
  npm install -D @types/express
  ~~~

  4. Instale o `@types/node`

  ~~~bash
  npm install -D @types/node
  ~~~

  5. Instale o `ts-node-dev`

  ~~~bash
  npm install -D ts-node-dev
  ~~~

  > Atalho

  ~~~bash
  npm install -D typescript @types/sequelize @types/express @types/node ts-node-dev
  ~~~

  6. Crie o `.tsconfig`

  ~~~bash
  npx tsc --init
  ~~~

  7. Garanta as seguintes configurações

  ~~~JSON
  {
    "compilerOptions": {
      "module": "commonjs",
      "target": "es6",
      "rootDir": "./src",
      "outDir": "./dist",
      "esModuleInterop": true,
      "strict": true
    }
  }
  ~~~

  8. Crie scripts no arquivo `package.json`

  ~~~JSON
  ...
  "scripts": {
      "start": "npm run build && node ./dist/index.js",
      "dev": "tsnd ./src/index.ts",
      "build": "tsc"
  },
  ...
  ~~~

  > - `start`: executa o `build` da aplicação e depois roda o arquivo compilado dentro da pasta `dist`;
  > - `dev`: executa a aplicação em modo de desenvolvimento utilizando o `ts-node-dev`;
  > - `build`: executa a compilação do projeto utilizando o `TSC`.

  9. Execute a aplicação

  ~~~bash
  npm start
  ~~~

  10. Inclua tipos no app.ts

  ~~~TypeScript
  // ./app.ts

  import express, { Request, Response } from 'express';
  import 'express-async-errors';
  import { StatusCodes } from 'http-status-codes';

  const app = express();

  app.use(express.json());

  app.get('/', (req: Request, res: Response) => {
    res.status(StatusCodes.OK).send('Express + TypeScript')
  });

  export default app;
  ~~~

  11. Inclua um middleware de erro

  ~~~TypeScript
  // src/app.ts

  import express, { Request, Response, ErrorRequestHandler } from 'express';
  // import { StatusCodes } from 'http-status-codes';
  //
  // const app = express();
  //
  // app.use(express.json());
  //
  // app.get('/', (req: Request, res: Response) => {
  //   res.status(StatusCodes.OK).send('Express + TypeScript')
  // });

  const erroMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    const { name, message, details } = err;
    console.log(`name: ${name}`);

    switch (name) {
      case 'ValidationError':
        res.status(400).json({ message: details[0].message });
        break;
      case 'NotFoundError':
        res.status(404).json({ message });
        break;
      case 'ConflictError':
        res.status(409).json({ message });
        break;
      default:
        console.error(err);
        res.sendStatus(500);
    }

    next();
  };

  app.use(erroMiddleware);

  // export default app;
  ~~~

  12. Instale as bibliotecas `restify-errors` e `@types/restify-errors` ❗️ *Opcional* ❗️

  > Essas bibliotecas ajudam com disparos de erros específicos

  ~~~bash
  npm install restify-errors @types/restify-errors
  ~~~

  </details>

  <details>
  <summary><h4><strong>1.3 Setup do Docker e Docker-Compose</strong></h4></summary><br />
  
  1. Crie o arquivo `Dockerfile`

  ~~~bash
  touch Dockerfile
  ~~~

  2. Garanta as seguintes configurações

  ~~~Dockerfile
  FROM node:16.14-alpine

  WORKDIR /app-backend-default

  COPY package* ./

  RUN npm install

  COPY . .

  EXPOSE 3001

  RUN npx tsc

  CMD ["npm", "start"]
  ~~~

  3. Crie o arquivo `docker-compose.yml`

  ~~~bash
  touch docker-compose.yml
  ~~~

  4. Garanta as seguintes configurações

  ~~~yml
    version: '3.9'
    services:
      backend:
        container_name: app_backend_default
        build: ./
        ports:
          - 3001:3001
        platform: linux/x86_64
        working_dir: /app-backend-default
        command: npm start
        depends_on:
          db:
            condition: service_healthy
        env_file:
          - .env
        healthcheck:
          test: ["CMD", "lsof", "-t", "-i:3001"]
          timeout: 10s
          retries: 5
        volumes:
          - ./:/app-backend-default
      db:
        image: mysql:8.0.21
        container_name: db
        platform: linux/x86_64
        ports:
          - 3002:3306
        environment:
          - MYSQL_ROOT_PASSWORD=root
        restart: 'always'
        healthcheck:
          test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
          timeout: 10s
          retries: 5
        cap_add:
          - SYS_NICE
  ~~~

  </details>
</details>

<details>
  <summary><h3><strong>2. Camada de Modelo</strong></h3></summary><br />
  
  Vamos entender aqui como implementar nossos modelos.

  <details>
  <summary><h4><strong>2.1 Setup do Sequelize</strong></h4></summary><br />
  
  1. Gere um arquivo `./.sequelizerc`

  ~~~bash
  touch .sequelizerc
  ~~~

  2. Garanta as seguintes configurações

  ~~~TypeScript
  const path = require('path');

  module.exports = {
    'config': path.resolve(__dirname,'dist','database','config', 'config.js'),
    'models-path': path.resolve(__dirname,'dist','database','models'),
    'seeders-path': path.resolve(__dirname,'src','database', 'seeders'),
    'migrations-path': path.resolve(__dirname,'src','database', 'migrations'),
  };
  ~~~

  3. Inicie o sequelize

  ~~~bash
  npx sequelize-cli init
  ~~~

  4. Crie as pastas faltantes `./src/database/config/`, `./src/database/models/`

  ~~~bash
  mkdir ./src/database/config/ ./src/database/models/
  ~~~

  5. Crie o arquivo `config.ts` em `./src/database/config/`

  ~~~bash
  touch ./src/database/config/config.ts
  ~~~

  6. Garanta as seguintes configurações

  ~~~TypeScript
  import 'dotenv/config';
  import { Options } from 'sequelize';

  const config: Options = {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: process.env.DB_NAME || 'cookmaster',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    dialect: 'mysql',
  }

  module.exports = config;
  ~~~

  7. Crie um script de transpilação do arquivo de configuração e criação do banco

  ~~~JSON
  //...
  "scripts": {
    //...
      "db:reset": "npx -y tsc && npx sequelize-cli db:drop && npx sequelize-cli db:create",
    //...
  },
  //...
  ~~~

  8. Verifique se está tudo certo, executando o script

  ~~~bash
  npm run db:reset
  ~~~
  
  </details>

  <details>
  <summary><h4><strong>2.2 Migrations</strong></h4></summary><br />
  
  1. Crie as migrations

  ~~~bash
  npx sequelize migration:generate --name create-users
  npx sequelize migration:generate --name create-recipes
  ~~~

  2. Altere as migrations

  ~~~JavaScript
  // migrations/XXXXXXXXXXXXX-create-users.js

  'use strict';

  /** @type {import('sequelize-cli').Migration} */
  module.exports = {
    async up (queryInterface, Sequelize) {
      await queryInterface.createTable('users', {
      id: { 
        type: Sequelize.INTEGER,
        allowNull: false, 
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
    },
    {
      timestamps: false,
    })
    },

    async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('users');
    }
  };
  ~~~

  ~~~JavaScript
  // migrations/XXXXXXXXXXXXX-create-recipes.js

  'use strict';

  /** @type {import('sequelize-cli').Migration} */
  module.exports = {
    async up (queryInterface, Sequelize) {
      await queryInterface.createTable('recipes', {
        id: { 
          type: Sequelize.INTEGER,
          allowNull: false, 
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false, 
        },
        ingredients: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        preparation: {
          type: Sequelize.STRING,
          allowNull: false, 
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false, 
          field: 'user_id',
          references: {
            model: 'users',
            key: 'id',
          }
        }
      },
      {
        timestamps: false,
      })
    },

    async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('recipes');
    }
  };
  ~~~

  3. Execute as migrations

  ~~~bash
  npx sequelize db:migrate
  ~~~

  > Caso queira reverter:

  ~~~bash
  npx sequelize db:migrate:undo 
  ~~~

  > Ou:

  ~~~bash
  npx sequelize db:migrate:undo:all
  ~~~

  </details>
  
  <details>
  <summary><h4><strong>2.3 Seeders</strong></h4></summary><br />
  
  1. Crie um novo seed

  ~~~bash
  npx sequelize seed:generate --name users
  npx sequelize seed:generate --name recipes
  ~~~

  2. Adicione as informações que serão colocadas no banco

  ~~~JavaScript
  // seeders/XXXXXXXXXXXXX-users.js

  'use strict';
  module.exports = {
    async up (queryInterface, Sequelize) {
      console.log('here!')
      await queryInterface.bulkInsert('users', [
      {
        name: 'Yarpen Zigrin',
        email: 'yarpen.zigrin@commerce.com',
        // password_hash: 'c2f28289d2ed874df63306dc0305e642',
        password: 'anao_vermelho',
        role: 'admin',
      },
      {
        name: 'Ford Perfect',
        email: 'ford.perfect@yahoo.com',
        // password_hash: 'b4df15c4d4cc344b161638d78aad20f8',
        password: 'Betelgeuse',
        role: 'user',
      },
      {
        name: 'Arthur Dent',
        email: 'dent.arthur@gmail.com',
        // password_hash: '5b0cedd4fc9cda69752f9adb7d75833f',
        password: '23657942',
        role: 'user',
      },
      {
        name: 'Hurley Reyes',
        email: 'hurley.reyes@commerce.com',
        // password_hash: 'f7b16af5588f9654862e4aefcec8b0de',
        password: '4815162342',
        role: 'user',
      },
      {
        name: 'Franklin Clinton',
        email: 'clinton_gs.franklin@yahoo.com',
        // password_hash: '0f5d023227880c7629468b0b0ab3d650',
        password: '65486486',
        role: 'user',
      },
      {
        name: 'Trevor Phillips',
        email: 'phillips.trevor@tpindustries.com',
        // password_hash: '40bc4b7c2b114dc11c98b4c3fdf0679f',
        password: 'p4s5w0rd',
        role: 'user',
      },
      {
        name: 'Carol Denvers',
        email: 'denvers.carol@commerce.com',
        // password_hash: '64c9ac2bb5fe46c3ac32844bb97be6bc',
        password: 'seller',
        role: 'admin',
      },
      {
        name: 'Vovo Juju',
        email: 'vovo.juju@hotmail.com',
        // password_hash: '62608e08adc29a8d6dbc9754e659f125',
        password: 'client',
        role: 'user',
      },
    ], { });
    },
    
    async down (queryInterface) { queryInterface.bulkDelete('users', null, {}) }
  };
  ~~~

  3. Execute o seed

  ~~~bash
  npx sequelize db:seed:all
  ~~~

  > E para reverter:

  ~~~bash
  npx sequelize db:seed:undo:all
  ~~~

  > Para executar um seed específico:

  ~~~bash
  npx sequelize db:seed --seed XXXXXXXXXXXXXX-nome-seed.js
  ~~~

  > E para reverter:

  ~~~bash
  npx sequelize db:seed:undo --seed XXXXXXXXXXXXXX-nome-seed.js
  ~~~

  </details>

   <details>
  <summary><h4><strong>2.4 Models</strong></h4></summary><br />

  1. Crie um arquivo `index.ts` no diretório `./src/database/models/`

  ~~~bash
  touch ./src/database/models/index.ts
  ~~~

  2. Instancie o Sequelize dentro deste arquivo

  ~~~TypeScript
  import { Sequelize } from 'sequelize';
  import * as config from '../config/config';

  export default new Sequelize(config);
  ~~~

  3. Crie o Model

  > Neste passo um ponto temos um ponto de atenção, se executarmos o comando `npx sequelize model:generate --name users --attributes name:string`, em conjunto com o nosso model será criado um novo arquivo de migration para a tabela users, porém nós já temos essa migration, sendo assim, apague a nova migration gerada.
  >
  > Aqui iremos usar o terminal para criar a model, mas não usaremos a cli do sequelize, usaremos o bash mesmo

  ~~~bash
  touch ./src/database/models/user.ts
  ~~~

  4. Adicione as informações referentes ao Model

  ~~~TypeScript
  // models/user.ts

  import { Model, INTEGER, STRING } from 'sequelize';
  import db from '.';

  class User extends Model {
    id!: number;
    email!: string;
    password!: string;
    name!: string;
    role!: string;
  }

  User.init({
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: STRING,
      allowNull: false,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    role: {
      type: STRING,
      allowNull: false,
    },
  }, {
    sequelize: db,
    modelName: 'users',
    timestamps: false
  });

  export default User;
  ~~~

  </details>

   <details>
  <summary><h4><strong>2.5 Associações</strong></h4></summary><br />
  
  1. Crie a associação entre os Models

  ~~~TypeScript
  // models/recipe.ts

  import { Model, INTEGER, STRING } from 'sequelize';
  import db from '.';
  import User from './user';

  class Recipe extends Model {
    id!: number;
    name!: string;
    ingredients!: string;
    preparation!: string;
    userId!: number;
  }

  Recipe.init({
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    ingredients: {
      type: STRING,
      allowNull: false,
    },
    preparation: {
      type: STRING,
      allowNull: false,
    },
    userId: {
      type: INTEGER,
      allowNull: false,
    },
  }, {
    sequelize: db,
    modelName: 'recipes',
    timestamps: false,
    underscored: true,
  });

  Recipe.belongsTo(User, { foreignKey: 'userId', as: 'user' });

  export default Recipe;

  ~~~

  2. Chame uma função do Sequelize passando uma associação

  ~~~TypeScript
  // src/database/model/testModel.ts

  import Recipe from './recipe';
  import User from './user';  

  (async () => {
    const recipe = await Recipe.findOne({
      where: { userId: 2 },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['userId'] } },
      ],
    });
    console.log(recipe);
    process.exit(0);
  })();
  ~~~

  3. Execute o arquivo com o `ts-node`

  ~~~bash
  npx ts-node src/database/model/testModel.ts
  ~~~

  </details>

</details>