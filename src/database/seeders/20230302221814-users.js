'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
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
