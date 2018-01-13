import highlighter from '../app/highlighter';
import JsonParser from '../app/parsers/json-parser';
import { Parser } from '../app/index';

import '../styles/jshl-default.css';

const textArea: HTMLTextAreaElement = document.getElementById('input')! as HTMLTextAreaElement;

const update: EventListener = () => {

    const json: string = textArea.value;

    const parser: Parser = new JsonParser();
    document.getElementById('beautified')!.innerHTML = highlighter.highlight(parser, json);
};

update(null as any);
textArea.addEventListener('input', update);
