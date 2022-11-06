var variableList = {};

function reloadVariable(id) {
  variableList[id] = DefaultVariables[id];
}

async function reloadAllVariables() {
  await reloadVariable("enableBlockquoteTextColor");
  await reloadVariable("enableBlockquoteBackgroundColor");

  await reloadVariable("borderMode");
  await reloadVariable("borderStyle");
  await reloadVariable("borderWidth");
  await reloadVariable("borderposition_bottom");
  await reloadVariable("borderposition_left");
  await reloadVariable("borderposition_right");
  await reloadVariable("borderposition_top");
  await reloadVariable("collapseBorders");

  await reloadVariable("colorHTMLmessages");

  await reloadVariable("usermsgcolors");

  await reloadVariable("hidesignatures");
  await reloadVariable("hidestructdelimiters");

  await reloadVariable("enableQuotecolorsOnCompose");
  await reloadVariable("enableUsermsgcolorsOnCompose");

  await reloadVariable("enableQuoteCollapse");
  await reloadVariable("quoteCollapseByDefault");
  await reloadVariable("quoteCollapseOnlySubquotes");

  await reloadVariable("primaryLightBlockquoteTextColor1");
  await reloadVariable("primaryLightBlockquoteTextColor2");
  await reloadVariable("primaryLightBlockquoteTextColor3");
  await reloadVariable("primaryLightBlockquoteTextColor4");
  await reloadVariable("primaryLightBlockquoteTextColor5");
  await reloadVariable("primaryLightBlockquoteBackgroundColor1");
  await reloadVariable("primaryLightBlockquoteBackgroundColor2");
  await reloadVariable("primaryLightBlockquoteBackgroundColor3");
  await reloadVariable("primaryLightBlockquoteBackgroundColor4");
  await reloadVariable("primaryLightBlockquoteBackgroundColor5");
  await reloadVariable("primaryLightBorderColor");
  await reloadVariable("primaryLightTextColor");
  await reloadVariable("primaryLightBackgroundColor");
  await reloadVariable("primaryLightLinkColor");
  await reloadVariable("primaryLightLinkHoverColor");
  await reloadVariable("primaryLightSignatureColor");
  await reloadVariable("primaryLightSignatureLinkColor");

  await reloadVariable("primaryDarkBlockquoteTextColor1");
  await reloadVariable("primaryDarkBlockquoteTextColor2");
  await reloadVariable("primaryDarkBlockquoteTextColor3");
  await reloadVariable("primaryDarkBlockquoteTextColor4");
  await reloadVariable("primaryDarkBlockquoteTextColor5");
  await reloadVariable("primaryDarkBlockquoteBackgroundColor1");
  await reloadVariable("primaryDarkBlockquoteBackgroundColor2");
  await reloadVariable("primaryDarkBlockquoteBackgroundColor3");
  await reloadVariable("primaryDarkBlockquoteBackgroundColor4");
  await reloadVariable("primaryDarkBlockquoteBackgroundColor5");
  await reloadVariable("primaryDarkBorderColor");
  await reloadVariable("primaryDarkTextColor");
  await reloadVariable("primaryDarkBackgroundColor");
  await reloadVariable("primaryDarkLinkColor");
  await reloadVariable("primaryDarkLinkHoverColor");
  await reloadVariable("primaryDarkSignatureColor");
  await reloadVariable("primaryDarkSignatureLinkColor");
}

async function variableListInit() {
  await reloadAllVariables();
}

variableListInit();