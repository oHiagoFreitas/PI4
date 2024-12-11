import React from 'react';
import '../../Style/AtletasView/AtletasFilters.css';

function UserFilters({ filterName, filterRole, filterEmail, onFilterNameChange, onFilterRoleChange, onFilterEmailChange }) {
    return (
        <div className="filters-containerAT">
            {/* Filtro por nome do usuário */}
            <input
                type="text"
                className="filter-inputAT"
                placeholder="Buscar por nome..."
                value={filterName}
                onChange={(e) => onFilterNameChange(e.target.value)}
            />
            {/* Filtro por email do usuário */}

            <input
                type="email"
                className="filter-inputAT"
                placeholder="Buscar por email..."
                value={filterEmail}
                onChange={(e) => onFilterEmailChange(e.target.value)}
            />

            {/* Filtro por role do usuário */}
            <select
                className="filter-selectAT"
                value={filterRole}
                onChange={(e) => onFilterRoleChange(e.target.value)}
            >
                <option value="">Todos os roles</option>
                <option value="admin">Admin</option>
                <option value="scout">Scout</option>
                <option value="consultor">Consultor</option>
            </select>



        </div>
    );
}

export default UserFilters;
