const QCGlobals = {
  // border widths in unit "ex" (correspond to "thin", "medium" and "thick")
  aQC_borderwidth: [0.1667, 0.5, 0.8333],
  // border styles
  aQC_borderstyle: ["double", "solid", "dashed", "dotted"],
  // maximum quote levels - NOT used on all arrays so search for "5" in code additionally
  nQC_MAX_LEVELS: 5
};

const DefaultOptions = {
  debug: false,

  colorText: true,
  colorBackground: true,

  /******* Only for reference: Thunderbirds own colors *****
      fg_l1: "#729FCF",
      fg_l2: "#AD7FA8",
      fg_l3: "#8AE234",
      fg_l4: "#FCAF3E",
      fg_l5: "#E9B96E",
  **********************************************************/

  fg_l1: "hsl(32, 55%, 12%)", // primary-blacker
  fg_l2: "hsl(32, 55%, 12%)", // primary-blacker
  fg_l3: "hsl(32, 55%, 12%)", // primary-blacker
  fg_l4: "hsl(32, 55%, 12%)", // primary-blacker
  fg_l5: "hsl(32, 55%, 12%)", // primary-blacker
  bg_l1: "hsla(350, 84%, 63%, 0.05)", // primary-highlight-red
  bg_l2: "hsla(44, 100%, 50%, 0.05)", // primary-highlight-yellow
  bg_l3: "hsla(74, 68%, 44%, 0.05)", // primary-highlight-green
  bg_l4: "hsla(186, 66%, 46%, 0.05)", // primary-highlight-blue
  bg_l5: "hsla(236, 100%, 72%, 0.05)", // primary-highlight-violet

  borderMode: 0,
  borderColor: "hsl(36, 37%, 83%)", // primary-gray-40

  borderStyle: 1,
  borderWidth: 2,
  borderposition_bottom: false,
  borderposition_left: true,
  borderposition_right: false,
  borderposition_top: false,
  collapseBorders: false,

  colorHTMLmessages: true,

  usermsgcolors: true,

  messagetextcolor: "hsl(31, 45%, 20%)", // primary-black
  messagebgcolor: "hsl(35, 36%, 95%)", // primary-white
  messagelinkcolor: "hsl(43, 89%, 38%)", // primary-yellow-900
  messagelinkhovercolor: "hsl(43, 100%, 42%)", // primary-yellow-700
  signaturecolor: "hsl(34, 28%, 60%)", // primary-gray-60
  signaturelinkcolor: "hsl(43, 89%, 38%)", // primary-yellow-900

  hidesignatures: false,
  hidestructdelimiters: true,

  enableQuotecolorsOnCompose: true,
  enableUsermsgcolorsOnCompose: true,

};
const OptionsList = Object.keys(DefaultOptions);

const LightmodeColorOptions = {
  fg_l1: DefaultOptions.fg_l1,
  fg_l2: DefaultOptions.fg_l2,
  fg_l3: DefaultOptions.fg_l3,
  fg_l4: DefaultOptions.fg_l4,
  fg_l5: DefaultOptions.fg_l5,
  bg_l1: DefaultOptions.bg_l1,
  bg_l2: DefaultOptions.bg_l2,
  bg_l3: DefaultOptions.bg_l3,
  bg_l4: DefaultOptions.bg_l4,
  bg_l5: DefaultOptions.bg_l5
};
const LightmodeColorOptionsList = Object.keys(LightmodeColorOptions);

function defaultError(error) {
  console.error("[QuoteColors] [defaultError]: Error:", error);
}
