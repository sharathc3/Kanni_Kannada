/*  Kanni IME Transliteration Javascript Library
 *  Copyright (c) 2012 http://tamilnanbargal.com
 *  
 *  Some part of the language mappings are copied from Gopi's Unicode Converter(http://www.higopi.com)
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
**/

Kanni['languages']['kannada'] = {
  'name' : "Kannada",      // language Name
  'charfrom' : '0C80',
  'charto' : '0CFF',
  'chnbin' : "\u0CCD",
  'ugar' : "\u0CC1",
  'uugar' : "\u0CC2",
  'methods' : {
    'ka_en' : {
      'method' : 'phonetic',
      'maxchar' : '4',
      'mergeprevchar' : true,
      'charmap' : {
        'B' : 'b',
        'C' : 'c',
        'F' : 'ph',
        'f' : 'ph',
        'G' : 'g',
        'J' : 'j',
        'K' : 'k',
        'M' : 'm',
        'P' : 'p',
        'Q' : 'q',
        'V' : 'v',
        'W' : 'v',
        'w' : 'v',
        'X' : 'x',
        'Y' : 'y',
        'Z' : 'j',
        'z' : 'j',        
        'k' : '\u0C95\u0CCD',//Cons
        'c' : '\u0C9A\u0CCD',
        'T' : '\u0C9F\u0CCD',
        'D' : '\u0CA1\u0CCD',
        'N' : '\u0CA3\u0CCD',
        't' : '\u0CA4\u0CCD',
        'd' : '\u0CA6\u0CCD',
        'n' : '\u0CA8\u0CCD',
        'p' : '\u0CAA\u0CCD',
        'b' : '\u0CAC\u0CCD',
        'y' : '\u0CAF\u0CCD',
        'R' : '\u0CB1\u0CCD',
        'L' : '\u0CB3\u0CCD',
        'v' : '\u0CB5\u0CCD',
        's' : '\u0CB8\u0CCD',
        'S' : '\u0CB6\u0CCD',
        'H' : '\u0CB9\u0CCD',
        'x' : '\u0C95\u0CCD\u0CB6\u0CCD',
        '\u200Dm' : '\u0C82',
        ':h' : '\u0C83',
        'm' : '\u0CAE\u0CCD',
        '\u0C95\u0CCDh' : '\u0C96\u0CCD',
        '\u0C97\u0CCDh' : '\u0C98\u0CCD',
        '\u0CA8\u0CCDg' : '\u0C99\u0CCD',
        '\u0C9A\u0CCDh' : '\u0C9B\u0CCD',
        '\u0C9C\u0CCDh' : '\u0C9D\u0CCD',
        '\u0CA8\u0CCDj' : '\u0C9E\u0CCD',
        '\u0C9F\u0CCDh' : '\u0CA0\u0CCD',
        '\u0CA1\u0CCDh' : '\u0CA2\u0CCD',
        '\u0CA4\u0CCDh' : '\u0CA5\u0CCD',
        '\u0CA6\u0CCDh' : '\u0CA7\u0CCD',
        '\u0CAA\u0CCDh' : '\u0CAB\u0CCD',
        '\u0CAC\u0CCDh' : '\u0CAD\u0CCD',
        '\u0CB8\u0CCDh' : '\u0CB7\u0CCD',
        '\u0CB1\u0CCDr' : '\u0C8B',
        '\u0CB3\u0CCDl' : '\u0C8C',
        '\u0CCD\u0C8B' : '\u0CC3',
        'h' : '\u0CB9\u0CCD',
        'j' : '\u0C9C\u0CCD',
        'g' : '\u0C97\u0CCD',
        'r' : '\u0CB0\u0CCD',
        'l' : '\u0CB2\u0CCD',        
        '\u0CCDa' : '\u200C',//VowSml
        '\u0CCDi' : '\u0CBF',
        '\u0CCDu' : '\u0CC1',
        '\u0C8Bu' : '\u0CC3',
        '\u0CCDe' : '\u0CC6',
        '\u0CCDo' : '\u0CCA',
        '\u200Ci' : '\u0CC8',
        '\u200Cu' : '\u0CCC',
        '\u200C-' : '\u200D',
        '\u200C:' : ':',
        '-' : '\u200D',        
        '\u200Ca' : '\u0CBE',//VowBig
        '\u0CBFi' : '\u0CC0',
        '\u0CC1u' : '\u0CC2',
        '\u0CC3u' : '\u0CC4',
        '\u0CC6e' : '\u0CC7',
        '\u0CCAo' : '\u0CCB',
        '\u0CCDA' : '\u0CBE',
        '\u0CCDI' : '\u0CC0',
        '\u0CCDU' : '\u0CC2',
        '\u0C8BU' : '\u0CC4',
        '\u0CCDE' : '\u0CC7',
        '\u0CCDO' : '\u0CCB',        
        '\u0C85i' : '\u0C90',//Vows
        '\u0C85u' : '\u0C94',
        '\u0C85a' : '\u0C86',
        '\u0C87i' : '\u0C88',
        '\u0C89u' : '\u0C8A',
        '\u0C8Ee' : '\u0C8F',
        '\u0C92o' : '\u0C93',
        'a' : '\u0C85',
        'A' : '\u0C86',
        'i' : '\u0C87',
        'I' : '\u0C88',
        'u' : '\u0C89',
        'U' : '\u0C8A',
        'e' : '\u0C8E',
        'E' : '\u0C8F',
        'o' : '\u0C92',
        'O' : '\u0C93',
        'q' : '\u0C95\u0CCD',        
        '\u200D1' : '\u0CE7',//Nums(txt);
        '\u200D2' : '\u0CE8',
        '\u200D3' : '\u0CE9',
        '\u200D4' : '\u0CEA',
        '\u200D5' : '\u0CEB',
        '\u200D6' : '\u0CEC',
        '\u200D7' : '\u0CED',
        '\u200D8' : '\u0CEE',
        '\u200D9' : '\u0CEF',
        '\u200D0' : '\u0CE6',
        '(.+)\u200C(.+)' : '$1$2'
      }
    }
  }
};
