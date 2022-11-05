const PrimaryGlobals = {
  // border widths in unit "ex" (correspond to "thin", "medium" and "thick")
  aPrimary_borderwidth: [0.1667, 0.5, 0.8333],
  // border styles
  aPrimary_borderstyle: ["double", "solid", "dashed", "dotted"],
  // maximum quote levels - NOT used on all arrays so search for "5" in code additionally
  nPrimary_MAX_LEVELS: 5
};

const DefaultVariables = {
  debug: false,

  allowTextColor: true,
  allowBackgroundColor: true,

  light_fg1: "hsl(32, 55%, 12%)", // primary-blacker
  light_fg2: "hsl(32, 55%, 12%)", // primary-blacker
  light_fg3: "hsl(32, 55%, 12%)", // primary-blacker
  light_fg4: "hsl(32, 55%, 12%)", // primary-blacker
  light_fg5: "hsl(32, 55%, 12%)", // primary-blacker
  light_bg1: "hsla(350, 84%, 63%, 0.05)", // primary-highlight-red
  light_bg2: "hsla(44, 100%, 50%, 0.05)", // primary-highlight-yellow
  light_bg3: "hsla(74, 68%, 44%, 0.05)", // primary-highlight-green
  light_bg4: "hsla(186, 66%, 46%, 0.05)", // primary-highlight-blue
  light_bg5: "hsla(236, 100%, 72%, 0.05)", // primary-highlight-violet

  dark_fg1: "hsl(33, 66%, 90%)",
  dark_fg2: "hsl(33, 66%, 90%)",
  dark_fg3: "hsl(33, 66%, 90%)",
  dark_fg4: "hsl(33, 66%, 90%)",
  dark_fg5: "hsl(33, 66%, 90%)",
  dark_bg1: "hsla(350, 84%, 63%, 0.05)", // primary-highlight-red
  dark_bg2: "hsla(44, 100%, 50%, 0.05)", // primary-highlight-yellow
  dark_bg3: "hsla(74, 68%, 44%, 0.05)", // primary-highlight-green
  dark_bg4: "hsla(186, 66%, 46%, 0.05)", // primary-highlight-blue
  dark_bg5: "hsla(236, 100%, 72%, 0.05)", // primary-highlight-violet

  borderMode: 0,
  primaryLightBorderColor: "hsl(36, 37%, 83%)", // primary-gray-40
  primaryDarkBorderColor: "hsl(33, 20%, 20%)",

  borderStyle: 1,
  borderWidth: 2,
  borderPositionBottom: false,
  borderPositionLeft: true,
  borderPositionRight: false,
  borderPositionTop: false,
  collapseBorders: false,

  colorHTMLmessages: true,

  usermsgcolors: true,

  primaryLightTextColor: "hsl(31, 45%, 20%)", // primary-black
  primaryLightBGColor: "hsl(35, 36%, 95%)", // primary-white
  primaryLightLinkColor: "hsl(43, 89%, 38%)", // primary-yellow-900
  primaryLightLinkHoverColor: "hsl(43, 100%, 42%)", // primary-yellow-700
  primaryLightSignatureColor: "hsl(34, 28%, 60%)", // primary-gray-60
  primaryLightSignatureLinkColor: "hsl(43, 89%, 38%)", // primary-yellow-900

  primaryDarkTextColor: "hsl(33, 66%, 90%)",
  primaryDarkBGColor: "hsl(27, 14%, 15%)",
  primaryDarkLinkColor: "hsl(50, 100%, 46%)",
  primaryDarkLinkHoverColor: "hsl(46, 91%, 69%)",
  primaryDarkSignatureColor: "hsl(35, 27%, 55%)",
  primaryDarkSignatureLinkColor: "hsl(50, 100%, 46%)",

  hidesignatures: false,
  hidestructdelimiters: true,

  enableQuotecolorsOnCompose: true,
  enableUsermsgcolorsOnCompose: true,

};
const VariablesList = Object.keys(DefaultVariables);

const PrimaryLightColorVariables = {
  light_fg1: DefaultVariables.light_fg1,
  light_fg2: DefaultVariables.light_fg2,
  light_fg3: DefaultVariables.light_fg3,
  light_fg4: DefaultVariables.light_fg4,
  light_fg5: DefaultVariables.light_fg5,
  light_bg1: DefaultVariables.light_bg1,
  light_bg2: DefaultVariables.light_bg2,
  light_bg3: DefaultVariables.light_bg3,
  light_bg4: DefaultVariables.light_bg4,
  light_bg5: DefaultVariables.light_bg5
};
const PrimaryLightColorVariablesList = Object.keys(PrimaryLightColorVariables);

const PrimaryDarkColorVariables = {
  dark_fg1: DefaultVariables.dark_fg1,
  dark_fg2: DefaultVariables.dark_fg2,
  dark_fg3: DefaultVariables.dark_fg3,
  dark_fg4: DefaultVariables.dark_fg4,
  dark_fg5: DefaultVariables.dark_fg5,
  dark_bg1: DefaultVariables.dark_bg1,
  dark_bg2: DefaultVariables.dark_bg2,
  dark_bg3: DefaultVariables.dark_bg3,
  dark_bg4: DefaultVariables.dark_bg4,
  dark_bg5: DefaultVariables.dark_bg5
};
const PrimaryDarkColorVariablesList = Object.keys(PrimaryDarkColorVariables);

function defaultError(error) {
  console.error("[QuoteColors] [defaultError]: Error:", error);
}
