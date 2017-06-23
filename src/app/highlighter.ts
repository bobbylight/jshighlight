import {Highlighter, Parser, Token} from './index';

const highlighter: Highlighter = {

    highlight: (parser: Parser, code: string): string => {

        let markup: string = '';

        parser.reset(code);

        let token: Token | null;

        while ((token = parser.nextToken()) != null) {
            const className: string = `jshl-${token.type.toLowerCase()}`;
            markup += `<span class="${className}">${token.lexeme}</span>`;
        }

        return markup;
    }

};

export default highlighter;
