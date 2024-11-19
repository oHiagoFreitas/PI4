import React from 'react';
import { Link } from 'react-router-dom'; // Para criar links de navegação
import '../../Style/UsuariosTable.css'; // Importando o CSS da tabela

// Componente da Tabela de Usuários
function TabelaUsuarios({ usuarios, handleEdit, handleDelete }) {
    return (
        <div className="usuarios-table-containerAAT"> {/* Contêiner da tabela */}
            {/* Tabela com dados dos usuários */}
            <table className="usuarios-tableAAT table table-striped">
                <thead>
                    <tr>
                        <th>Data de Criação</th>
                        
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Ultima Edição</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.length > 0 ? (
                        usuarios.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>{new Date(usuario.createdAt).toLocaleDateString()}</td>
                                <td>{usuario.nome}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.role}</td>
                                <td>{usuario.status}</td>
                                <td>{new Date(usuario.updatedAt).toLocaleDateString()}</td>
                                <td>
                                    {/* Botão para visualizar */}
                                    <Link to={`/utilizadores/detalhes/${usuario.id}`} className="action-buttonAAT dashboard-link">
                                        <i className="bi bi-eye" title="Ver"></i>
                                    </Link>

                                    {/* Botão para editar */}
                                    <button
                                        className="action-buttonAAT"
                                        onClick={() => handleEdit(usuario)}
                                    >
                                        <i className="bi bi-pencil" title="Editar"></i>
                                    </button>

                                    {/* Botão para apagar */}
                                    <button
                                        className="action-buttonAAT"
                                        onClick={() => handleDelete(usuario.id)}
                                    >
                                        <i className="bi bi-trash" title="Apagar"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="loading-messageAAT">Carregando usuários...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default TabelaUsuarios;
