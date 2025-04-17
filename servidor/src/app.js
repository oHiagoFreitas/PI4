const express = require('express');
const cors = require('cors'); // Importa o pacote CORS
const app = express();
const sequelize = require('./database'); // Ajuste o caminho conforme necessário

// Importação de rotas
const utilizadoresRoutes = require('./routes/utilizadoresRoutes');
const timeRoutes = require('./routes/timeRoutes');
const atletaRoutes = require('./routes/atletaRoutes');
const scoutAtletaRoutes = require('./routes/scoutAtletaRoutes');
const relatorioRoutes = require('./routes/relatorioRoutes');
const authRoute = require('./routes/authRoutes');
const equipeSombraRoutes = require('./routes/equipeSombraRoutes');
const formacaoRoutes = require('./routes/formacaoRoutes');
const atletasEquipeSombraRoutes = require('./routes/atletasEquipeSombraRoutes');
const partidaRoutes = require('./routes/partidaRoutes');
const PendentesRoute = require('./routes/PendentesRoute');
const Microsite = require('./routes/MicroSiteRoutes');
const equipePrincipalRoutes = require('./routes/equipePrincipalRoutes');
const Notificacoes = require('./routes/NotificacoesRoute');

// Configurações
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json()); // Habilita o middleware para processar JSON


// ✅ CORS corrigido para aceitar o frontend
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type', 'Accept'],
};

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
app.use('/Microsite', Microsite);
app.use('/Notificacao', Notificacoes);

// Importar o modelo Formacao e chamar a função initDefaultFormacoes
const Formacao = require('./models/Formacao');
const MicrositeModel = require('./models/MicroSite');

// Sincroniza os modelos com o banco de dados
sequelize.sync()
    .then(async () => {
        console.log('Tabelas sincronizadas com o banco de dados.');

        // Inicializa as formações padrão
        await Formacao.initDefaultFormacoes();
        console.log('Formações padrão verificadas e criadas, se necessário.');
        await MicrositeModel.initDefaultMicrosite();
        console.log('Microsite padrão verificado e criado, se necessário.');
    })
    .catch((error) => {
        console.error('Erro ao sincronizar as tabelas:', error);
    });

// Iniciar o servidor
app.listen(app.get('port'), () => {
    console.log("Servidor iniciado na porta " + app.get('port'));
});
