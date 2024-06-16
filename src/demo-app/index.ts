import highlighter from '../app/highlighter';
import JsonParser from '../app/parsers/json-parser';
import { Parser } from '../app';

import '../styles/jshl-default.css';

const textArea: HTMLTextAreaElement = document.getElementById('input') as HTMLTextAreaElement;

const update: EventListener = () => {
    const json: string = textArea.value;
    const parser: Parser = new JsonParser();
    const codeElem = document.getElementById('beautified') as HTMLPreElement;
    codeElem.innerHTML = highlighter.highlight(parser, json);
};

update(null as unknown as Event);
textArea.addEventListener('input', update);
