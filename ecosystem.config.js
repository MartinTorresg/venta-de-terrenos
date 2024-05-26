


module.exports = {
  apps: [
    {
      name: 'backend',
      script: './backend/index.js',
      env: {
        NODE_ENV: 'production',
        MONGODB_URI: 'mongodb+srv://mtorresg:Timmy123asd@terrenos-isabel.s01umto.mongodb.net/terrenos_mama?retryWrites=true&w=majority&appName=Terrenos-Isabel',
        PORT: 3000,
	JWT_SECRET: 'CLAVE_SECRETA_del_proyecto_terrenos_181197'
      },
    },
    {
      name: 'frontend',
      script: './node_modules/.bin/serve',
      args: '-s build -l 3001',
      cwd: './frontend',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
