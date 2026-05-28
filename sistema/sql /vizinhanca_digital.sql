CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR(200) NOT NULL,
    perfil VARCHAR(20) CHECK (perfil IN ('voluntário', 'líder')) NOT NULL,
    token_recuperacao VARCHAR(200), 
    data_token TIMESTAMP            
);

CREATE TABLE prioridades (
    id_prioridade SERIAL PRIMARY KEY,
    nivel VARCHAR(20) CHECK (nivel IN ('alta', 'média', 'baixa')) NOT NULL,
    cor VARCHAR(20) CHECK (cor IN ('vermelho', 'amarelo', 'verde')) NOT NULL
);

CREATE TABLE acao_comunitaria (
    id_acao SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT NOT NULL,
    data DATE NOT NULL,
    local VARCHAR(150) NOT NULL,
    categoria VARCHAR(50), -- campo extra para organização temática
    limite_vagas INT CHECK (limite_vagas >= 0), -- campo extra para controle de vagas
    id_prioridade INT NOT NULL,
    id_lider INT NOT NULL,
    FOREIGN KEY (id_prioridade) REFERENCES prioridades(id_prioridade),
    FOREIGN KEY (id_lider) REFERENCES usuarios(id_usuario)
);

CREATE TABLE inscricoes (
    id_inscricao SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_acao INT NOT NULL,
    status VARCHAR(20) CHECK (status IN ('ativa', 'cancelada', 'concluída')) NOT NULL,
    data_inscricao DATE NOT NULL DEFAULT CURRENT_DATE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_acao) REFERENCES acao_comunitaria(id_acao),
    UNIQUE (id_usuario, id_acao) -- evita inscrições duplicadas
);

CREATE TABLE calendario (
    id_evento SERIAL PRIMARY KEY,
    id_acao INT NOT NULL,
    data_evento DATE NOT NULL,
    status_evento VARCHAR(20) CHECK (status_evento IN ('ativo', 'cancelado')) NOT NULL,
    FOREIGN KEY (id_acao) REFERENCES acao_comunitaria(id_acao)
);

CREATE TABLE relatorios (
    id_relatorio SERIAL PRIMARY KEY,
    id_acao INT NOT NULL,
    total_inscritos INT DEFAULT 0,
    total_presentes INT DEFAULT 0,
    taxa_presenca DECIMAL(5,2),
    prioridade VARCHAR(20), 
    data_geracao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_acao) REFERENCES acao_comunitaria(id_acao)
);

CREATE VIEW painel_inscricoes AS
SELECT 
    a.id_acao,
    a.titulo,
    u.nome AS voluntario,
    u.email,
    i.status,
    i.data_inscricao
FROM inscricoes i
JOIN usuarios u ON i.id_usuario = u.id_usuario
JOIN acao_comunitaria a ON i.id_acao = a.id_acao;
