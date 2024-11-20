import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import PartidasTitleCriar from './PartidasTitleCriar';
import "../../Style/AtletasView/CriarPartida.css";  // Referência ao CSS

function CriarPartida() {
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');
    const [local, setLocal] = useState('');
    const [timeMandanteNome, setTimeMandanteNome] = useState('');
    const [timeVisitanteNome, setTimeVisitanteNome] = useState('');
    const [jogadoresNomes, setJogadoresNomes] = useState([]);  // Agora é uma lista de nomes de jogadores
    const [scoutsIds, setScoutsIds] = useState([]);
    const [times, setTimes] = useState([]);  // Lista de times
    const [jogadores, setJogadores] = useState([]);  // Lista de jogadores
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Função para buscar os times
    useEffect(() => {
        axios.get('http://localhost:3000/times')  // Alterar para o endpoint correto
            .then((response) => {
                setTimes(response.data);  // Atualiza o estado com os times recebidos
            })
            .catch((error) => {
                console.error('Erro ao buscar os times', error);
                setError('Erro ao buscar os times.');
            });
    }, []);

    // Função para buscar os jogadores
    useEffect(() => {
        axios.get('http://localhost:3000/atletas')  // Alterar para o endpoint correto
            .then((response) => {
                setJogadores(response.data);  // Atualiza o estado com os jogadores recebidos
            })
            .catch((error) => {
                console.error('Erro ao buscar os jogadores', error);
                setError('Erro ao buscar os jogadores.');
            });
    }, []);

    // Função para encontrar o ID do time a partir do nome
    const getTimeIdByNome = (nome) => {
        const time = times.find(time => time.nome.toLowerCase() === nome.toLowerCase());
        return time ? time.id : null;
    };

    // Função para encontrar o ID do jogador a partir do nome
    const getJogadorIdByNome = (nome) => {
        const jogador = jogadores.find(jogador => jogador.nome.toLowerCase() === nome.toLowerCase());
        return jogador ? jogador.id : null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validação de campos obrigatórios
        if (!data || !hora || !local || !timeMandanteNome || !jogadoresNomes.length) {
            Swal.fire('Erro!', 'Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }

        // Certificar-se de que o campo 'timeVisitanteNome' seja opcional
        const timeMandanteId = getTimeIdByNome(timeMandanteNome);
        const timeVisitanteId = timeVisitanteNome ? getTimeIdByNome(timeVisitanteNome) : null;

        // Se o timeMandanteId não foi encontrado, mostra um alerta de erro
        if (!timeMandanteId) {
            Swal.fire('Erro!', 'Time mandante não encontrado. Verifique o nome digitado.', 'error');
            return;
        }

        // Convertendo os nomes dos jogadores para IDs
        const jogadoresIds = jogadoresNomes.map(nome => getJogadorIdByNome(nome)).filter(id => id !== null);

        if (jogadoresIds.length === 0) {
            Swal.fire('Erro!', 'Nenhum jogador encontrado. Verifique os nomes digitados.', 'error');
            return;
        }

        setLoading(true);

        axios
            .post('http://localhost:3000/partidas', {
                data,
                hora,
                local,
                timeMandanteId,
                timeVisitanteId,  // Pode ser null ou um número válido
                jogadoresIds,
                scoutsIds
            })
            .then((response) => {
                console.log('Partida criada com sucesso!', response);
                Swal.fire('Sucesso!', 'A partida foi criada com sucesso!', 'success');
                navigate('/partidas');
            })
            .catch((error) => {
                setLoading(false);
                setError('Erro ao criar a partida.');

                if (error.response && error.response.status === 400) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro!',
                        text: error.response.data.error || 'Dados inválidos',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro!',
                        text: error.response ? error.response.data.error : 'Não foi possível criar a partida.',
                    });
                }
            });
    };

    return (
        <div className="criar-partidaPJ">
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <div className="sub-main-content">
                    <PartidasTitleCriar />
                    <section className="sectionAD clube-infoAD">
                        <form className="formularioPj" onSubmit={handleSubmit}>
                            <div>
                                <label>Data:</label>
                                <input 
                                    className="inputPJ" 
                                    type="date" 
                                    value={data} 
                                    onChange={(e) => setData(e.target.value)} 
                                />
                            </div>
                            <div>
                                <label>Hora:</label>
                                <input 
                                    className="inputPJ" 
                                    type="time" 
                                    value={hora} 
                                    onChange={(e) => setHora(e.target.value)} 
                                />
                            </div>
                            <div>
                                <label>Local:</label>
                                <input 
                                    className="inputPJ" 
                                    type="text" 
                                    value={local} 
                                    onChange={(e) => setLocal(e.target.value)} 
                                />
                            </div>
                            <div>
                                <label>Time Mandante:</label>
                                <input
                                    className="inputPJ"
                                    type="text"
                                    placeholder="Digite o nome do time mandante"
                                    value={timeMandanteNome}
                                    onChange={(e) => setTimeMandanteNome(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Time Visitante (opcional):</label>
                                <input
                                    className="inputPJ"
                                    type="text"
                                    placeholder="Digite o nome do time visitante (opcional)"
                                    value={timeVisitanteNome}
                                    onChange={(e) => setTimeVisitanteNome(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Jogadores (nomes separados por vírgula):</label>
                                <input 
                                    className="inputPJ" 
                                    type="text" 
                                    value={jogadoresNomes} 
                                    onChange={(e) => setJogadoresNomes(e.target.value.split(','))} 
                                    placeholder="Digite os nomes dos jogadores separados por vírgula"
                                />
                            </div>
                            <div>
                                <label>Scouts (IDs separados por vírgula):</label>
                                <input 
                                    className="inputPJ" 
                                    type="text" 
                                    value={scoutsIds} 
                                    onChange={(e) => setScoutsIds(e.target.value.split(','))} 
                                />
                            </div>

                            <div className="buttons-container">
                                <button 
                                    className="botao-submitPJ" 
                                    type="submit" 
                                    disabled={loading}
                                >
                                    {loading ? 'Criando...' : 'Criar Partida'}
                                </button>
                                <button 
                                    className="back-buttonPJ" 
                                    onClick={() => navigate('/partidas')}
                                >
                                    Voltar
                                </button>
                            </div>
                        </form>
                    </section>
                    <div className="button-containerPJ"></div>
                </div>
            </div>
        </div>
    );
}

export default CriarPartida;
