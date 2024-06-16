import { describe, expect, it } from 'vitest';
import highlighter from './highlighter';
import JsonParser from './parsers/json-parser';

describe('highlighter', () => {

    it('highlight() happy path, single line', () => {

        const parser: JsonParser = new JsonParser();
        const json: string = '{ value: 5 }';

        const code: string = highlighter.highlight(parser, json);
        expect(code).toEqual('<div class="jshl-line">' +
            '<span class="jshl-bracket">{</span>' +
            '<span class="jshl-whitespace"> </span>' +
            '<span class="jshl-identifier">value</span>' +
            '<span class="jshl-separator">:</span>' +
            '<span class="jshl-whitespace"> </span>' +
            '<span class="jshl-number">5</span>' +
            '<span class="jshl-whitespace"> </span>' +
            '<span class="jshl-bracket">}</span>' +
            '</div>');
    });

    it('highlight() happy path, multiple lines', () => {

        const parser: JsonParser = new JsonParser();
        const json: string = '{"a":"b",\n"c":"d"}';

        const code: string = highlighter.highlight(parser, json);
        expect(code).toEqual('<div class="jshl-line">' +
            '<span class="jshl-bracket">{</span>' +
            '<span class="jshl-string">"a"</span>' +
            '<span class="jshl-separator">:</span>' +
            '<span class="jshl-string">"b"</span>' +
            '<span class="jshl-separator">,</span>' +
            '</div>' +
            '<div class="jshl-line">' +
            '<span class="jshl-string">"c"</span>' +
            '<span class="jshl-separator">:</span>' +
            '<span class="jshl-string">"d"</span>' +
            '<span class="jshl-bracket">}</span>' +
            '</div>');
    });
});
