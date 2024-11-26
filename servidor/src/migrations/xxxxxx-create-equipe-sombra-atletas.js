// src/migrations/xxxxxx-create-equipe-sombra-atletas.js

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('EquipeSombraAtletas', {
            equipeSombraId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'EquipeSombra',
                    key: 'id'
                },
                onDelete: 'CASCADE',
                allowNull: false
            },
            atletumId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Atleta',
                    key: 'id'
                },
                onDelete: 'CASCADE',
                allowNull: false
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('EquipeSombraAtletas');
    }
};
