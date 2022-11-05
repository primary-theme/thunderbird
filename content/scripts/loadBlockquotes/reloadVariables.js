var variableList = {};

function reloadVariable(id) {
  variableList[id] = DefaultVariables[id];
}

async function reloadAllVariables() {
  await reloadVariable("allowTextColor");
  await reloadVariable("allowBackgroundColor");

  await reloadVariable("light_fg1");
  await reloadVariable("light_fg2");
  await reloadVariable("light_fg3");
  await reloadVariable("light_fg4");
  await reloadVariable("light_fg5");
  await reloadVariable("light_bg1");
  await reloadVariable("light_bg2");
  await reloadVariable("light_bg3");
  await reloadVariable("light_bg4");
  await reloadVariable("light_bg5");

  await reloadVariable("dark_fg1");
  await reloadVariable("dark_fg2");
  await reloadVariable("dark_fg3");
  await reloadVariable("dark_fg4");
  await reloadVariable("dark_fg5");
  await reloadVariable("dark_bg1");
  await reloadVariable("dark_bg2");
  await reloadVariable("dark_bg3");
  await reloadVariable("dark_bg4");
  await reloadVariable("dark_bg5");

  await reloadVariable("borderMode");
  await reloadVariable("primaryLightBorderColor");
  await reloadVariable("primaryDarkBorderColor");

  await reloadVariable("borderStyle");
  await reloadVariable("borderWidth");
  await reloadVariable("borderPositionBottom");
  await reloadVariable("borderPositionLeft");
  await reloadVariable("borderPositionRight");
  await reloadVariable("borderPositionTop");
  await reloadVariable("collapseBorders");

  await reloadVariable("colorHTMLmessages");

  await reloadVariable("usermsgcolors");

  await reloadVariable("primaryLightTextColor");
  await reloadVariable("primaryLightBGColor");
  await reloadVariable("primaryLightLinkColor");
  await reloadVariable("primaryLightLinkHoverColor");
  await reloadVariable("primaryLightSignatureColor");
  await reloadVariable("primaryLightSignatureLinkColor");

  await reloadVariable("primaryDarkTextColor");
  await reloadVariable("primaryDarkBGColor");
  await reloadVariable("primaryDarkLinkColor");
  await reloadVariable("primaryDarkLinkHoverColor");
  await reloadVariable("primaryDarkSignatureColor");
  await reloadVariable("primaryDarkSignatureLinkColor");

  await reloadVariable("hidesignatures");
  await reloadVariable("hidestructdelimiters");

  await reloadVariable("enableQuotecolorsOnCompose");
  await reloadVariable("enableUsermsgcolorsOnCompose");

  await reloadVariable("enableQuoteCollapse");
  await reloadVariable("quoteCollapseByDefault");
  await reloadVariable("quoteCollapseOnlySubquotes");
}

async function variableListInit() {
  await reloadAllVariables();
}

variableListInit();