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

  enableBlockquoteTextColor: true,
  enableBlockquoteBackgroundColor: true,

  /******* Only for reference: Thunderbirds own colors *****
      primaryLightBlockquoteTextColor1: "#729FCF",
      primaryLightBlockquoteTextColor2: "#AD7FA8",
      primaryLightBlockquoteTextColor3: "#8AE234",
      primaryLightBlockquoteTextColor4: "#FCAF3E",
      primaryLightBlockquoteTextColor5: "#E9B96E",
  **********************************************************/
  borderMode: 0,
  borderStyle: 1,
  borderWidth: 2,
  borderposition_bottom: false,
  borderposition_left: true,
  borderposition_right: false,
  borderposition_top: false,
  collapseBorders: false,

  colorHTMLmessages: true,

  usermsgcolors: true,

  hidesignatures: false,
  hidestructdelimiters: true,

  enableQuotecolorsOnCompose: true,
  enableUsermsgcolorsOnCompose: true,

  primaryLightBlockquoteTextColor1: "hsl(32, 55%, 12%)", // primary-blacker
  primaryLightBlockquoteTextColor2: "hsl(32, 55%, 12%)", // primary-blacker
  primaryLightBlockquoteTextColor3: "hsl(32, 55%, 12%)", // primary-blacker
  primaryLightBlockquoteTextColor4: "hsl(32, 55%, 12%)", // primary-blacker
  primaryLightBlockquoteTextColor5: "hsl(32, 55%, 12%)", // primary-blacker
  primaryLightBlockquoteBackgroundColor1: "hsla(350, 84%, 63%, 0.05)", // primary-highlight-red
  primaryLightBlockquoteBackgroundColor2: "hsla(44, 100%, 50%, 0.05)", // primary-highlight-yellow
  primaryLightBlockquoteBackgroundColor3: "hsla(74, 68%, 44%, 0.05)", // primary-highlight-green
  primaryLightBlockquoteBackgroundColor4: "hsla(186, 66%, 46%, 0.05)", // primary-highlight-blue
  primaryLightBlockquoteBackgroundColor5: "hsla(236, 100%, 72%, 0.05)", // primary-highlight-violet
  primaryLightBorderColor: "hsl(36, 37%, 83%)", // primary-gray-40
  primaryLightTextColor: "hsl(31, 45%, 20%)", // primary-black
  primaryLightBackgroundColor: "hsl(35, 36%, 95%)", // primary-white
  primaryLightLinkColor: "hsl(43, 89%, 38%)", // primary-yellow-900
  primaryLightLinkHoverColor: "hsl(43, 100%, 42%)", // primary-yellow-700
  primaryLightSignatureColor: "hsl(34, 28%, 60%)", // primary-gray-60
  primaryLightSignatureLinkColor: "hsl(43, 89%, 38%)", // primary-yellow-900

  primaryDarkBlockquoteTextColor1: "hsl(33, 66%, 90%)",
  primaryDarkBlockquoteTextColor2: "hsl(33, 66%, 90%)",
  primaryDarkBlockquoteTextColor3: "hsl(33, 66%, 90%)",
  primaryDarkBlockquoteTextColor4: "hsl(33, 66%, 90%)",
  primaryDarkBlockquoteTextColor5: "hsl(33, 66%, 90%)",
  primaryDarkBlockquoteBackgroundColor1: "hsla(350, 84%, 63%, 0.05)", // primary-highlight-red
  primaryDarkBlockquoteBackgroundColor2: "hsla(44, 100%, 50%, 0.05)", // primary-highlight-yellow
  primaryDarkBlockquoteBackgroundColor3: "hsla(74, 68%, 44%, 0.05)", // primary-highlight-green
  primaryDarkBlockquoteBackgroundColor4: "hsla(186, 66%, 46%, 0.05)", // primary-highlight-blue
  primaryDarkBlockquoteBackgroundColor5: "hsla(236, 100%, 72%, 0.05)", // primary-highlight-violet
  primaryDarkBorderColor: "hsl(33, 20%, 20%)",
  primaryDarkTextColor: "hsl(33, 66%, 90%)",
  primaryDarkBackgroundColor: "hsl(27, 14%, 15%)",
  primaryDarkLinkColor: "hsl(50, 100%, 46%)",
  primaryDarkLinkHoverColor: "hsl(46, 91%, 69%)",
  primaryDarkSignatureColor: "hsl(35, 27%, 55%)",
  primaryDarkSignatureLinkColor: "hsl(50, 100%, 46%)",
};
const VariablesList = Object.keys(DefaultVariables);

const LightmodeColorVariables = {
  primaryLightBlockquoteTextColor1: DefaultVariables.primaryLightBlockquoteTextColor1,
  primaryLightBlockquoteTextColor2: DefaultVariables.primaryLightBlockquoteTextColor2,
  primaryLightBlockquoteTextColor3: DefaultVariables.primaryLightBlockquoteTextColor3,
  primaryLightBlockquoteTextColor4: DefaultVariables.primaryLightBlockquoteTextColor4,
  primaryLightBlockquoteTextColor5: DefaultVariables.primaryLightBlockquoteTextColor5,
  primaryLightBlockquoteBackgroundColor1: DefaultVariables.primaryLightBlockquoteBackgroundColor1,
  primaryLightBlockquoteBackgroundColor2: DefaultVariables.primaryLightBlockquoteBackgroundColor2,
  primaryLightBlockquoteBackgroundColor3: DefaultVariables.primaryLightBlockquoteBackgroundColor3,
  primaryLightBlockquoteBackgroundColor4: DefaultVariables.primaryLightBlockquoteBackgroundColor4,
  primaryLightBlockquoteBackgroundColor5: DefaultVariables.primaryLightBlockquoteBackgroundColor5
};
const LightmodeColorVariablesList = Object.keys(LightmodeColorVariables);

const DarkmodeColorVariables = {
  primaryDarkBlockquoteTextColor1: DefaultVariables.primaryDarkBlockquoteTextColor1,
  primaryDarkBlockquoteTextColor2: DefaultVariables.primaryDarkBlockquoteTextColor2,
  primaryDarkBlockquoteTextColor3: DefaultVariables.primaryDarkBlockquoteTextColor3,
  primaryDarkBlockquoteTextColor4: DefaultVariables.primaryDarkBlockquoteTextColor4,
  primaryDarkBlockquoteTextColor5: DefaultVariables.primaryDarkBlockquoteTextColor5,
  primaryDarkBlockquoteBackgroundColor1: DefaultVariables.primaryDarkBlockquoteBackgroundColor1,
  primaryDarkBlockquoteBackgroundColor2: DefaultVariables.primaryDarkBlockquoteBackgroundColor2,
  primaryDarkBlockquoteBackgroundColor3: DefaultVariables.primaryDarkBlockquoteBackgroundColor3,
  primaryDarkBlockquoteBackgroundColor4: DefaultVariables.primaryDarkBlockquoteBackgroundColor4,
  primaryDarkBlockquoteBackgroundColor5: DefaultVariables.primaryDarkBlockquoteBackgroundColor5
};
const DarkmodeColorVariablesList = Object.keys(DarkmodeColorVariables);

function defaultError(error) {
  console.error("[PrimaryDebug] [defaultError]: Error:", error);
}
