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
 * @param {import('prettier/doc.js').builders.Doc} doc
 * @param {(path: (number | string)[], value: string) => void} cb
 * @param {(number | string)[] | undefined} path
 */
function walkTheDoc(doc, cb, path = []) {
  if (typeof doc === "string") {
    cb(path, doc);
    return;
  }

  if (Array.isArray(doc)) {
    doc.forEach((d, i) => {
      walkTheDoc(d, cb, [...path, i]);
    });
    return;
  }

  if (doc.type === "group" || doc.type === "indent") {
    walkTheDoc(doc.contents, cb, [...path, "contents"]);
    return;
  }

  return;
}

/**
 *
 * @param {*} obj
 * @param {(string | number)[]} pathSpec
 */
function getByPath(obj, pathSpec) {
  let got = obj;
  for (const key of pathSpec) {
    got = got[key];
  }
  return got;
}

/** @type {import('prettier').Printer<HtmlNode>} */
const htmlPrinter = {
  ...prettierHtmlPrinters.html,
  print(path, options, print) {
    const node = path.node;
    const isVoidTag = node.tagDefinition?.isVoid;
    const isVoidAllowed = ["svg", "math"].includes(node.namespace);

    if (!isVoidTag && !isVoidAllowed) {
      node.isSelfClosing = false;
    }

    // Then pass it along to the default printer. Since it is no
    // longer marked as self-closing, the printer will give it a
    // closing tag. For example, `<input>` will become `<input></input>`.

    const printed = prettierHtmlPrinters.html.print(path, options, print);

    walkTheDoc(printed, (path, doc) => {
      if (node.attrs?.length === 0 && doc.startsWith(`<${node.name}`)) {
        // If there are no attributes, Prettier inserts a space
        // character before the self-closing bracket.
        // Remove this space.
        const _path = [...path];
        _path.pop();
        const last = _path.pop();
        const val = getByPath(printed, _path);
        if (val[last + 1] === " ") {
          val[last + 1] = "";
        }
      }
      if (doc.startsWith("/>") && path.length > 0) {
        // console.log(JSON.stringify(printed));
        // console.log({ path, doc, isVoidAllowed, node });
        // Remove the `/` from the self-closing syntax.
        const _path = [...path];
        const last = _path.pop();
        const val = getByPath(printed, _path);
        val[last] = doc.substring(1);
      }
    });

    return printed;
  },
};

/** @type {import('prettier').Plugin['printers']} */
export const printers = { html: htmlPrinter };
