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
    const originalIsSelfClosing = node.isSelfClosing;
    const parent = path.parent;

    // Self-closing syntax is allowed in SVG and MathML.
    if (!["svg", "math"].includes(node.namespace)) {
      node.isSelfClosing = false;
    }

    // Prevent forward slash in void tag borrowed end marker
    if (path.previous?.tagDefinition?.isVoid) {
      path.previous.isSelfClosing = false;
    }

    // Element is not void - use default printer
    if (!node.tagDefinition?.isVoid) {
      return prettierHtmlPrinters.html.print(path, options, print);
    }

    // Pass element along to the default printer. Since it is no
    // longer marked as self-closing, the printer will give it a
    // closing tag. For example, `<input>` will become `<input></input>`.
    const printed = prettierHtmlPrinters.html.print(path, options, print);

    // Detect nested inline elements without spaces:
    //   <span><area></span>
    // but not:
    //   <span> <area> </span>
    // In the first case Prettier borrows the parent's closing tag to print
    // the void element, which requires additional cleanup below.
    const isNestedVoidWithoutSurroundingSpaces =
      !path.next &&
      parent?.kind === "element" &&
      !node.hasLeadingSpaces &&
      !node.hasTrailingSpaces;

    // Prettier prints a synthetic closing tag for void elements. Remove it
    // so the output remains valid HTML:
    // <area></area>  ->  <area>
    if (isGroup(printed) && Array.isArray(printed.contents)) {
      printed.contents.pop();

      // For nested inline cases such as:
      // <span><area></span>
      // the borrowed closing tag leaves an extra ">" in the inner group.
      // Remove that final token so the parent closing tag remains intact.
      // Only pop when the inner group is prefixed with the parent's borrowed
      // ">"; block parents like <head> do not borrow, so that token is the
      // void tag's own terminator.
      if (
        isNestedVoidWithoutSurroundingSpaces &&
        isGroup(printed.contents[0]) &&
        Array.isArray(printed.contents[0].contents) &&
        printed.contents[0].contents.length === 3 &&
        printed.contents[0].contents[2] === ">" &&
        Array.isArray(printed.contents[0].contents[0]) &&
        printed.contents[0].contents[0][0] === ">"
      ) {
        printed.contents[0].contents.pop();
      }
      // When a following inline element is whitespace-sensitive and there is
      // no separating space:
      // <area><span></span>
      // Prettier again borrows part of the closing marker. Remove the extra
      // token to prevent malformed output.
      if (
        path.next?.isLeadingSpaceSensitive &&
        !path.next.hasLeadingSpaces &&
        isGroup(printed.contents[0]) &&
        Array.isArray(printed.contents[0].contents)
      ) {
        printed.contents[0].contents.pop();
      }
    }
    // Restore the original self-closing state in all cases except the special
    // nested-inline scenario above, where keeping it disabled prevents
    // Prettier from reintroducing synthetic closing markers.
    if (!isNestedVoidWithoutSurroundingSpaces) {
      node.isSelfClosing = originalIsSelfClosing;
    }
    return printed;
  },
};

/** @type {import('prettier').Plugin['printers']} */
export const printers = { html: htmlPrinter };
