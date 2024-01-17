import type { Printer, Parser } from "prettier";

type HtmlNode = {
  namespace: string;
  isSelfClosing: boolean;
  tagDefinition?: {
    isVoid: boolean;
  };
  isLeadingSpaceSensitive?: boolean;
  hasLeadingSpaces?: boolean;
};

export declare const parsers: {
  html: Parser<HtmlNode>;
};

// Prettier says printers shouldn't be used alone, but
// that's a big part of how this plugin works.
// https://github.com/prettier/prettier/blob/b86701dd1df5852f5024d322a17c9fb7ef97850c/scripts/build/build-types.js#L40
//
// Anyway, that's why I am patching the module's types--this
// is the missing type for the printers that are, in fact,
// available from the HTML plugin.
export declare const printers: {
  html: Printer<HtmlNode>;
};
