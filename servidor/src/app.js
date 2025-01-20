const express = require('express');
const cors = require('cors'); // Importa o pacote CORS
const app = express();
const sequelize = require('./database'); // Ajuste o caminho conforme necessário
const Microsite = require('./models/Microsite'); // Certifique-se de ajustar o caminho para o seu modelo

// Importação de rotas
const utilizadoresRoutes = require('./routes/utilizadoresRoutes'); // Ajuste o caminho conforme necessário
const timeRoutes = require('./routes/timeRoutes'); // Ajuste o caminho conforme necessário
const atletaRoutes = require('./routes/atletaRoutes'); // Ajuste o caminho conforme necessário
const scoutAtletaRoutes = require('./routes/scoutAtletaRoutes'); // Rota de associações entre scout e atleta
const relatorioRoutes = require('./routes/relatorioRoutes'); // Rota de relatórios
const authRoute = require('./routes/authRoutes'); // Rota de login
const equipeSombraRoutes = require('./routes/equipeSombraRoutes'); // Rota de equipes sombra
const formacaoRoutes = require('./routes/formacaoRoutes'); // Rota de formações
const atletasEquipeSombraRoutes = require('./routes/atletasEquipeSombraRoutes'); // Ajuste o caminho conforme necessário
const partidaRoutes = require('./routes/partidaRoutes'); // Ajuste o caminho conforme necessário
const PendentesRoute = require('./routes/PendentesRoute'); // Ajuste o caminho conforme necessário
const equipePrincipalRoutes = require('./routes/equipePrincipalRoutes'); // Rota de equipes Principal
const Notificacoes = require('./routes/NotificacoesRoute'); // Rota de notificações

// Configurações
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json()); // Habilita o middleware para processar JSON

// Configuração do CORS
const corsOptions = {
    origin: 'http://localhost:3001', // Permite apenas o frontend da porta 3001
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Permite os métodos HTTP necessários
    allowedHeaders: ['Authorization', 'Content-Type', 'Accept', 'Access-Control-Allow-Request-Method'],
};

// Habilita o CORS com as opções definidas
app.use(cors(corsOptions));

// Responder a requisições de preflight (OPTIONS)
app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        return res.status(200).end(); // Responde com status 200 para requisições OPTIONS
    }
    next(); // Continua com o processamento da requisição para outros métodos
});

// Usar as rotas
app.use('/utilizadores', utilizadoresRoutes);
app.use('/times', timeRoutes);
app.use('/atletas', atletaRoutes);
app.use('/scoutsAtletas', scoutAtletaRoutes);
app.use('/relatorios', relatorioRoutes);
app.use('/auth', authRoute);
app.use('/equipeSombra', equipeSombraRoutes);
app.use('/equipePrincipal', equipePrincipalRoutes);
app.use('/formacao', formacaoRoutes);
app.use('/atletasEquipeSombra', atletasEquipeSombraRoutes);
app.use('/partidas', partidaRoutes);
app.use('/pendentes', PendentesRoute);
app.use('/Notificacao', Notificacoes);

// Sincroniza os modelos com o banco de dados e cria uma entrada padrão no Microsite
sequelize.sync({ alter: true }) // Use alter para evitar recriações desnecessárias
    .then(async () => {
        console.log('Tabelas sincronizadas com o banco de dados.');

        // Verifica se já existe uma entrada no Microsite
        const count = await Microsite.count();
        if (count === 0) {
            // Cria uma linha padrão no Microsite
            await Microsite.create({
                titulo: 'Viriatus Scouting',
                mensagem: 'Bem-vindo ao Viriatus Scouting, onde encontramos talentos únicos!',
            });
            console.log('Linha padrão no Microsite criada com sucesso.');
        } else {
            console.log('Microsite já contém registros. Nenhuma ação necessária.');
        }
    })
    .catch((error) => {
        console.error('Erro ao sincronizar as tabelas:', error);
    });

// Iniciar o servidor
app.listen(app.get('port'), () => {
    console.log("Servidor iniciado na porta " + app.get('port'));
});
