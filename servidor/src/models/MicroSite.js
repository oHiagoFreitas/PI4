const Sequelize = require('sequelize');
const sequelize = require('../database'); // Ajuste o caminho conforme necessário

const Microsite = sequelize.define('microsite', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false, // Não permite que o campo fique vazio
    },
    mensagem: {
        type: Sequelize.TEXT, // Campo para mensagens mais longas
        allowNull: false, // Não permite que o campo fique vazio
    },
}, {
    timestamps: true, // Inclui os campos createdAt e updatedAt
});

// Método para criar o microsite com valores padrão, caso não exista
Microsite.initDefaultMicrosite = async () => {
    const [microsite, created] = await Microsite.findOrCreate({
        where: { titulo: 'Viriatus Scouting' }, // Busca por título único
        defaults: {
            titulo: 'Viriatus Scouting', // Título padrão
            mensagem: 'Bem-vindo', // Mensagem padrão
        },
    });

    if (created) {
        console.log('Microsite criado com sucesso!');
    } else {
        console.log('Microsite já existe.');
    }
};

module.exports = Microsite;
