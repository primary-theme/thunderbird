var ComposeCssObj = {
  aLightBlockquoteTextColor: new Array(PrimaryGlobals.nPrimary_MAX_LEVELS),
  aLightBlockquoteBackgroundColor: new Array(PrimaryGlobals.nPrimary_MAX_LEVELS),

  aDarkBlockquoteTextColor: new Array(PrimaryGlobals.nPrimary_MAX_LEVELS),
  aDarkBlockquoteBackgroundColor: new Array(PrimaryGlobals.nPrimary_MAX_LEVELS),

  // ########################################################################
  // basic object initialization

  initMain: function() {
    consoleDebug("[PrimaryDebug] [background.js]: ComposeCssObj.initMain");

    // get preferences
    ComposeCssObj.getPrimaryPreferences();

    return ComposeCssObj.generateStyleBlock();
  },

  // ########################################################################
  // read Quote Colors preferences
  // returns: void

  getPrimaryPreferences: function() {
    consoleDebug("[PrimaryDebug] [background.js]: ComposeCssObj.getPrimaryPreferences");

    // ########################################################################
    // set value from user prefs

    this.bEnableBlockquoteTextColor = variableList.enableBlockquoteTextColor;
    this.bEnableBlockquoteBackgroundColor = variableList.enableBlockquoteBackgroundColor;

    this.nBorderMode = variableList.borderMode;
    var nIdxBorderWidth = variableList.borderWidth;
    this.nBorderWidth = PrimaryGlobals.aPrimary_borderwidth[nIdxBorderWidth];
    var nIdxBorderStyle = variableList.borderStyle;
    var sBorderStyle = PrimaryGlobals.aPrimary_borderstyle[nIdxBorderStyle];
    this.bBorderLeftEn = variableList.borderposition_left;
    this.bBorderRightEn = variableList.borderposition_right;
    this.sBorderLeftStyle = this.bBorderLeftEn ? sBorderStyle : "none";
    this.sBorderRightStyle = this.bBorderRightEn ? sBorderStyle : "none";
    this.sBorderTopStyle = variableList.borderposition_top ? sBorderStyle : "none";
    this.sBorderBottomStyle = variableList.borderposition_bottom ? sBorderStyle : "none";
    this.bCollapseBorders = variableList.collapseBorders;

    this.bColorHTMLMsg = variableList.colorHTMLmessages;

    this.bUseCustomMsgColors = variableList.usermsgcolors;

    this.bHideSignatures = variableList.hidesignatures;
    this.bHideStructDelim = variableList.hidestructdelimiters;

    this.bEnableQuotecolorsOnCompose = variableList.enableQuotecolorsOnCompose;
    this.bEnableUsermsgcolorsOnCompose = variableList.enableUsermsgcolorsOnCompose;

    this.bEnableQuoteCollapse = variableList.enableQuoteCollapse;
    this.bQuoteCollapseByDefault = variableList.quoteCollapseByDefault;
    this.bQuoteCollapseOnlySubquotes = variableList.quoteCollapseOnlySubquotes;

    this.aLightBlockquoteTextColor[0] = variableList.primaryLightBlockquoteTextColor1;
    this.aLightBlockquoteTextColor[1] = variableList.primaryLightBlockquoteTextColor2;
    this.aLightBlockquoteTextColor[2] = variableList.primaryLightBlockquoteTextColor3;
    this.aLightBlockquoteTextColor[3] = variableList.primaryLightBlockquoteTextColor4;
    this.aLightBlockquoteTextColor[4] = variableList.primaryLightBlockquoteTextColor5;
    this.aLightBlockquoteBackgroundColor[0] = variableList.primaryLightBlockquoteBackgroundColor1;
    this.aLightBlockquoteBackgroundColor[1] = variableList.primaryLightBlockquoteBackgroundColor2;
    this.aLightBlockquoteBackgroundColor[2] = variableList.primaryLightBlockquoteBackgroundColor3;
    this.aLightBlockquoteBackgroundColor[3] = variableList.primaryLightBlockquoteBackgroundColor4;
    this.aLightBlockquoteBackgroundColor[4] = variableList.primaryLightBlockquoteBackgroundColor5;
    this.sLightBorderColor = variableList.primaryLightBorderColor;
    this.sLightTextColor = variableList.primaryLightTextColor;
    this.sLightBgColor = variableList.primaryLightBackgroundColor;
    this.sLightLinkColor = variableList.primaryLightLinkColor;
    this.sLightLinkHoverColor = variableList.primaryLightLinkHoverColor;
    this.sLightSignatureColor = variableList.primaryLightSignatureColor;
    this.sLightSignatureLinkColor = variableList.primaryLightSignatureLinkColor;
    
    this.aDarkBlockquoteTextColor[0] = variableList.primaryDarkBlockquoteTextColor1;
    this.aDarkBlockquoteTextColor[1] = variableList.primaryDarkBlockquoteTextColor2;
    this.aDarkBlockquoteTextColor[2] = variableList.primaryDarkBlockquoteTextColor3;
    this.aDarkBlockquoteTextColor[3] = variableList.primaryDarkBlockquoteTextColor4;
    this.aDarkBlockquoteTextColor[4] = variableList.primaryDarkBlockquoteTextColor5;
    this.aDarkBlockquoteBackgroundColor[0] = variableList.primaryDarkBlockquoteBackgroundColor1;
    this.aDarkBlockquoteBackgroundColor[1] = variableList.primaryDarkBlockquoteBackgroundColor2;
    this.aDarkBlockquoteBackgroundColor[2] = variableList.primaryDarkBlockquoteBackgroundColor3;
    this.aDarkBlockquoteBackgroundColor[3] = variableList.primaryDarkBlockquoteBackgroundColor4;
    this.aDarkBlockquoteBackgroundColor[4] = variableList.primaryDarkBlockquoteBackgroundColor5;
    this.sDarkBorderColor = variableList.primaryDarkBorderColor;
    this.sDarkTextColor = variableList.primaryDarkTextColor;
    this.sDarkBgColor = variableList.primaryDarkBackgroundColor;
    this.sDarkLinkColor = variableList.primaryDarkLinkColor;
    this.sDarkLinkHoverColor = variableList.primaryDarkLinkHoverColor;
    this.sDarkSignatureColor = variableList.primaryDarkSignatureColor;
    this.sDarkSignatureLinkColor = variableList.primaryDarkSignatureLinkColor;
  },

  // ########################################################################
  // generate CSS that will be inserted into mail message
  // returns: string

  generateStyleBlock: function() {
    consoleDebug("[PrimaryDebug] [background.js]: generateStyleBlock");

    var sPrimaryLightCSS = '';
    var sPrimaryDarkCSS = '';

    const sBlockquoteSelector = "blockquote[type=cite] ";
    const sBlockquoteSelector5 = sBlockquoteSelector + sBlockquoteSelector + sBlockquoteSelector + sBlockquoteSelector + sBlockquoteSelector;

    ComposeCssObj.bGraphQuotEn = true;

    // Start "prefers-color-scheme: dark" for Darkmode
    sPrimaryDarkCSS += "@media (prefers-color-scheme: dark) {\n";

    if (this.bEnableQuotecolorsOnCompose) {
      for (var i = 0; i < PrimaryGlobals.nPrimary_MAX_LEVELS; i++) {
        var sBlockquoteSelectorLevel = '';
        for (var j = 0; j <= i; j++) {
          sBlockquoteSelectorLevel += sBlockquoteSelector;
        }

        sPrimaryLightCSS += sBlockquoteSelectorLevel + ", " + sBlockquoteSelector5 + sBlockquoteSelectorLevel;
        sPrimaryDarkCSS += sBlockquoteSelectorLevel + ", " + sBlockquoteSelector5 + sBlockquoteSelectorLevel;
        sPrimaryLightCSS += "{";
        sPrimaryDarkCSS += "{";

        // text color
        sPrimaryLightCSS += "color:" + (this.bEnableBlockquoteTextColor ? this.aLightBlockquoteTextColor[i] : "inherit") + " !important;";
        sPrimaryDarkCSS += "color:" + (this.bEnableBlockquoteTextColor ? this.aDarkBlockquoteTextColor[i] : "inherit") + " !important;";
        
        // Blockquotes background color
        if (this.bEnableBlockquoteBackgroundColor) {
          sPrimaryLightCSS += "background-color:" + this.aLightBlockquoteBackgroundColor[i] + " !important;";
          sPrimaryDarkCSS += "background-color:" + this.aDarkBlockquoteBackgroundColor[i] + " !important;";
        }

        // only add/style borders if graphical quoting is enabled
        if (this.bGraphQuotEn) {
          sPrimaryLightCSS += "border-color:" + ((this.nBorderMode == false) ? this.aLightBlockquoteTextColor[i] : this.sLightBorderColor) + " !important;";
          sPrimaryDarkCSS += "border-color:" + ((this.nBorderMode == false) ? this.aDarkBlockquoteTextColor[i] : this.sDarkBorderColor) + " !important;";
          sPrimaryLightCSS += "border-width:" + this.nBorderWidth + "ex !important;";
          sPrimaryDarkCSS += "border-width:" + this.nBorderWidth + "ex !important;";
          sPrimaryLightCSS += "border-style:" + this.sBorderTopStyle + " " + this.sBorderRightStyle + " " + this.sBorderBottomStyle + " " + this.sBorderLeftStyle + " !important;";
          sPrimaryDarkCSS += "border-style:" + this.sBorderTopStyle + " " + this.sBorderRightStyle + " " + this.sBorderBottomStyle + " " + this.sBorderLeftStyle + " !important;";

          if (this.bCollapseBorders) {
            if (i > 0) {
              var leftmargin = !this.bBorderLeftEn ? 1.0 : 1.0;
              var rightmargin = !this.bBorderRightEn ? 1.0 : 1.0;
              sPrimaryLightCSS += "margin-left: -" + leftmargin + "px; margin-right: -" + rightmargin + "px; ";
              sPrimaryDarkCSS += "margin-left: -" + leftmargin + "px; margin-right: -" + rightmargin + "px; ";
            } else {
              sPrimaryLightCSS += "margin-block: 8px !important; padding: 16px !important;";
              sPrimaryDarkCSS += "margin-block: 8px !important; padding: 16px !important;";
            }
          } else {
            sPrimaryLightCSS += "margin-block: 8px !important; padding: 16px !important;";
            sPrimaryDarkCSS += "margin-block: 8px !important; padding: 16px !important;";
          }

        } else {
          // non-graphical quoting
          sPrimaryLightCSS += "border: none !important;";
          sPrimaryDarkCSS += "border: none !important;";
          sPrimaryLightCSS += "padding: 0em !important;";
          sPrimaryDarkCSS += "padding: 0em !important;";
        }

        sPrimaryLightCSS += "}\n";
        sPrimaryDarkCSS += "}\n";
      } // End for loop

      if (this.bCollapseBorders) {
          sPrimaryLightCSS += "blockquote[type=cite] pre{margin-left: 0em !important; margin-right: 0em !important;}\n";
          sPrimaryDarkCSS += "blockquote[type=cite] pre{margin-left: 0em !important; margin-right: 0em !important;}\n";
      }
    }

    // set other messages styles (if enabled)
    if (this.bUseCustomMsgColors && this.bEnableUsermsgcolorsOnCompose) {
      // set text and background colors if enabled
      sPrimaryLightCSS += "body {color: " + ComposeCssObj.sLightTextColor + "; background: " + ComposeCssObj.sLightBgColor + ";}\n";
      sPrimaryDarkCSS += "body {color: " + ComposeCssObj.sDarkTextColor + "; background: " + ComposeCssObj.sDarkBgColor + ";}\n";

      // set link colors if enabled
      sPrimaryLightCSS += "a:link {color: " + this.sLightLinkColor + ";}\n";
      sPrimaryDarkCSS += "a:link {color: " + this.sDarkLinkColor + ";}\n";
      sPrimaryLightCSS += "a:link:hover {color: " + this.sLightLinkHoverColor + ";}\n";
      sPrimaryDarkCSS += "a:link:hover {color: " + this.sDarkLinkHoverColor + ";}\n";
      sPrimaryLightCSS += "a:link:visited {color: " + this.sLightLinkVisitedColor + ";}\n";
      sPrimaryDarkCSS += "a:link:visited {color: " + this.sDarkLinkVisitedColor + ";}\n";

      // set signature colors if enabled
      sPrimaryLightCSS += ".moz-txt-sig, .moz-signature {color: " + this.sLightSignatureColor + ";}\n";
      sPrimaryDarkCSS += ".moz-txt-sig, .moz-signature {color: " + this.sDarkSignatureColor + ";}\n";
      sPrimaryLightCSS += ".moz-txt-sig > a, .moz-signature > a {color: " + this.sLightSignatureLinkColor + ";}\n";
      sPrimaryDarkCSS += ".moz-txt-sig > a, .moz-signature > a {color: " + this.sDarkSignatureLinkColor + ";}\n";
    }

    // Close @media for Darkmode
    sPrimaryDarkCSS += "}\n";

    var PrimaryLightPlusDarkCSS = sPrimaryLightCSS + sPrimaryDarkCSS;
    return PrimaryLightPlusDarkCSS;
  },
};
