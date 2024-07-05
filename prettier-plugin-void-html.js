import {
  parsers as prettierHtmlParsers,
  printers as prettierHtmlPrinters,
} from "prettier/plugins/html";

/** @typedef  {import("prettier/plugins/html").HtmlNode} HtmlNode*/

/** @type{import('prettier').SupportLanguage[]} */
export const languages = [
  {
    name: "HTML5",
    extensions: [".html"],
    parsers: ["html"],
    vscodeLanguageIds: ["html"],
  },
];

/** @type{import('prettier').Parser<HtmlNode>} */
const htmlParser = {
  ...prettierHtmlParsers.html,
  astFormat: "html",
};

/** @type {import('prettier').Plugin['parsers']} */
export const parsers = {
  html: htmlParser,
};

/**
 *
 * @param {import('prettier/doc.js').builders.Doc} doc
 * @returns {doc is import('prettier/doc.js').builders.Group}
 */
function isGroup(doc) {
  return typeof doc === "object" && "type" in doc && doc.type === "group";
}

/** @type {import('prettier').Printer<HtmlNode>} */
const htmlPrinter = {
  ...prettierHtmlPrinters.html,
  print(path, options, print) {
    const node = path.node;

    // Self-closing syntax is allowed in SVG and MathML.
    if (!["svg", "math"].includes(node.namespace)) {
      node.isSelfClosing = false;
    }

    if (!node.tagDefinition?.isVoid) {
      // Not a void tag, use the default printer.
      return prettierHtmlPrinters.html.print(path, options, print);
    }

    node.isSelfClosing = false;

    // Then pass it along to the default printer. Since it is no
    // longer marked as self-closing, the printer will give it a
    // closing tag. For example, `<input>` will become `<input></input>`.
    const printed = prettierHtmlPrinters.html.print(path, options, print);

    // The last item in the contents is the new closing tag.
    // Remove it.
    if (isGroup(printed) && Array.isArray(printed.contents)) {
      printed.contents.pop();
    }

    return printed;
  },
};

/** @type {import('prettier').Plugin['printers']} */
export const printers = { html: htmlPrinter };
