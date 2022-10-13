consoleDebug("[QuoteColors]: Run msgDisplay.js");

var QCObj = {
  // reference to message body
  oMsgBody : null,
  
  // properties of current loaded message
  bIsHTMLMessage : false,
  bIsFormatFlowed : false,
  
  aPrefColorsFg : new Array(QCGlobals.nQC_MAX_LEVELS),
  aPrefColorsBg : new Array(QCGlobals.nQC_MAX_LEVELS),

  bHideStructDelim : false,
  
  
  // ########################################################################
  // basic object initialization
  // returns: void
  
  initMain : function()
  {
    consoleDebug("[QuoteColors] [msgDisplay.js]: QCObj.initMain");

    // get preferences
    QCObj.getQCPrefs();

    // get message body
    this.oMsgBody = document.body;
    if (this.oMsgBody) {
      consoleDebug("[QuoteColors] [msgDisplay.js]: document.body: true");
      consoleDebug("[QuoteColors] [msgDisplay.js]: document.body: " + document.body);
    } else {
      consoleDebug("[QuoteColors] [msgDisplay.js]: document.body: false");
      return;  // without body return
    }

    QCObj.applyColorsToMsg();
  },
  
  // ########################################################################
  // read Quote Colors preferences
  // returns: void
  
  getQCPrefs : function()
  {
    consoleDebug("[QuoteColors] [msgDisplay.js]: OCObj.getQCPrefs");

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
  },

  // ########################################################################
  // generate CSS that will be inserted into mail message
  // returns: string
  
  generateStyleBlock : function(bMsgContainsQuotes)
  {
    consoleDebug("[QuoteColors] [msgDisplay.js]: generateStyleBlock");
    consoleDebug("[QuoteColors] [msgDisplay.js]: bMsgContainsQuotes:" + bMsgContainsQuotes);

    var sLightStyleBlock = '';

    const sBqSelector = "blockquote[type=cite] ";
    const sBqSelector5 = sBqSelector + sBqSelector + sBqSelector + sBqSelector + sBqSelector;

    QCObj.bGraphQuotEn = true;

    if(bMsgContainsQuotes)
    {
      if( (this.bIsHTMLMessage && this.bPrefColorHTMLMsg) || !this.bIsHTMLMessage)
      {
      
        for(var i=0; i<QCGlobals.nQC_MAX_LEVELS; i++)
        {
          var sBqSelectorLevel = '';
          for(var j=0; j<=i; j++) {
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
    }

    // set other messages styles (if enabled)
    if(this.bPrefUseCustomMsgColors) {
      // set text and background colors if enabled
      // adds padding
      sLightStyleBlock += "body {color: " + QCObj.sPrefMsgTextColor + ";background: " + QCObj.sPrefMsgBgColor + "; padding: 8px !important;}\n";

      // set link colors if enabled
      sLightStyleBlock += "a:link {color: " + this.sPrefMsgLinkColor + ";}\n";
      sLightStyleBlock += "a:link:hover {color: " + this.sPrefMsgLinkHoverColor + ";}\n";

      if(!this.bPrefHideSignatures)
      {
        // set signature colors if enabled
        sLightStyleBlock += ".moz-txt-sig, .moz-signature {color: " + this.sPrefSigColor + ";}\n";
        sLightStyleBlock += ".moz-txt-sig > a, .moz-signature > a {color: " + this.sPrefSigLinkColor + ";}\n";
      }
    }

    if(this.bPrefHideSignatures) {
      sLightStyleBlock += ".moz-txt-sig, .moz-signature {display: none;}\n";
    }

    if(this.bHideStructDelim) {
      sLightStyleBlock += ".moz-txt-tag {display: none !important;}\n";
    }

    var LightPlusDarkStyleBlock = sLightStyleBlock;
    return LightPlusDarkStyleBlock;
  },
  
  applyColorsToMsg : function()
  {
    consoleDebug("[QuoteColors] [msgDisplay.js]: applyColorsToMsg");

    var elmBody = this.oMsgBody;
    // does not seem to be a valid message
    if(!elmBody) return;

    var elmDiv = null;
    var nextElm = elmBody.firstChild;
    while( nextElm )
    {
      consoleDebug("[QuoteColors] [msgDisplay.js]: nextElm");
      if( nextElm.nodeName == "DIV" && nextElm.hasAttribute("class") )
      {
        consoleDebug("[QuoteColors] [msgDisplay.js]: div class");
        elmDiv = nextElm;
        break;
      }
      nextElm = nextElm.nextSibling;
    }

    if(!elmDiv)
    {
      // empty message, only set background color
      if(QCObj.bPrefUseCustomMsgColors)
        elmBody.bgColor = QCObj.sPrefMsgBgColor;
      return;
    }

    // determine message type: HTML or plain text (flowed or fixed)
    switch( elmDiv.getAttribute("class") )
    {
      case "moz-text-html":
        consoleDebug("[QuoteColors] [msgDisplay.js]: moz-text-html");
        QCObj.bIsHTMLMessage = true;
        QCObj.bIsFormatFlowed = false;
        break;
      case "moz-text-plain":
        consoleDebug("[QuoteColors] [msgDisplay.js]: moz-text-plain");
        QCObj.bIsHTMLMessage = false;
        QCObj.bIsFormatFlowed = false;
        break;
      case "moz-text-flowed":
        consoleDebug("[QuoteColors] [msgDisplay.js]: moz-text-flowed");
        QCObj.bIsHTMLMessage = false;
        QCObj.bIsFormatFlowed = true;
        break;
      default:
        return;
    }

    // check if there are any quotes in the message
    var bmsgcontainsquotes = false;
    if( this.oMsgBody.getElementsByTagName("blockquote").item(0) )
      bmsgcontainsquotes = true;

    QCObj.bGraphQuotEn = true;

    /*
    // is graphical quoting active?
    QCObj.bGraphQuotEn =
      ( QCObj.bIsHTMLMessage
        || QCObj.objnsIPrefBranch.getBoolPref("mail.quoted_graphical")
        || (!QCObj.objnsIPrefBranch.getBoolPref("mailnews.display.disable_format_flowed_support")
            && QCObj.bIsFormatFlowed)
      );
    // are struct delimiters enabled (MailNews option)?
    if( QCObj.bPrefHideStructDelim && QCObj.objnsIPrefBranch.getBoolPref("mail.display_struct") )
    */

    if(QCObj.bPrefHideStructDelim)
    {
      QCObj.bHideStructDelim = true;
    }

    // generate the style block, create a new style element
    // and finally add it to the "head" of message
    var sStyleContent = QCObj.generateStyleBlock(bmsgcontainsquotes);

    var qrStyle = document.createElement('style');
    qrStyle.classList.add('msgDisplay');
    //  qrStyle.media = 'screen';
    qrStyle.textContent = sStyleContent;
    if (document.head) {
        document.head.append(qrStyle);
    }
    else {
        var root = document.documentElement;
        root.append(qrStyle);
        var observer = new MutationObserver(() => {
            if (document.head) {
                observer.disconnect();
                if (qrStyle.isConnected) {
                    document.head.append(qrStyle);
                }
            }
        });
        observer.observe(root, { childList: true });
    }
  }

};

QCObj.initMain();
