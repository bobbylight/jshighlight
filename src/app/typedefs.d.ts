export interface Parser {

    nextToken(): Token | null;
    reset(code: string): void;
}

export interface Token {

    lexeme: string;
    type: TokenType;
}

type TokenType =
    'BOOLEAN' |
    'BRACKET' |
    'IDENTIFIER' |
    'NULL' |
    'NUMBER' |
    'SEPARATOR' |
    'STRING' |
    'WHITESPACE';
