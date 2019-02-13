(function (Modernizr) {
    'use strict';

    var modernizr_config = require('../modernizr-config.json');

    var log = function (msg, style) {
        style = style || 'color:green';
        document.getElementById("results_list").innerHTML += "<li style='" + style + "'>" + msg + "</li>";
    };
    var elog = function (msg) {
        log(msg, "font-weight:bold; color:red");
    };

    var CSS_TESTER = {
        run: function () {
            this.addStandardTests();
            //TODO: make custom tests
        },
        addStandardTests: function () {
            var resultsElem = document.getElementById('results'),
                tests = modernizr_config['feature-detects'],
                _this = this;
            tests.forEach(function (test) {
                var names = test.split('/'),
                    groupName = '',
                    testName = null;
                switch (names.length) {
                    case 1:
                        groupName = 'custom'
                        testName = names[0];
                        break;
                    case 2:
                        groupName = 'others';
                        testName = names[1]
                        break;
                    case 3:
                        groupName = names[1];
                        testName = names[2];
                        break;
                }
                var groupElem = document.getElementById(groupName);
                if (groupElem) {
                    _this.appendTestsToHtml(groupElem, testName);
                } else {
                    var ul = document.createElement('ul');
                    ul.innerHTML = '<h2 class="group">' + groupName + '</h2>';
                    ul.id = groupName;
                    resultsElem.appendChild(ul);
                    testName && _this.appendTestsToHtml(ul, testName);
                }
            });
        },
        appendTestsToHtml: function (groupElem, testName) {
            var li = document.createElement('li');
            li.innerHTML = testName;
            li.className = testName;
            groupElem.appendChild(li);
        }
    };


    CSS_TESTER.run();

}(Modernizr));