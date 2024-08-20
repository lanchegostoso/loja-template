import { Users } from "@prisma/client";

export function validateUserData(userData: Partial<Users>): string | null {

    for (const [key, value] of Object.entries(userData)) {
        if (value !== undefined && value !== null) {
            if (typeof value === 'string' && value.trim() === "") {
                return `${key} não pode estar vazio.`;
            }

            if (typeof value === 'string' && value.length > 100) {
                return `${key} não pode ultrapassar a quantidade de caracteres permitidos.`;
            }
        }
    }

    if (userData.cpf && !isValidCPF(userData.cpf)) {
        return "CPF inválido. Deve conter apenas números e ter 11 dígitos.";
    }

    if (userData.rg && !isValidRG(userData.rg)) {
        return "RG inválido. Deve conter apenas números e entre 8 e 11 dígitos.";
    }

    if (userData.telefone && !isValidTelefone(userData.telefone)) {
        return "Telefone inválido. Deve conter apenas números e entre 10 e 11 dígitos.";
    }

    if (userData.telefone_emergencia && !isValidTelefone(userData.telefone_emergencia)) {
        return "Telefone de Emergência inválido. Deve conter apenas números e entre 10 e 11 dígitos.";
    }

    if (userData.email && !isValidEmail(userData.email)) {
        return "Email inválido.";
    }

    if (userData.data_de_nascimento && !isValidBirthDate(userData.data_de_nascimento)) {
        return "Data de nascimento inválida. O usuário deve ter mais de 18 anos e menos de 99 anos.";
    }

    if (userData.password && !isValidPassword(userData.password)) {
        return "Senha inválida. Deve conter letras maiúsculas, minúsculas, números e ter no mínimo 8 caracteres.";
    }

    return null;
}


function isValidCPF(cpf: string): boolean {
    const cpfRegex = /^\d{11}$/;
    return cpfRegex.test(cpf);
}

function isValidRG(rg: string): boolean {
    const rgRegex = /^\d{8,11}$/;
    return rgRegex.test(rg);
}

function isValidTelefone(telefone: string): boolean {
    const telefoneRegex = /^\d{10,11}$/;
    return telefoneRegex.test(telefone);
}

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/;
    return emailRegex.test(email);
}

function isValidBirthDate(birthDate: string): boolean {
    const today = new Date();
    const userBirthDate = new Date(birthDate);
    const userAge = today.getFullYear() - userBirthDate.getFullYear();
    return userAge >= 18 && userAge < 99;
}

function isValidPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
}