consoleDebug("[PrimaryDebug]: Run msgDisplay.js");

var PrimaryObj = {
  // reference to message body
  oMsgBody : null,
  
  // properties of current loaded message
  bIsHTMLMessage : false,
  bIsFormatFlowed : false,
  
  bHideStructDelim : false,
  
  aLightBlockquoteTextColor : new Array(PrimaryGlobals.nPrimary_MAX_LEVELS),
  aLightBlockquoteBackgroundColor : new Array(PrimaryGlobals.nPrimary_MAX_LEVELS),

  aDarkBlockquoteTextColor: new Array(PrimaryGlobals.nPrimary_MAX_LEVELS),
  aDarkBlockquoteBackgroundColor: new Array(PrimaryGlobals.nPrimary_MAX_LEVELS),

  // ########################################################################
  // basic object initialization
  // returns: void
  
  initMain : function()
  {
    consoleDebug("[PrimaryDebug] [msgDisplay.js]: PrimaryObj.initMain");

    // get preferences
    PrimaryObj.getPrimaryPreferences();

    // get message body
    this.oMsgBody = document.body;
    if (this.oMsgBody) {
      consoleDebug("[PrimaryDebug] [msgDisplay.js]: document.body: true");
      consoleDebug("[PrimaryDebug] [msgDisplay.js]: document.body: " + document.body);
    } else {
      consoleDebug("[PrimaryDebug] [msgDisplay.js]: document.body: false");
      return;  // without body return
    }

    PrimaryObj.applyColorsToMsg();
  },
  
  // ########################################################################
  // read Quote Colors preferences
  // returns: void
  
  getPrimaryPreferences : function()
  {
    consoleDebug("[PrimaryDebug] [msgDisplay.js]: OCObj.getPrimaryPreferences");

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
  
  generateStyleBlock : function(bMsgContainsQuotes)
  {
    consoleDebug("[PrimaryDebug] [msgDisplay.js]: generateStyleBlock");
    consoleDebug("[PrimaryDebug] [msgDisplay.js]: bMsgContainsQuotes:" + bMsgContainsQuotes);

    var sPrimaryLightCSS = '';
    var sPrimaryDarkCSS = '';

    const sBlockquoteSelector = "blockquote[type=cite] ";
    const sBlockquoteSelector5 = sBlockquoteSelector + sBlockquoteSelector + sBlockquoteSelector + sBlockquoteSelector + sBlockquoteSelector;

    PrimaryObj.bGraphQuotEn = true;

    // Start "prefers-color-scheme: dark" for Darkmode
    sPrimaryDarkCSS += "@media (prefers-color-scheme: dark) {\n";

    if(bMsgContainsQuotes)
    {
      if( (this.bIsHTMLMessage && this.bColorHTMLMsg) || !this.bIsHTMLMessage)
      {
      
        for(var i=0; i<PrimaryGlobals.nPrimary_MAX_LEVELS; i++)
        {
          var sBlockquoteSelectorLevel = '';
          for(var j=0; j<=i; j++) {
            sBlockquoteSelectorLevel += sBlockquoteSelector;
          }
          
          sPrimaryLightCSS += sBlockquoteSelectorLevel + ", " + sBlockquoteSelector5 + sBlockquoteSelectorLevel;
          sPrimaryDarkCSS += sBlockquoteSelectorLevel + ", " + sBlockquoteSelector5 + sBlockquoteSelectorLevel;
          sPrimaryLightCSS += "{";
          sPrimaryDarkCSS += "{";

          // text color
          sPrimaryLightCSS += "color:" + (this.bEnableBlockquoteTextColor ? this.aLightBlockquoteTextColor[i] : "inherit") + " !important;";
          sPrimaryDarkCSS += "color:" + (this.bEnableBlockquoteTextColor ? this.aDarkBlockquoteTextColor[i] : "inherit") + " !important;";

          // background color
          if (this.bEnableBlockquoteBackgroundColor) {
            sPrimaryLightCSS += "background-color:" + this.aLightBlockquoteBackgroundColor[i] + " !important;";
            sPrimaryDarkCSS += "background-color:" + this.aDarkBlockquoteBackgroundColor[i] + " !important;";
          }

          // only add/style borders if graphical quoting is enabled
          if (this.bGraphQuotEn) {
            sPrimaryLightCSS += "border-color:" + ((this.nBorderMode == false) ? this.aLightBlockquoteTextColor[i] : this.sLightBorderColor) + " !important;";
            sPrimaryDarkCSS += "border-color:" + ((this.nBorderMode == false) ? this.aDarkBlockquoteTextColor[i] : this.sDarkBorderColor) + " !important;";
            sPrimaryLightCSS += "border-width:" + this.nBorderWidth + "px !important;";
            sPrimaryDarkCSS += "border-width:" + this.nBorderWidth + "px !important;";
            sPrimaryLightCSS += "border-style:" + this.sBorderTopStyle + " " + this.sBorderRightStyle + " " + this.sBorderBottomStyle + " " + this.sBorderLeftStyle + " !important;";
            sPrimaryDarkCSS += "border-style:" + this.sBorderTopStyle + " " + this.sBorderRightStyle + " " + this.sBorderBottomStyle + " " + this.sBorderLeftStyle + " !important;";

            if (this.bCollapseBorders) {
              if (i > 0) {
                var leftmargin = !this.bBorderLeftEn ? 1.0 : 1.0;
                var rightmargin = !this.bBorderRightEn ? 1.0 : 1.0;
                sPrimaryLightCSS += "margin-left: -" + leftmargin + "px;margin-right: -" + rightmargin + "px;";
                sPrimaryDarkCSS += "margin-left: -" + leftmargin + "px;margin-right: -" + rightmargin + "px;";
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
    }

    // set other messages styles (if enabled)
    if(this.bUseCustomMsgColors) {
      // set text and background colors if enabled
      sPrimaryLightCSS += "body {color: " + PrimaryObj.sLightTextColor + "; background: " + PrimaryObj.sLightBgColor + ";}\n";
      sPrimaryDarkCSS += "body {color: " + PrimaryObj.sDarkTextColor + "; background: " + PrimaryObj.sDarkBgColor + ";}\n";

      // set link colors if enabled
      sPrimaryLightCSS += "a:link {color: " + this.sLightLinkColor + ";}\n";
      sPrimaryDarkCSS += "a:link {color: " + this.sDarkLinkColor + ";}\n";
      sPrimaryLightCSS += "a:link:hover {color: " + this.sLightLinkHoverColor + ";}\n";
      sPrimaryDarkCSS += "a:link:hover {color: " + this.sDarkLinkHoverColor + ";}\n";
      sPrimaryLightCSS += "a:link:visited {color: " + this.sLightLinkVisitedColor + ";}\n";
      sPrimaryDarkCSS += "a:link:visited {color: " + this.sDarkLinkVisitedColor + ";}\n";

      // if(!this.bHideSignatures)
      // {
      //   // set signature colors if enabled
      //   sPrimaryLightCSS += ".moz-txt-sig, .moz-signature {color: " + this.sLightSignatureColor + ";}\n";
      //   sPrimaryDarkCSS += ".moz-txt-sig, .moz-signature {color: " + this.sDarkSignatureColor + ";}\n";
      //   sPrimaryLightCSS += ".moz-txt-sig > a, .moz-signature > a {color: " + this.sLightSignatureLinkColor + ";}\n";
      //   sPrimaryDarkCSS += ".moz-txt-sig > a, .moz-signature > a {color: " + this.sDarkSignatureLinkColor + ";}\n";
      // }
    }

    if(this.bHideSignatures) {
      sPrimaryLightCSS += ".moz-txt-sig, .moz-signature {display: none;}\n";
      sPrimaryDarkCSS += ".moz-txt-sig, .moz-signature {display: none;}\n";
    }

    // if(this.bHideStructDelim) {
    //   sPrimaryLightCSS += ".moz-txt-tag {display: none !important;}\n";
    //   sPrimaryDarkCSS += ".moz-txt-tag {display: none !important;}\n";
    // }

    // Close @media for Darkmode
    sPrimaryDarkCSS += "}\n";

    var PrimaryLightPlusDarkCSS = sPrimaryLightCSS + sPrimaryDarkCSS;
    return PrimaryLightPlusDarkCSS;
  },
  
  applyColorsToMsg : function()
  {
    consoleDebug("[PrimaryDebug] [msgDisplay.js]: applyColorsToMsg");

    var elmBody = this.oMsgBody;
    // does not seem to be a valid message
    if(!elmBody) return;

    var elmDiv = null;
    var nextElm = elmBody.firstChild;
    while( nextElm )
    {
      consoleDebug("[PrimaryDebug] [msgDisplay.js]: nextElm");
      if( nextElm.nodeName == "DIV" && nextElm.hasAttribute("class") )
      {
        consoleDebug("[PrimaryDebug] [msgDisplay.js]: div class");
        elmDiv = nextElm;
        break;
      }
      nextElm = nextElm.nextSibling;
    }

    if(!elmDiv)
    {
      // empty message, only set background color
      if(PrimaryObj.bUseCustomMsgColors)
        elmBody.bgColor = PrimaryObj.sLightBgColor;
      return;
    }

    // determine message type: HTML or plain text (flowed or fixed)
    switch( elmDiv.getAttribute("class") )
    {
      case "moz-text-html":
        consoleDebug("[PrimaryDebug] [msgDisplay.js]: moz-text-html");
        PrimaryObj.bIsHTMLMessage = true;
        PrimaryObj.bIsFormatFlowed = false;
        break;
      case "moz-text-plain":
        consoleDebug("[PrimaryDebug] [msgDisplay.js]: moz-text-plain");
        PrimaryObj.bIsHTMLMessage = false;
        PrimaryObj.bIsFormatFlowed = false;
        break;
      case "moz-text-flowed":
        consoleDebug("[PrimaryDebug] [msgDisplay.js]: moz-text-flowed");
        PrimaryObj.bIsHTMLMessage = false;
        PrimaryObj.bIsFormatFlowed = true;
        break;
      default:
        return;
    }

    // check if there are any quotes in the message
    var bmsgcontainsquotes = false;
    if( this.oMsgBody.getElementsByTagName("blockquote").item(0) )
      bmsgcontainsquotes = true;

    PrimaryObj.bGraphQuotEn = true;

    /*
    // is graphical quoting active?
    PrimaryObj.bGraphQuotEn =
      ( PrimaryObj.bIsHTMLMessage
        || PrimaryObj.objnsIBranch.getBool("mail.quoted_graphical")
        || (!PrimaryObj.objnsIBranch.getBool("mailnews.display.disable_format_flowed_support")
            && PrimaryObj.bIsFormatFlowed)
      );
    // are struct delimiters enabled (MailNews option)?
    if( PrimaryObj.bHideStructDelim && PrimaryObj.objnsIBranch.getBool("mail.display_struct") )
    */

    if(PrimaryObj.bHideStructDelim)
    {
      PrimaryObj.bHideStructDelim = true;
    }

    // generate the style block, create a new style element
    // and finally add it to the "head" of message
    var sStyleContent = PrimaryObj.generateStyleBlock(bmsgcontainsquotes);

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

PrimaryObj.initMain();
