import { Parser, Token, TokenType } from '../index';

export default class JsonParser implements Parser {

    private code: string;
    private index: number;
    private buf: string;
    private readonly keywordMap: { [ key: string ]: TokenType };

    constructor() {

        this.reset('');

        this.keywordMap = {
            'true': 'BOOLEAN',
            'false': 'BOOLEAN',
            'null': 'NULL'
        };
    }

    private determineOtherTokenType(lexeme: string): TokenType {
        const tokenType: TokenType | undefined = this.keywordMap[lexeme];
        return tokenType ?? 'IDENTIFIER';
    }

    private getOtherToken(firstChar: string): Token {

        this.buf = firstChar;

        while (this.index < this.code.length) {

            const ch: string = this.code.charAt(this.index++);

            if (ch === '"' ||
                    JsonParser.isWhitespaceChar(ch) ||
                    JsonParser.isBracket(ch) ||
                    JsonParser.isSeparatorChar(ch)) {
                this.index--;
                break;
            }

            this.buf += ch;
        }

        return { lexeme: this.buf, type: this.determineOtherTokenType(this.buf) };
    }

    private getStringLexeme(): string {

        let prevEscape: boolean = false;

        this.buf += '"'; // Previously read in

        while (this.index < this.code.length) {

            const ch: string = this.code.charAt(this.index++);

            switch (ch) {

                case '"':
                    this.buf += ch;
                    if (!prevEscape) {
                        return this.buf;
                    }
                    prevEscape = false;
                    break;

                case '\\':
                    prevEscape = true;
                    break;

                default:
                    if (prevEscape) {
                        this.buf += '\\';
                    }
                    this.buf += ch;
                    prevEscape = false;
                    break;
            }
        }

        // Technically invalid - input ended with an unterminated string ending with '\'
        if (prevEscape) {
            this.buf += '\\';
        }
        return this.buf;
    }

    private static isBracket(ch: string): boolean {
        return ch === '[' ||
            ch === '{' ||
            ch === ']' ||
            ch === '}';
    }

    private static isNewlineChar(ch: string): boolean {
        return ch === '\r' || ch === '\n';
    }

    private static isNumberChar(ch: string): boolean {
        return (ch >= '0' && ch <= '9') || ch === '-' || ch === '.' || ch === 'e' || ch === 'E';
    }

    private static isNumberStartChar(ch: string): boolean {
        return (ch >= '0' && ch <= '9') || ch === '-';
    }

    private static isSeparatorChar(ch: string): boolean {
        return ch === ':' || ch === ',';
    }

    private static isWhitespaceChar(ch: string): boolean {
        return ch === ' ' || ch === '\t' || ch === '\f';
    }

    nextToken(): Token | null {

        if (this.index >= this.code.length) {
            return null;
        }

        this.buf = '';
        let ch: string = this.code.charAt(this.index++);

        if (JsonParser.isBracket(ch)) {
            return { lexeme: ch, type: 'BRACKET' };
        }

        else if (JsonParser.isNewlineChar(ch)) {
            this.buf = ch;
            while (this.index < this.code.length && this.buf[this.buf.length - 1] !== '\n') {
                ch = this.code.charAt(this.index);
                if (JsonParser.isNewlineChar(ch)) {
                    this.buf += ch;
                    this.index++;
                }
                else {
                    break;
                }
            }
            return { lexeme: this.buf, type: 'NEWLINE' };
        }

        else if (JsonParser.isWhitespaceChar(ch)) {

            this.buf += ch;

            while (this.index < this.code.length) {
                ch = this.code.charAt(this.index);
                if (JsonParser.isWhitespaceChar(ch)) {
                    this.buf += ch;
                    this.index++;
                }
                else {
                    break;
                }
            }
            return { lexeme: this.buf, type: 'WHITESPACE' };
        }

        else if (ch === '"') {
            return { lexeme: this.getStringLexeme(), type: 'STRING' };
        }

        else if (JsonParser.isNumberStartChar(ch)) {

            this.buf += ch;

            while (this.index < this.code.length) {
                ch = this.code.charAt(this.index);
                if (JsonParser.isNumberChar(ch)) {
                    this.buf += ch;
                    this.index++;
                }
                else {
                    break;
                }
            }
            return { lexeme: this.buf, type: 'NUMBER' };
        }

        else if (JsonParser.isSeparatorChar(ch)) {
            return { lexeme: ch, type: 'SEPARATOR' };
        }

        return this.getOtherToken(ch);
    }

    reset(code: string) {
        this.code = code;
        this.index = 0;
        this.buf = '';
    }
}
