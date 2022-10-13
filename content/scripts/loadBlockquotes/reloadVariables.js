var options = {};

function reloadOption(id) {
  options[id] = DefaultOptions[id];
}

async function reloadAllOptions() {
  await reloadOption("colorText");
  await reloadOption("colorBackground");

  await reloadOption("fg_l1");
  await reloadOption("fg_l2");
  await reloadOption("fg_l3");
  await reloadOption("fg_l4");
  await reloadOption("fg_l5");
  await reloadOption("bg_l1");
  await reloadOption("bg_l2");
  await reloadOption("bg_l3");
  await reloadOption("bg_l4");
  await reloadOption("bg_l5");

  await reloadOption("borderMode");
  await reloadOption("borderColor");

  await reloadOption("borderStyle");
  await reloadOption("borderWidth");
  await reloadOption("borderposition_bottom");
  await reloadOption("borderposition_left");
  await reloadOption("borderposition_right");
  await reloadOption("borderposition_top");
  await reloadOption("collapseBorders");

  await reloadOption("colorHTMLmessages");

  await reloadOption("usermsgcolors");

  await reloadOption("messagetextcolor");
  await reloadOption("messagebgcolor");
  await reloadOption("messagelinkcolor");
  await reloadOption("messagelinkhovercolor");
  await reloadOption("signaturecolor");
  await reloadOption("signaturelinkcolor");

  await reloadOption("hidesignatures");
  await reloadOption("hidestructdelimiters");

  await reloadOption("enableQuotecolorsOnCompose");
  await reloadOption("enableUsermsgcolorsOnCompose");

  await reloadOption("enableQuoteCollapse");
  await reloadOption("quoteCollapseByDefault");
  await reloadOption("quoteCollapseOnlySubquotes");
}

async function optionsInit() {
  await reloadAllOptions();
}

optionsInit();