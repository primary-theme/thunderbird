var ComposeCssObj = {
  aPrefColorsFg: new Array(QCGlobals.nQC_MAX_LEVELS),
  aPrefColorsBg: new Array(QCGlobals.nQC_MAX_LEVELS),

  // ########################################################################
  // basic object initialization

  initMain: function() {
    consoleDebug("[QuoteColors] [background.js]: ComposeCssObj.initMain");

    // get preferences
    ComposeCssObj.getQCPrefs();

    return ComposeCssObj.generateStyleBlock();
  },

  // ########################################################################
  // read Quote Colors preferences
  // returns: void

  getQCPrefs: function() {
    consoleDebug("[QuoteColors] [background.js]: ComposeCssObj.getQCPrefs");

    // ########################################################################
    // set value from user prefs

    this.bPrefColorText = options.colorText;
    this.bPrefColorBackground = options.colorBackground;

    this.aPrefColorsFg[0] = options.fg_l1;
    this.aPrefColorsBg[0] = options.bg_l1;

    this.aPrefColorsFg[1] = options.fg_l2;
    this.aPrefColorsBg[1] = options.bg_l2;

    this.aPrefColorsFg[2] = options.fg_l3;
    this.aPrefColorsBg[2] = options.bg_l3;

    this.aPrefColorsFg[3] = options.fg_l4;
    this.aPrefColorsBg[3] = options.bg_l4;

    this.aPrefColorsFg[4] = options.fg_l5;
    this.aPrefColorsBg[4] = options.bg_l5;

    this.nPrefBorderMode = options.borderMode;
    this.sPrefBorderColor = options.borderColor;

    var nIdxBorderWidth = options.borderWidth;
    this.nBorderWidth = QCGlobals.aQC_borderwidth[nIdxBorderWidth];
    var nIdxBorderStyle = options.borderStyle;
    var sBorderStyle = QCGlobals.aQC_borderstyle[nIdxBorderStyle];
    this.bPrefBorderLeftEn = options.borderposition_left;
    this.bPrefBorderRightEn = options.borderposition_right;
    this.sBorderLeftStyle = this.bPrefBorderLeftEn ? sBorderStyle : "none";
    this.sBorderRightStyle = this.bPrefBorderRightEn ? sBorderStyle : "none";
    this.sBorderTopStyle = options.borderposition_top ? sBorderStyle : "none";
    this.sBorderBottomStyle = options.borderposition_bottom ? sBorderStyle : "none";
    this.bPrefCollapseBorders = options.collapseBorders;

    this.bPrefColorHTMLMsg = options.colorHTMLmessages;

    this.bPrefUseCustomMsgColors = options.usermsgcolors;

    this.sPrefMsgTextColor = options.messagetextcolor;
    this.sPrefMsgBgColor = options.messagebgcolor;
    this.sPrefMsgLinkColor = options.messagelinkcolor;
    this.sPrefMsgLinkHoverColor = options.messagelinkhovercolor;
    this.sPrefSigColor = options.signaturecolor;
    this.sPrefSigLinkColor = options.signaturelinkcolor;

    this.bPrefHideSignatures = options.hidesignatures;
    this.bPrefHideStructDelim = options.hidestructdelimiters;

    this.bPrefEnableQuotecolorsOnCompose = options.enableQuotecolorsOnCompose;
    this.bPrefEnableUsermsgcolorsOnCompose = options.enableUsermsgcolorsOnCompose;

    this.bPrefEnableQuoteCollapse = options.enableQuoteCollapse;
    this.bPrefQuoteCollapseByDefault = options.quoteCollapseByDefault;
    this.bPrefQuoteCollapseOnlySubquotes = options.quoteCollapseOnlySubquotes;
  },

  // ########################################################################
  // generate CSS that will be inserted into mail message
  // returns: string

  generateStyleBlock: function() {
    consoleDebug("[QuoteColors] [background.js]: generateStyleBlock");

    var sLightStyleBlock = '';

    const sBqSelector = "blockquote[type=cite] ";
    const sBqSelector5 = sBqSelector + sBqSelector + sBqSelector + sBqSelector + sBqSelector;

    ComposeCssObj.bGraphQuotEn = true;

    if (this.bPrefEnableQuotecolorsOnCompose) {
      for (var i = 0; i < QCGlobals.nQC_MAX_LEVELS; i++) {
        var sBqSelectorLevel = '';
        for (var j = 0; j <= i; j++) {
          sBqSelectorLevel += sBqSelector;
        }

        sLightStyleBlock += sBqSelectorLevel + ", " + sBqSelector5 + sBqSelectorLevel;
        sLightStyleBlock += "{";

        // text color
        sLightStyleBlock += "color:" + (this.bPrefColorText ? this.aPrefColorsFg[i] : "inherit") + " !important;";

        // whole message background color
        sLightStyleBlock += "background-color: hsl(35, 36%, 95%)  !important;";
          // primary-white

        // whole message padding
        sLightStyleBlock += "padding: 16px !important;";

        // Blockquotes background color
        if (this.bPrefColorBackground) {
          sLightStyleBlock += "background-color:" + this.aPrefColorsBg[i] + " !important;";
        }

        // only add/style borders if graphical quoting is enabled
        if (this.bGraphQuotEn) {
          sLightStyleBlock += "border-color: hsl(36, 37%, 83%) !important;";
            // primary-gray-40
            // sLightStyleBlock += "border-color:" + ((this.nPrefBorderMode == false) ? this.aPrefColorsFg[i] : this.sPrefBorderColor) + " !important;";
          sLightStyleBlock += "border-width:" + this.nBorderWidth + "px !important;";
          sLightStyleBlock += "border-style:" + this.sBorderTopStyle + " " + this.sBorderRightStyle + " " + this.sBorderBottomStyle + " " + this.sBorderLeftStyle + " !important;";

          if (this.bPrefCollapseBorders) {
            if (i > 0) {
              var leftmargin = !this.bPrefBorderLeftEn ? 1.0 : 1.0;
              var rightmargin = !this.bPrefBorderRightEn ? 1.0 : 1.0;
              sLightStyleBlock += "margin-left: -" + leftmargin + "px; margin-right: -" + rightmargin + "px; ";
            } else {
              sLightStyleBlock += "margin-block: 8px !important; padding: 16px !important;";
            }
          } else {
            sLightStyleBlock += "margin-block: 8px !important; padding: 16px !important;";
          }

        } else {
          // non-graphical quoting
          sLightStyleBlock += "border: none !important;";
          sLightStyleBlock += "padding: 0em !important;";
        }

        sLightStyleBlock += "}\n";
      } // End for loop

      if (this.bPrefCollapseBorders) {
          sLightStyleBlock += "blockquote[type=cite] pre{margin-left: 0em !important; margin-right: 0em !important;}\n";
      }
    }

    // set other messages styles (if enabled)
    if (this.bPrefUseCustomMsgColors && this.bPrefEnableUsermsgcolorsOnCompose) {
      // set text and background colors if enabled
      sLightStyleBlock += "body {color: " + ComposeCssObj.sPrefMsgTextColor + "; background: " + ComposeCssObj.sPrefMsgBgColor + ";}\n";

      // set link colors if enabled
      sLightStyleBlock += "a:link {color: " + this.sPrefMsgLinkColor + ";}\n";
      sLightStyleBlock += "a:link:hover {color: " + this.sPrefMsgLinkHoverColor + ";}\n";

      // set signature colors if enabled
      sLightStyleBlock += ".moz-txt-sig, .moz-signature {color: " + this.sPrefSigColor + ";}\n";
      sLightStyleBlock += ".moz-txt-sig > a, .moz-signature > a {color: " + this.sPrefSigLinkColor + ";}\n";
    }

    var LightPlusDarkStyleBlock = sLightStyleBlock;
    return LightPlusDarkStyleBlock;
  },
};
