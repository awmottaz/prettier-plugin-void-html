import prettierParserHtml from "prettier/parser-html";

/** @type{import('prettier').Plugin['languages'] */
export const languages = [
  {
    name: "HTML5",
    extensions: [".html"],
    parsers: ["html"],
    vscodeLanguageIds: ["html"],
  },
];

/** @type{import('prettier').Plugin['parsers'] */
export const parsers = {
  html: {
    ...prettierParserHtml.parsers.html,
    astFormat: "html",
  },
};

/** @type{import('prettier').Plugin['printers'] */
export const printers = {
  html: {
    ...prettierParserHtml.printers.html,
    print(path, options, print) {
      const { node } = path;

      // Self-closing syntax is allowed in SVG and MathML.
      if (!["svg", "math"].includes(node.namespace)) {
        node.isSelfClosing = false;
      }

      if (!node?.tagDefinition?.isVoid) {
        // Not a void tag, use the default printer.
        return prettierParserHtml.printers.html.print(path, options, print);
      }

      // Then pass it along to the default printer. Since it is no
      // longer marked as self-closing, the printer will give it a
      // closing tag. For example, `<input>` will become `<input></input>`.
      const printed = prettierParserHtml.printers.html.print(
        path,
        options,
        print,
      );

      // The last item in the contents is the new closing tag.
      // Remove it.
      printed.contents.pop();

      return printed;
    },
  },
};
