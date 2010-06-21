String.prototype.equalsIgnoreCase = myEqualsIgnoreCase;

function myEqualsIgnoreCase(arg) {
    return (new String(this.toLowerCase()) == (new String(arg)).toLowerCase());
}

function StyleEditor(formSelector, demoTextSelector) {
    this.styleForm = $(formSelector)[0];
    this.demoText = $(demoTextSelector);

    this.setTitle = function(title) {
        this.styleForm.styleName.value = title;
    };

    this.updateFont = function(fontName) {
        var foundFont = false;
        for (var i = 0; i < this.styleForm.font.length; i++) {
            var selectFontName = this.styleForm.font.options[i].value;
            if (fontName.equalsIgnoreCase(selectFontName)) {
                this.styleForm.font.selectedIndex = i;
                this.demoText.css('font-family', fontName);
                foundFont = true
            }
        }
        if (!foundFont) {
            alert('Font not found');
        }
    };

    this.updateSize = function(fontSize) {
        fontSize = parseInt(fontSize);
        var foundSize = false;
        for (var i = 0; i < this.styleForm.size.length; i++) {
            var curSize = this.styleForm.size.options[i].value;
            if (fontSize == curSize) {
                foundSize = true;
                this.styleForm.size.selectedIndex = i;
                this.demoText.css('font-size', fontSize + "pt");
            }
        }

        if (!foundSize) {
            alert('Requested font size not found');
        }
    }

    this.updateMargin = function(name, value) {
        var marginValue = parseFloat(value);

        var select = null;
        switch(name) {
            case 'margin-top':
              select = this.styleForm.margin-top;
              break;
            case 'margin-right':
              select = this.styleForm.margin-right;
              break;
            case 'margin-bottom':
              select = this.styleForm.margin-bottom;
              break;
            case 'margin-left':
              select = this.styleForm['margin-left'];
              break;
            default:
              alert('illegal margin');
        }
        gselect = select;
        var foundValue = false;
        var index = parseInt(marginValue*10);
        select.selectedIndex = index;
        this.demoText.css(name.replace("margin", "padding"), value);
        
    }

    this.pressWeight = function() {
        var button = $(formSelector + " span[title='Bold']");
        if (!button.hasClass('customStyleButtonSelected')) {
            button.addClass('customStyleButtonSelected');
        }
    };

    this.releaseWeight = function() {
        var button = $(formSelector + " span[title='Bold']");
        if (button.hasClass('customStyleButtonSelected')) {
            button.removeClass('customStyleButtonSelected');
        }
    };



    this.pressButton = function(buttonName) {
        var button = $(formSelector + ' span[title="' + buttonName + '"]');
        if (!button.hasClass('customStyleButtonSelected')) {
            button.addClass('customStyleButtonSelected');
        }
    };

    this.releaseButton = function(buttonName) {
        var button = $(formSelector + ' span[title="' + buttonName + '"]');
        if (button.hasClass('customStyleButtonSelected')) {
            button.removeClass('customStyleButtonSelected');
        }
    };

    this.updateWeight = function(weight) {
        if (weight.equalsIgnoreCase('bold')) {
            this.pressButton('Bold');
            this.demoText.css('font-weight', 'bold');
        } else {
            this.releaseButton('Bold');
            this.demoText.css('font-weight', '');
        }
    };

    this.updateStyle = function(styleValue) {
        if(styleValue.equalsIgnoreCase('italic')) {
            this.pressButton('Italic');
            this.demoText.css('font-style', 'italic');
        } else {
            this.releaseButton('Italic');
            this.demoText.css('font-style', '');
        }
    };

    this.updateAlign = function(alignValue) {
        this.pressButton(alignValue);
        this.demoText.css('text-align', alignValue);
    };

    this.setStyle = function(name, value) {
        this.demoText.css(name, value);
    }


}

var EditorUtil = {

    resetEditor: function() {

    },

    initEditor: function(el) {
        var styleEditor = new StyleEditor('#editorForm', '#customStyleDemo');

        // reset editor
        $(".customStyleButtonSelected").removeClass("customStyleButtonSelected");
        var styleAttributes = ['font-family', 'font-size', 'font-style', 'font-weight',
            'text-decoration','text-align',
            'padding-top', 'padding-right', 'padding-botton', 'padding-left'];
        
        for(var i in styleAttributes) {
            styleEditor.setStyle(styleAttributes[i], '');
        }

        // set the title field
        styleEditor.setTitle($(el).text());

        // read the new style
        var styleInfo = $(el).attr('style').split(';');
        for(var i = 0; i < styleInfo.length; i++) {
            if($.trim(styleInfo[i]).length == 0) {
                continue;
            }
            var nameValue = styleInfo[i].split(':');
            var name = $.trim(nameValue[0]);
            var value = $.trim(nameValue[1]);
            switch(name) {
                case 'font-size':
                  styleEditor.updateSize(value);
                  break;
                case 'font-family':
                  styleEditor.updateFont(value);
                  break;
                case 'font-weight':
                  styleEditor.updateWeight(value);
                  break;
                case 'font-style':
                  styleEditor.updateStyle(value);
                  break;
                case 'text-align':
                  styleEditor.updateAlign(value);
                  break;
                case 'margin-top':
                case 'margin-right':
                case 'margin-bottom':
                case 'margin-left':
                  styleEditor.updateMargin(name, value);
                  break;
                default:
                  alert('Name: ' + name + " and value: " + value);
            }
        }
    }
}
