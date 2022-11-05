var ComposeCssObj = {
  aLightColorsFg: new Array(PrimaryGlobals.nPrimary_MAX_LEVELS),
  aLightColorsBg: new Array(PrimaryGlobals.nPrimary_MAX_LEVELS),

  // ########################################################################
  // basic object initialization

  initMain: function() {
    consoleDebug("[QuoteColors] [background.js]: ComposeCssObj.initMain");

    // get preferences
    ComposeCssObj.getPrimaryPreferences();

    return ComposeCssObj.generateStyleBlock();
  },

  // ########################################################################

  getPrimaryPreferences: function() {
    consoleDebug("[QuoteColors] [background.js]: ComposeCssObj.getPrimaryPreferences");

    // ########################################################################
    // set value from user prefs

    this.bEnableTextColor = variableList.allowTextColor;
    this.bEnableBackgroundColor = variableList.allowBackgroundColor;

    this.aLightColorsFg[0] = variableList.light_fg1;
    this.aLightColorsBg[0] = variableList.light_bg1;

    this.aLightColorsFg[1] = variableList.light_fg2;
    this.aLightColorsBg[1] = variableList.light_bg2;

    this.aLightColorsFg[2] = variableList.light_fg3;
    this.aLightColorsBg[2] = variableList.light_bg3;

    this.aLightColorsFg[3] = variableList.light_fg4;
    this.aLightColorsBg[3] = variableList.light_bg4;

    this.aLightColorsFg[4] = variableList.light_fg5;
    this.aLightColorsBg[4] = variableList.light_bg5;
    
    this.aDarkColorsFg[0] = variableList.dark_fg1;
    this.aDarkColorsBg[0] = variableList.dark_bg1;

    this.aDarkColorsFg[1] = variableList.dark_fg2;
    this.aDarkColorsBg[1] = variableList.dark_bg2;

    this.aDarkColorsFg[2] = variableList.dark_fg3;
    this.aDarkColorsBg[2] = variableList.dark_bg3;

    this.aDarkColorsFg[3] = variableList.dark_fg4;
    this.aDarkColorsBg[3] = variableList.dark_bg4;

    this.aDarkColorsFg[4] = variableList.dark_fg5;
    this.aDarkColorsBg[4] = variableList.dark_bg5;

    this.nBorderMode = variableList.borderMode;
    this.sLightBorderColor = variableList.primaryLightBorderColor;
    this.sDarkBorderColor = variableList.primaryDarkBorderColor;

    var nIdxBorderWidth = variableList.borderWidth;
    this.nBorderWidth = PrimaryGlobals.aPrimary_borderwidth[nIdxBorderWidth];
    var nIdxBorderStyle = variableList.borderStyle;
    var sBorderStyle = PrimaryGlobals.aPrimary_borderstyle[nIdxBorderStyle];
    this.bBorderLeftEn = variableList.borderPositionLeft;
    this.bBorderRightEn = variableList.borderPositionRight;
    this.sBorderLeftStyle = this.bBorderLeftEn ? sBorderStyle : "none";
    this.sBorderRightStyle = this.bBorderRightEn ? sBorderStyle : "none";
    this.sBorderTopStyle = variableList.borderPositionTop ? sBorderStyle : "none";
    this.sBorderBottomStyle = variableList.borderPositionBottom ? sBorderStyle : "none";
    this.bCollapseBorders = variableList.collapseBorders;

    this.bColorHTMLMsg = variableList.colorHTMLmessages;

    this.bUseCustomMsgColors = variableList.usermsgcolors;

    this.sLightMsgTextColor = variableList.primaryLightTextColor;
    this.sLightMsgBgColor = variableList.primaryLightBGColor;
    this.sLightMsgLinkColor = variableList.primaryLightLinkColor;
    this.sLightMsgLinkHoverColor = variableList.primaryLightLinkHoverColor;
    this.sLightSigColor = variableList.primaryLightSignatureColor;
    this.sLightSigLinkColor = variableList.primaryLightSignatureLinkColor;

    this.sDarkMsgTextColor = variableList.primaryDarkTextColor;
    this.sDarkMsgBgColor = variableList.primaryDarkBGColor;
    this.sDarkMsgLinkColor = variableList.primaryDarkLinkColor;
    this.sDarkMsgLinkHoverColor = variableList.primaryDarkLinkHoverColor;
    this.sDarkSigColor = variableList.primaryDarkSignatureColor;
    this.sDarkSigLinkColor = variableList.primaryDarkSignatureLinkColor;

    this.bHideSignatures = variableList.hidesignatures;
    this.bHideStructDelim = variableList.hidestructdelimiters;

    this.bEnableQuotecolorsOnCompose = variableList.enableQuotecolorsOnCompose;
    this.bEnableUsermsgcolorsOnCompose = variableList.enableUsermsgcolorsOnCompose;

    this.bEnableQuoteCollapse = variableList.enableQuoteCollapse;
    this.bQuoteCollapseByDefault = variableList.quoteCollapseByDefault;
    this.bQuoteCollapseOnlySubquotes = variableList.quoteCollapseOnlySubquotes;
  },

  // ########################################################################
  // generate CSS that will be inserted into mail message
  // returns: string

  generateStyleBlock: function() {
    consoleDebug("[QuoteColors] [background.js]: generateStyleBlock");

    var primaryLightCSS = '';
    var primaryDarkCSS = '';

    const sBlockquoteSelector = "blockquote[type=cite] ";
    const sBlockquoteSelector5 = sBlockquoteSelector + sBlockquoteSelector + sBlockquoteSelector + sBlockquoteSelector + sBlockquoteSelector;

    ComposeCssObj.bGraphQuotEn = true;

    // Start "prefers-color-scheme: dark" for Darkmode
    primaryDarkCSS += "@media (prefers-color-scheme: dark) {\n";

    if (this.bEnableQuotecolorsOnCompose) {
      for (var i = 0; i < PrimaryGlobals.nPrimary_MAX_LEVELS; i++) {
        var sBlockquoteSelectorLevel = '';
        for (var j = 0; j <= i; j++) {
          sBlockquoteSelectorLevel += sBlockquoteSelector;
        }

        primaryLightCSS += sBlockquoteSelectorLevel + ", " + sBlockquoteSelector5 + sBlockquoteSelectorLevel;
        primaryDarkCSS += sBlockquoteSelectorLevel + ", " + sBlockquoteSelector5 + sBlockquoteSelectorLevel;
        
        primaryLightCSS += "{";
        primaryDarkCSS += "{";

        // text color
        primaryLightCSS += "color:" + (this.bEnableTextColor ? this.aLightColorsFg[i] : "inherit") + " !important;";
        primaryDarkCSS += "color:" + (this.bEnableTextColor ? this.aDarkColorsFg[i] : "inherit") + " !important;";

        // Blockquotes background color
        if (this.bEnableBackgroundColor) {
          primaryLightCSS += "background-color:" + this.aLightColorsBg[i] + " !important;";
          primaryDarkCSS += "background-color:" + this.aDarkColorsBg[i] + " !important;";
        }

        // only add/style borders if graphical quoting is enabled
        if (this.bGraphQuotEn) {
          primaryLightCSS += "border-color:" + ((this.nBorderMode == false) ? this.aLightColorsFg[i] : this.sLightBorderColor) + " !important;";
          primaryDarkCSS += "border-color:" + ((this.nBorderMode == false) ? this.aDarkColorsFg[i] : this.sDarkBorderColor) + " !important;";

          primaryLightCSS += "border-width:" + this.nBorderWidth + "px !important;";
          primaryDarkCSS += "border-width:" + this.nBorderWidth + "px !important;";

          primaryLightCSS += "border-style:" + this.sBorderTopStyle + " " + this.sBorderRightStyle + " " + this.sBorderBottomStyle + " " + this.sBorderLeftStyle + " !important;";
          primaryDarkCSS += "border-style:" + this.sBorderTopStyle + " " + this.sBorderRightStyle + " " + this.sBorderBottomStyle + " " + this.sBorderLeftStyle + " !important;";

          if (this.bCollapseBorders) {
            if (i > 0) {
              var leftmargin = !this.bBorderLeftEn ? 1.0 : 1.0;
              var rightmargin = !this.bBorderRightEn ? 1.0 : 1.0;
              primaryLightCSS += "margin-left: -" + leftmargin + "px; margin-right: -" + rightmargin + "px; ";
              primaryDarkCSS += "margin-left: -" + leftmargin + "px; margin-right: -" + rightmargin + "px; ";
            } else {
              primaryLightCSS += "margin-block: 8px !important; padding: 16px !important;";
              primaryDarkCSS += "margin-block: 8px !important; padding: 16px !important;";
            }
          } else {
            primaryLightCSS += "margin-block: 8px !important; padding: 16px !important;";
            primaryDarkCSS += "margin-block: 8px !important; padding: 16px !important;";
          }

        } else {
          // non-graphical quoting
          primaryLightCSS += "border: none !important;";
          primaryLightCSS += "padding: 0em !important;";

          primaryDarkCSS += "border: none !important;";
          primaryDarkCSS += "padding: 0em !important;";
        }

        primaryLightCSS += "}\n";
        primaryDarkCSS += "}\n";
      } // End for loop

      if (this.bCollapseBorders) {
          primaryLightCSS += "blockquote[type=cite] pre{margin-left: 0em !important; margin-right: 0em !important;}\n";
          primaryDarkCSS += "blockquote[type=cite] pre{margin-left: 0em !important; margin-right: 0em !important;}\n";
      }
    }

    // set other messages styles (if enabled)
    if (this.bUseCustomMsgColors && this.bEnableUsermsgcolorsOnCompose) {
      // set text and background colors if enabled
      primaryLightCSS += "body {color: " + ComposeCssObj.sLightMsgTextColor + "; background: " + ComposeCssObj.sLightMsgBgColor + ";}\n";
      primaryDarkCSS += "body {color: " + ComposeCssObj.sDarkMsgTextColor + "; background: " + ComposeCssObj.sDarkMsgBgColor + ";}\n";

      // set link colors if enabled
      primaryLightCSS += "a:link {color: " + this.sLightMsgLinkColor + ";}\n";
      primaryDarkCSS += "a:link {color: " + this.sDarkMsgLinkColor + ";}\n";

      primaryLightCSS += "a:link:hover {color: " + this.sLightMsgLinkHoverColor + ";}\n";
      primaryDarkCSS += "a:link:hover {color: " + this.sDarkMsgLinkHoverColor + ";}\n";

      // set signature colors if enabled
      primaryLightCSS += ".moz-txt-sig, .moz-signature {color: " + this.sLightSigColor + ";}\n";
      primaryDarkCSS += ".moz-txt-sig, .moz-signature {color: " + this.sDarkSigColor + ";}\n";

      primaryLightCSS += ".moz-txt-sig > a, .moz-signature > a {color: " + this.sLightSigLinkColor + ";}\n";
      primaryDarkCSS += ".moz-txt-sig > a, .moz-signature > a {color: " + this.sDarkSigLinkColor + ";}\n";
    }

    // Close @media for Darkmode
    primaryDarkCSS += "}\n";

    var LightPlusDarkCSS = primaryLightCSS + primaryDarkCSS;
    return LightPlusDarkCSS;
  },
};
