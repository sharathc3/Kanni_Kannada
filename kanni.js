/*  Kanni IME Transliteration Javascript Library
 *  Copyright (c) 2012 http://tamilnanbargal.com
 *
 *  Kanni GIT repository: https://github.com/vinoth3v/Kanni
 *  Kanni Demo : http://tamilnanbargal.com/tamil-typing
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Further to the terms mentioned you should leave this copyright notice
 * intact, stating me as the original author.
*/


(function () {

  if ( !window.Kanni ) {

    /**
     * @name Kanni
     * @namespace This is the API entry point.
     *
     */
    window.Kanni = {
      'language'        : 'kannada',   // default language
      'method'          : 'ka_en',     // default typing method
      '_planguage'      : 'kannada',   // previous language
      '_pmethod'        : 'ka_en',     // previous typing method
      'languages'       : {},     // loaded languages
    };
  };

  /**
   * @name init
   *
   * This is NOT a constructor function.
   *
   */
  Kanni.init = function() {

    if (typeof kanniConfig == 'undefined') {
      kanniConfig = {};
    }

    // always attach to kanni-enabled class.
    var nodes = this._getElementsByClass('kanni-enabled');
    for(var idx in nodes) {
        var node = nodes[idx];
        Kanni.enableNode(node);
    }

  };

  /**
   * @name digest
   *
   * @return array Returns the array that contains left, prev, new and
   * right values which can be used to build the new string.
   */
  Kanni.digest = function (char, currstr, offset, lang) {

    if (!lang) {
      lang = {
        'language' : this.language,
        'method' : this.method
      };
    }

    config = Kanni.langConfig(lang);
    if (!config) {
      return false;
    }

    // left_prev_(offset)new_right

    var leftstr = '';
    var prevstr = '';
    var rightstr = '';
    var newstr = '';
    var replacecount = 0;
    var maxprevchar = 4;

    if ('maxchar' in config.method) {
      maxprevchar = config.method.maxchar;
    }

    if (offset <= 0) {
      leftstr = '';
      rightstr = currstr;
    } else {
      leftstr = currstr.substring(0, offset);
      rightstr = currstr.substring(offset);
    }

    if (leftstr.length > 0) {
      // split the string at particular position to ignore eng, spl keys.
      for(var i = leftstr.length-1; i>=0; i--) {
        var charat = leftstr.charAt(i);
        var charcodeat = leftstr.charCodeAt(i);
        if (charcodeat <= 127) { //ignore all eng and spl chars
          break;
        }
        replacecount++;
        if ( replacecount >= maxprevchar) {
          break;
        }
      }
    }

    if (replacecount >= leftstr.length) {
      prevstr = leftstr;
      leftstr = '';
    } else {
      var replaceidx = leftstr.length - replacecount;
      if (replaceidx <= 0) {
        replaceidx = 0;
      }
      prevstr = leftstr.substring(replaceidx); // this is first line.
      leftstr = leftstr.substring(0, replaceidx);
    }

    newstr = this.map(char, prevstr, lang);

    return { 'left' : leftstr, 'prev' : prevstr, 'new' : newstr, 'right' : rightstr };

  };

  /**
   * @name map
   * @return string The transliterated string for the language.
   */
  Kanni.map = function (newchar, prevchar, lang) {

    var new_string = prevchar + newchar;

    var config = Kanni.langConfig(lang);

    if (config) {

      var charmap = config.method.charmap;

      for(var char in charmap) {
        rexp = new RegExp(char, 'g');
        new_string = new_string.replace(rexp, charmap[char]);
        //new_string = new_string.replace(char, charmap[char]);
      }

    }

    return new_string;

  };

  /**
   * Key press handler.
   *
   */
  Kanni.keyPressHandler = function (event) {
    var target = event.target || event.srcElement;
    var doc = target.ownerDocument;

    return Kanni.KeyPressProcessor(event, target, doc);

  };

  /**
   * Actual keypress processor.
   *
   */
  Kanni.KeyPressProcessor = function (event, target, doc) {

    var key = event.keyCode || event.which;
    var offset = 0;

    if (Kanni.language == 'en' ) {
      return true;
    }
    var lang = {'language' : this.language, 'method' : this.method};
    if (!Kanni.keyValidator(event, lang)) {
      return true;
    }

    var char = String.fromCharCode(key);

    result = this.process(char, target, doc, lang);

    if (event.preventDefault) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.returnValue = false;
      event.cancelBubble = true;
    }

    return false;
  };

  Kanni.process = function(char, node, doc, lang, merge) {

    if (typeof merge == 'undefined') {
      merge = true;
    }

    var inputtypes = ['text', 'search', 'url']; // including html5 types, excluding email.
    if ((node.nodeName.toLowerCase() == 'textarea') || (node.nodeName.toLowerCase() == "input" && inputtypes.indexOf(node.type.toLowerCase()) != -1 )) {

      var currstr = node.value;

      if ('selectionStart' in node) {
        offset = node.selectionStart;
      } else {
        range = document.selection.createRange();

        if (range && range.parentElement() == node) {
          var len = node.value.length;
          var value = node.value.replace(/\r\n/g, "\n");

          // Create a working TextRange that lives only in the input
          var r = node.createTextRange();
          r = r.duplicate();
          r.moveToBookmark(range.getBookmark());

          var endRange = node.createTextRange();
          endRange.collapse(false);

          if (r.compareEndPoints("StartToEnd", endRange) > -1) {
            start = end = len;
          } else {
            start = -r.moveStart("character", -len);
            start += value.slice(0, start).split("\n").length - 1;

            if (r.compareEndPoints("EndToEnd", endRange) > -1) {
              end = len;
            } else {
              end = -r.moveEnd("character", -len);
              end += value.slice(0, end).split("\n").length - 1;
            }
          }
        }

        offset = start;

      }

      var result = Kanni.digest(char, currstr, offset);
      var newstr = result['left'] + result['new'] + result['right'];

      node.value = newstr;

      var value = result['left'] + result['new'];
      value = value.replace(/\r\n/g, "1");
      offset = value.length;

      if ('selectionStart' in node) {
        node.selectionStart = offset;
        node.selectionEnd = offset;
      } else if ('setSelectionRange' in node) {
        field.setSelectionRange(offset, offset);
      } else if ('createTextRange' in node) {
        var r = node.createTextRange();
        r.move('character', offset);
        //r.moveStart('character',  0);
        r.moveEnd('character',  0);
        r.collapse(false);
        r.select();
      }

    } else {

      if (doc.getSelection) {
        selection = doc.getSelection();
        range = selection.getRangeAt(0);
      } else if (doc.selection && doc.selection.createRange) {
        selection = doc.selection;
        range = doc.selection.createRange();
      }

      if ('startContainer' in range) {
        offset = range.startOffset;
        node = range.startContainer;
      } else { // it is for fu..nny IE

        var rng = range.duplicate();
        rng2 = range.duplicate();
        rng2.moveToElementText(rng.parentElement());
        rng2.setEndPoint('EndToStart', rng);
        offset = rng2.text.length;

        var rangeCopy = range.duplicate(); //Create a copy
        var rangeObj = range.duplicate();

        rangeCopy.collapse(true);
        rangeCopy.moveEnd('character', 1);

        var parentElement = rangeCopy.parentElement();
        rangeObj.moveToElementText(parentElement);
        rangeObj.setEndPoint('EndToEnd', rangeCopy);
        var text = rangeObj.text;

        var container = null;

        if (parentElement.childNodes.length > 0) {

          for(var i = 0; i < parentElement.childNodes.length; i++) {
            tnode = parentElement.childNodes[i];
            if (tnode.nodeType == 3) {    //Text node
              var find = tnode.nodeValue;
              var pos = text.indexOf(find);
              if(pos == 0 && text != find) {
                text = text.substring(find.length);
              } else {
                container = tnode;
                break;
              }
            }
          }
        }

        node = container;

        if (!node) {
          node = parentElement;
        }
      }

      offsetplus = 0;
      if (node.nodeType == 3) { //Text node
        nodevalue = node.nodeValue;
        oldprevstr  = '';
        oldnextstr  = '';

        if (node.parentNode) {
          pnode = node.parentNode;

          currhtml = pnode.innerHTML;
          if (currhtml.length > 4) {
            //alert('--' + currhtml + '--');
            find = currhtml.substring(currhtml.length-4);
            if (find == '<BR>') {
              oldprevstr = nodevalue;
              nodevalue = '\r\n';
              offsetplus += 2;
            }
            find = currhtml.substring(0, 4);
            if (find == '<BR>') {
              oldnextstr = nodevalue;
              nodevalue = '\r\n';
              //offsetplus += 2;
            }
          }
        }

        result = Kanni.digest(char, nodevalue, offset);

        newstr = result['left'] + result['new'] + result['right'] ;
        //alert('--' + result['left'] + '--' + result['new'] + '--' + result['right'] + '--' );
        if (oldprevstr.length) {
          pnode.innerText = oldprevstr + newstr;
        } else if (oldnextstr.length) {
          pnode.innerText = newstr + oldnextstr;
        } else {
          node.nodeValue = newstr;
        }

      } else {

        result = Kanni.digest(char, '', offset);

        newstr = result['left'] + result['new'] + result['right'];

        var newnode = doc.createTextNode(newstr);

        if (node.childNodes.length > 0 && node.childNodes[offset] ) {
          //nn = node.childNodes[offset].nextSibling;
          node.insertBefore(newnode, node.childNodes[offset]);
        } else if (node.nodeName == 'HR') {
          p = node.parentNode;
          p.insertBefore(newnode, node);
        } else {
          node.appendChild(newnode);
        }

        node = newnode;
      }

      var value = result['left'] + result['new'];
      value = value.replace(/\r\n/g, "1");
      offset = value.length + offsetplus;

      if ('setStart' in range) {
        range.setStart(node, offset);
        range.setEnd(node, offset);
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        range.move('character', offset);
        range.moveStart('character',  0);
        range.collapse(true);
        range.select();
      }
    }

    return result;

  };

  /*
   * @name keyValidator
   * @return bool returns true if key pressed is valid, false otherwise.
   *
   */
  Kanni.keyValidator = function (event, lang) {

    // ignore shortcuts.

    if ( event.altKey || event.ctrlKey || event.metaKey ) {
      return false;
    }

    var key = event.which || event.keyCode;

    if (('charCode' in event) && !event.charCode) {
      return false;
    }

    if ((key < 32) || (key >= 127)) {
      return false;
    }

    var char = String.fromCharCode(key);

    rexp = new RegExp(/[\x00-\x1F\x80-\xFF]/);
    if (rexp.test(char)) {
      return false;
    }

    return true;
  };

  Kanni.langConfig = function(lang) {

    if (!lang) {
      lang = {
        'language' : this.language,
        'method' : this.method
      };
    }

    if (!(lang.language in this.languages)) {
      return false;
    }

    var langconfig = this.languages[lang.language];

    var methods = langconfig['methods'];
    if (!(lang.method in methods)) {
      return false;
    }
    var methodconfig = methods[lang.method];
    return {
      'language' : langconfig,
      'method' : methodconfig
    };

  };

  /**
   * Set or return the current typing method.
   */
  Kanni.langMethod = function (new_method) {

    if (new_method) {
      if (typeof new_method == 'string') {

        new_method = new_method.split('|');

        new_method = {
          'language' : new_method[0],
          'method' : new_method[1]
        };
      } else if (typeof new_method == 'object') {
        //
      } else { // not a valid parameter
        return false;
      }

      // set the previous method so we can restore.
      this._planguage = this.language;
      this._pmethod = this.method;

      this.language = new_method.language;
      this.method = new_method.method;

      select = document.getElementById('kanni-lang-switch');
      if (select) {
        select.value = this.language + '|' + this.method;
      }

      var expires = new Date();
      expires.setTime(expires.getTime() + 1000*3600*24*30);
      this._set_cookie('kanni_user_lang', this.language + '|' + this.method, expires, '/');

    }

    return {
      'language' : this.language,
      'method' : this.method
    };
  };

  Kanni._getElementsByClass = function(className) {

    var hasClassName = new RegExp("(?:^|\\s)" + className + "(?:$|\\s)");
    var allElements = document.getElementsByTagName("*");
    var results = [];

    var element;
    for (var i = 0; (element = allElements[i]) != null; i++) {
      var elementClass = element.className;
      if (elementClass && elementClass.indexOf(className) != -1 && hasClassName.test(elementClass))
        results.push(element);
    }
    return results;
  };

  Kanni._attachEvent = function(node, event, func) {

    if (document.addEventListener) {
      node.addEventListener(event, func);
    } else {
      node.attachEvent('on' + event,  func);
    }
  };

  /**
   * @name enableNode
   *
   * This enable the Kanni typing events to the node specified.
   *
   */
  Kanni.enableNode = function(node) {
    if (typeof node == 'string') {
      node = document.getElementById(node);
    }

    if (node.className.match(/\bkanni-enabled-processed\b/)) {
      return;
    }

    this._attachEvent(node, 'keypress', this.keyPressHandler);

    // add class kanni-enabled-processed
    node.className = node.className + ' kanni-enabled-processed';
  };

  Kanni._attachEvent(window, 'load', function() {
    Kanni.init();
  });


})();
