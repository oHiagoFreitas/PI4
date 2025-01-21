import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../Style/CreateAthleteModal.css'; // Importando o CSS dos modais

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '350px', // Ajuste a largura do modal para um tamanho menor
        padding: '15px', // Reduzindo o padding
    },
};

const CreateAthleteModal = ({ isOpen, onRequestClose }) => {
    const [formData, setFormData] = useState({
        nome: '',
        dataNascimento: '',
        ano: '',  // O ano será atualizado automaticamente com base na data de nascimento
        nacionalidade: '',
        posicao: '',
        clube: '',
        link: '',
        agente: '',
        contactoAgente: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar a submissão do formulário

    // Atualiza o campo 'ano' com o ano extraído da 'dataNascimento'
    useEffect(() => {
        if (formData.dataNascimento) {
            const anoNascimento = new Date(formData.dataNascimento).getFullYear();
            setFormData((prevData) => ({
                ...prevData,
                ano: anoNascimento,
            }));
        }
    }, [formData.dataNascimento]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Inicia o estado de submissão
        try {
            const response = await axios.post('https://pi4-hdnd.onrender.com/atletas/createAtletaAprovado', formData);
            console.log('Atleta criado:', response.data);

            // Enviar notificação após a criação do atleta
            const userId = localStorage.getItem('userId'); // Aqui você acessa o ID do usuário logado (pode ser o responsável pela criação)
            
            if (!userId) {
                throw new Error('Usuário não encontrado');
            }

            await axios.post('https://pi4-hdnd.onrender.com/Notificacao', {
                conteudo: `Um novo atleta foi criado: ${formData.nome}.`,
                tipo: 'Criação',
                remetenteId: userId,  // O ID do remetente pode ser o ID do usuário logado
                destinatarioId: 1,  // Este valor deve ser o ID do destinatário (ex: administrador ou responsável pela gestão de atletas)
            });

            // Alerta de sucesso
            Swal.fire({
                icon: 'success',
                title: 'Atleta Criado!',
                text: 'O atleta foi criado com sucesso.',
                confirmButtonText: 'Ok'
            });

            onRequestClose(); // Fecha o modal
            setFormData({
                nome: '',
                dataNascimento: '',
                ano: '',
                nacionalidade: '',
                posicao: '',
                clube: '',
                link: '',
                agente: '',
                contactoAgente: '',
            });
        } catch (error) {
            console.error('Erro ao criar atleta:', error);
            
            // Alerta de erro
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Ocorreu um erro ao criar o atleta. Por favor, tente novamente.',
                confirmButtonText: 'Ok'
            });
        } finally {
            setIsSubmitting(false); // Finaliza o estado de submissão
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Criar Atleta"
        >
            <h2 className="modal-title">Criar Atleta</h2>
            <form onSubmit={handleSubmit} className="modal-content">
                <div className="form-group">
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nacionalidade">Nacionalidade:</label>
                    <input
                        type="text"
                        id="nacionalidade"
                        name="nacionalidade"
                        value={formData.nacionalidade}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dataNascimento">Data de Nascimento:</label>
                    <input
                        type="date"
                        id="dataNascimento"
                        name="dataNascimento"
                        value={formData.dataNascimento}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="posicao">Posição:</label>
                    <select
                        id="posicao"
                        name="posicao"
                        value={formData.posicao}
                        onChange={handleChange}
                        required
                        className="form-input"
                    >
                        <option value="">Selecione uma posição</option>
                        <option value="Guarda-Redes">Guarda-Redes</option>
                        <option value="Defesa Central">Defesa Central</option>
                        <option value="Defesa Esquerda">Defesa Esquerda</option>
                        <option value="Defesa Direita">Defesa Direita</option>
                        <option value="Médio">Médio</option>
                        <option value="Atacante">Atacante</option>
                        <option value="Universal">Universal</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="clube">Clube:</label>
                    <input
                        type="text"
                        id="clube"
                        name="clube"
                        value={formData.clube}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="link">Link:</label>
                    <input
                        type="text"
                        id="link"
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="agente">Agente:</label>
                    <input
                        type="text"
                        id="agente"
                        name="agente"
                        value={formData.agente}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="contactoAgente">Contacto do Agente:</label>
                    <input
                        type="text"
                        id="contactoAgente"
                        name="contactoAgente"
                        value={formData.contactoAgente}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <button type="submit" className="submit-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Criando...' : 'Criar Atleta'}
                </button>
            </form>
        </Modal>
    );
};

export default CreateAthleteModal;
