/**
 * A <code>highlighter</code> is the main exported object of the library.
 */
export interface Highlighter {

    /**
     * Converts a string of code in some language into a string with that language's
     * tokens wrapped in spans for syntax highlighting.
     *
     * @param {Parser} parser The parser to use to break apart the code into tokens.
     * @param {string} code The code, as a string.
     * @return {string} The code, with tokens wrapped in spans.
     */
    highlight: (parser: Parser, code: string) => string;
}

/**
 * Converts strings of code into tokens for a programming language.
 */
export interface Parser {

    /**
     * Fetches the next token from the code passed in.
     *
     * @return {Token | null} The token, or <code>null</code> if the end of the string was reached.
     */
    nextToken(): Token | null;

    /**
     * Resets this parser to examine a new string of code.
     *
     * @param {string} code The code to examine.
     */
    reset(code: string): void;
}

/**
 * A token parsed out of code by a <code>Parser</code>.
 */
export interface Token {
    lexeme: string;
    type: TokenType;
}

type TokenType =
    'BOOLEAN' |
    'BRACKET' |
    'IDENTIFIER' |
    'NEWLINE' |
    'NULL' |
    'NUMBER' |
    'SEPARATOR' |
    'STRING' |
    'WHITESPACE';
