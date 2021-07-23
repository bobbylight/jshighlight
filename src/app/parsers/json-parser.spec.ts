import JsonParser from './json-parser';
import { Token, TokenType } from '../index';

const assertNextToken: (token: Token | null, lexeme: string, type: TokenType) => void =
        (token: Token, lexeme: string, type: TokenType) => {
    expect(token).toBeDefined();
    expect(token.lexeme).toEqual(lexeme);
    expect(token.type).toEqual(type);
};

describe('json-parser', () => {

    it('parser() happy path, all token types', () => {

        const parser: JsonParser = new JsonParser();
        const json: string = '{ number: 5, boolean: true, boolean2: false, string: "hello", nullValue: null }';

        parser.reset(json);

        assertNextToken(parser.nextToken(), '{', 'BRACKET');
        assertNextToken(parser.nextToken(), ' ', 'WHITESPACE');

        assertNextToken(parser.nextToken(), 'number', 'IDENTIFIER');
        assertNextToken(parser.nextToken(), ':', 'SEPARATOR');
        assertNextToken(parser.nextToken(), ' ', 'WHITESPACE');
        assertNextToken(parser.nextToken(), '5', 'NUMBER');
        assertNextToken(parser.nextToken(), ',', 'SEPARATOR');
        assertNextToken(parser.nextToken(), ' ', 'WHITESPACE');

        assertNextToken(parser.nextToken(), 'boolean', 'IDENTIFIER');
        assertNextToken(parser.nextToken(), ':', 'SEPARATOR');
        assertNextToken(parser.nextToken(), ' ', 'WHITESPACE');
        assertNextToken(parser.nextToken(), 'true', 'BOOLEAN');
        assertNextToken(parser.nextToken(), ',', 'SEPARATOR');
        assertNextToken(parser.nextToken(), ' ', 'WHITESPACE');

        assertNextToken(parser.nextToken(), 'boolean2', 'IDENTIFIER');
        assertNextToken(parser.nextToken(), ':', 'SEPARATOR');
        assertNextToken(parser.nextToken(), ' ', 'WHITESPACE');
        assertNextToken(parser.nextToken(), 'false', 'BOOLEAN');
        assertNextToken(parser.nextToken(), ',', 'SEPARATOR');
        assertNextToken(parser.nextToken(), ' ', 'WHITESPACE');

        assertNextToken(parser.nextToken(), 'string', 'IDENTIFIER');
        assertNextToken(parser.nextToken(), ':', 'SEPARATOR');
        assertNextToken(parser.nextToken(), ' ', 'WHITESPACE');
        assertNextToken(parser.nextToken(), '"hello"', 'STRING');
        assertNextToken(parser.nextToken(), ',', 'SEPARATOR');
        assertNextToken(parser.nextToken(), ' ', 'WHITESPACE');

        assertNextToken(parser.nextToken(), 'nullValue', 'IDENTIFIER');
        assertNextToken(parser.nextToken(), ':', 'SEPARATOR');
        assertNextToken(parser.nextToken(), ' ', 'WHITESPACE');
        assertNextToken(parser.nextToken(), 'null', 'NULL');
        assertNextToken(parser.nextToken(), ' ', 'WHITESPACE');

        assertNextToken(parser.nextToken(), '}', 'BRACKET');
        expect(parser.nextToken()).toBeNull();
    });

    it('strings should support escaped double quotes', () => {

        const parser: JsonParser = new JsonParser();
        const json: string = '"His name is \\"Ted\\"';
        parser.reset(json);

        assertNextToken(parser.nextToken(), '"His name is \"Ted\"', 'STRING');
    });

    it('strings should support escaped random chars', () => {

        const parser: JsonParser = new JsonParser();
        const json: string = '"His name is \\Ted"';
        parser.reset(json);

        assertNextToken(parser.nextToken(), '"His name is \\Ted"', 'STRING');
    });

    it('strings unterminated and ending with \\ are rendered as best as possible', () => {

        const parser: JsonParser = new JsonParser();
        const json: string = '"His name is \\';
        parser.reset(json);

        assertNextToken(parser.nextToken(), '"His name is \\', 'STRING');
    });

    it('numbers can be negative', () => {

        const parser: JsonParser = new JsonParser();
        const json: string = '-42';
        parser.reset(json);

        assertNextToken(parser.nextToken(), '-42', 'NUMBER');
    });

    it('numbers can have decimal places', () => {

        const parser: JsonParser = new JsonParser();
        const json: string = '17.152';
        parser.reset(json);

        assertNextToken(parser.nextToken(), '17.152', 'NUMBER');
    });

    it('multiple adjacent whitespace chars are one token', () => {

        const parser: JsonParser = new JsonParser();
        const json: string = '     \t   ';
        parser.reset(json);

        assertNextToken(parser.nextToken(), '     \t   ', 'WHITESPACE');
    });

    it('CRLF is recognized as a single newline token', () => {

        const parser: JsonParser = new JsonParser();
        const json: string = '\r\n';
        parser.reset(json);

        assertNextToken(parser.nextToken(), '\r\n', 'NEWLINE');
    });

    it('LF is recognized as a newline token', () => {

        const parser: JsonParser = new JsonParser();
        const json: string = '\n';
        parser.reset(json);

        assertNextToken(parser.nextToken(), '\n', 'NEWLINE');
    });

    it("CRCRLF is recognized as a newline token (multiple CR's coerced into one)", () => {

        const parser: JsonParser = new JsonParser();
        const json: string = '\r\r\n';
        parser.reset(json);

        assertNextToken(parser.nextToken(), '\r\r\n', 'NEWLINE');
    });

    it('LFLF is recognized as two separate newlines', () => {

        const parser: JsonParser = new JsonParser();
        const json: string = '\n\n';
        parser.reset(json);

        assertNextToken(parser.nextToken(), '\n', 'NEWLINE');
        assertNextToken(parser.nextToken(), '\n', 'NEWLINE');
    });

    it('properly transitions from non-LF line ending to next token', () => {

        const parser: JsonParser = new JsonParser();
        const json: string = '\r{';
        parser.reset(json);

        assertNextToken(parser.nextToken(), '\r', 'NEWLINE');
        assertNextToken(parser.nextToken(), '{', 'BRACKET');
    });
});
