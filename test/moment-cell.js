/*
  backgrid
  http://github.com/wyuenho/backgrid

  Copyright (c) 2013 Jimmy Yuen Ho Wong and contributors
  Licensed under the MIT @license.
*/
describe("A MomentFormatter", function () {

  it(".fromRaw() can convert an UNIX offset to a datetime string in moment.js", function () {
    var formatter = new Backgrid.Extension.MomentFormatter({
      modelInUnixOffset: true
    });
    expect(formatter.fromRaw(1318781876406)).toBe('2011-10-16T16:17:56Z');
  });

  it(".fromRaw() can convert an UNIX timestamp to a datetime string in moment.js", function () {
    var formatter = new Backgrid.Extension.MomentFormatter({
      modelInUnixTimestamp: true
    });
    expect(formatter.fromRaw(1318781876.721)).toBe('2011-10-16T16:17:56Z');
  });

  it(".fromRaw() can convert an ISO datetime string in UTC to a datetime " +
     "string in moment.js' default format in UTC", function () {
    var formatter = new Backgrid.Extension.MomentFormatter();
    expect(formatter.fromRaw("2012-02-29T05:30:00.100Z")).toBe("2012-02-29T05:30:00Z");
  });

  it(".fromRaw() can convert an ISO datetime string in UTC to a datetime " +
     "string in moment.js' default format in local time", function () {
    var formatter = new Backgrid.Extension.MomentFormatter({
      displayInUTC: false
    });
    expect(formatter.fromRaw("2012-02-29T05:30:00.100Z")).toBe(moment.utc("2012-02-29T05:30:00.100Z").local().format());
  });

  it(".fromRaw() can convert an ISO datetime string in UTC to a datetime " +
     "string in another moment.js supported format in the default locale", function () {
    var formatter = new Backgrid.Extension.MomentFormatter({
      displayFormat: "ddd, DD-MMM-YYYY HH:mm:ss G\\MT" //cookie expires format
    });
    expect(formatter.fromRaw("2012-02-29T05:30:00.100Z")).toBe("Wed, 29-Feb-2012 05:30:00 GMT");
  });

  it(".fromRaw() can convert an ISO datetime string in UTC to a datetime " +
     "string in another moment.js supported format in a different locale", function () {
    var formatter = new Backgrid.Extension.MomentFormatter({
      displayFormat: "ddd, DD-MMM-YYYY HH:mm:ss G\\MT",
      displayLang: "zh-tw"
    });
    expect(formatter.fromRaw("2012-02-29T05:30:00.100Z")).toBe("週三, 29-2月-2012 05:30:00 GMT");
  });

  it(".fromRaw() can convert an ISO datetime string in UTC to a datetime " +
     "string in another moment.js supported format in a different locale in " +
     "local time", function () {
    var formatter = new Backgrid.Extension.MomentFormatter({
      displayFormat: "ddd, DD-MMM-YYYY HH:mm:ss ZZ",
      displayLang: "zh-tw",
      displayInUTC: false
    });
    expect(formatter.fromRaw("2012-02-29T05:30:00.100Z")).toBe(moment.utc("2012-02-29T05:30:00.100Z").local().locale("zh-tw").format("ddd, DD-MMM-YYYY HH:mm:ss ZZ"));
  });

  it(".fromRaw() can convert a datetime string in UTC in a moment.js " +
     "supported format to another datetime string in UTC in another moment.js" +
     " supported format", function () {
    var formatter = new Backgrid.Extension.MomentFormatter({
      modelFormat: "ddd, DD-MMM-YYYY HH:mm:ss",
      displayFormat: "MM-DD-YYYY HH:mm:ss"
    });
    expect(formatter.fromRaw("Wed, 29-Feb-2012 05:30:00")).toBe("02-29-2012 05:30:00");
  });

  it(".fromRaw() can convert a datetime string in UTC in a moment.js " +
     "supported format in one locale to another datetime string in UTC in " +
     "another moment.js supported format in another locale", function () {
    var formatter = new Backgrid.Extension.MomentFormatter({
      modelLang: "zh-tw",
      modelFormat: "ddd, DD-MMM-YYYY HH:mm:ss",
      displayLang: "fr",
      displayFormat: "dddd, YYYY-MMM-DD HH:mm:ss"
    });
    expect(formatter.fromRaw("週三, 29-2月-2012 05:30:00")).toBe("mercredi, 2012-févr.-29 05:30:00");
  });

  it(".fromRaw() can convert a datetime string in a timezone offset in a moment.js supported format in one locale to another datetime string in another timezone offset in another moment.js supported format in another locale", function () {
    var formatter = new Backgrid.Extension.MomentFormatter({
      modelInUTC: false,
      modelLang: "zh-tw",
      modelFormat: "ddd, DD-MMM-YYYY HH:mm:ss ZZ",
      displayInUTC: false,
      displayLang: "fr",
      displayFormat: "dddd, YYYY-MMM-DD HH:mm:ss ZZ"
    });
    expect(formatter.fromRaw("週三, 29-2月-2012 05:30:00 +0800")).toBe(moment("2012-02-29T05:30:00+08:00").locale("fr").local().format("dddd, YYYY-MMM-DD HH:mm:ss ZZ"));
  });

  it(".fromRaw() returns an empty string for a null value", function () {
    var formatter = new Backgrid.Extension.MomentFormatter();
    expect(formatter.fromRaw(null)).toBe('');
  });

  it(".fromRaw() returns an empty string for an undefined value", function () {
    var formatter = new Backgrid.Extension.MomentFormatter();
    expect(formatter.fromRaw(undefined)).toBe('');
  });

  it(".toRaw() can convert an UNIX offset to a datetime string in moment.js", function () {
    var formatter = new Backgrid.Extension.MomentFormatter({
      displayInUnixOffset: true
    });
    expect(formatter.toRaw(1318781876406)).toBe('2011-10-16T16:17:56Z');
  });

  it(".toRaw() can convert an UNIX timestamp to a datetime string in moment.js", function () {
    var formatter = new Backgrid.Extension.MomentFormatter({
      displayInUnixTimestamp: true
    });
    expect(formatter.toRaw(1318781876.721)).toBe('2011-10-16T16:17:56Z');
  });

  it(".toRaw() can convert a non-ISO datetime string in UTC in the default locale to the ISO datetime string in UTC in the default locale", function () {
    var formatter = new Backgrid.Extension.MomentFormatter({
      displayFormat: "ddd, DD-MMM-YYYY HH:mm:ss"
    });
    expect(formatter.toRaw("Wed, 29-Feb-2012 05:30:00")).toBe("2012-02-29T05:30:00Z");
  });

  it(".toRaw() can convert a non-ISO datetime string in UTC in a different locale to the ISO datetime string in UTC in the default locale", function () {
    var formatter = new Backgrid.Extension.MomentFormatter({
      displayLang: "zh-tw",
      displayFormat: "ddd, DD-MMM-YYYY HH:mm:ss"
    });
    expect(formatter.toRaw("週三, 29-2月-2012 05:30:00")).toBe("2012-02-29T05:30:00Z");
  });

  it(".toRaw() can convert a non-ISO datetime string in a timezone offset in a different locale to the ISO datetime string in UTC in the default locale", function () {
    var formatter = new Backgrid.Extension.MomentFormatter({
      displayInUTC: false,
      displayLang: "zh-tw",
      displayFormat: "ddd, DD-MMM-YYYY HH:mm:ss ZZ"
    });
    expect(formatter.toRaw("週三, 29-2月-2012 05:30:00 +08:00")).toBe(moment("2012-02-29T05:30:00+08:00").utc().format());
  });

  it(".toRaw() can convert a non-ISO datetime string in local time in a different locale to another non-ISO datetime string in UTC in the default locale", function () {
    var formatter = new Backgrid.Extension.MomentFormatter({
      modelFormat: "dddd, YYYY-MMM-DD HH:mm:ss",
      displayInUTC: false,
      displayLang: "zh-tw",
      displayFormat: "ddd, DD-MMM-YYYY HH:mm:ss"
    });
    expect(formatter.toRaw("週三, 29-2月-2012 05:30:00")).toBe(moment("2012-02-29T05:30:00").utc().format("dddd, YYYY-MMM-DD HH:mm:ss"));
  });

  it(".toRaw() can convert a non-ISO datetime string in local time in a different locale to another non-ISO datetime string in UTC in a different locale", function () {
    var formatter = new Backgrid.Extension.MomentFormatter({
      modelLang: "fr",
      modelFormat: "dddd, YYYY-MMM-DD HH:mm:ss",
      displayInUTC: false,
      displayLang: "zh-tw",
      displayFormat: "ddd, DD-MMM-YYYY HH:mm:ss"
    });
    expect(formatter.toRaw("週三, 29-2月-2012 05:30:00")).toBe(moment("2012-02-29T05:30:00").locale("fr").utc().format("dddd, YYYY-MMM-DD HH:mm:ss"));
  });

  it(".toRaw() can convert a non-ISO datetime string in a timezone offset in a different locale to another non-ISO datetime string in a timezone offset in a different locale", function () {
    var formatter = new Backgrid.Extension.MomentFormatter({
      modelInUTC: false,
      modelLang: "fr",
      modelFormat: "dddd, YYYY-MMM-DD HH:mm:ss ZZ",
      displayInUTC: false,
      displayLang: "zh-tw",
      displayFormat: "ddd, DD-MMM-YYYY HH:mm:ss Z"
    });
    expect(formatter.toRaw("週三, 29-2月-2012 05:30:00 +08:00")).toBe(moment("2012-02-29T05:30:00+08:00").locale("fr").format("dddd, YYYY-MMM-DD HH:mm:ss ZZ"));
  });

  it(".toRaw() returns undefined when converting an empty string or a string of whitespaces", function () {
    var formatter = new Backgrid.Extension.MomentFormatter();
    expect(formatter.toRaw('')).toBeUndefined();
    expect(formatter.toRaw(' ')).toBeUndefined();
  });

});

describe("A MomentCell", function () {

  var Book = Backbone.Model.extend({});
  var book;
  var cell;

  beforeEach(function () {

    book = new Book({
      birthday: "2012-11-30T12:34:56.789Z"
    });

    cell = new Backgrid.Extension.MomentCell({
      column: {
        name: "birthday",
        cell: "moment"
      },
      model: book
    });
  });

  it("uses a default MomentFormatter", function () {
    expect(cell.formatter instanceof Backgrid.Extension.MomentFormatter).toBe(true);
    expect(_.pick(cell.formatter, _.keys(cell.formatter))).toEqual(Backgrid.Extension.MomentFormatter.prototype.defaults);
  });

  it("will accept formatter options set on the cell class", function () {
    cell = new (Backgrid.Extension.MomentCell.extend({
      displayLang: 'zh_HK'
    }))({
      column: {
        name: "birthday",
        cell: "moment"
      },
      model: book
    });

    expect(cell.formatter.displayLang).toBe('zh_HK');
  });

  it("will accept formatter options given to the cell constructor", function () {
    cell = new Backgrid.Extension.MomentCell({
      column: {
        name: "birthday",
        cell: "moment"
      },
      model: book,
      displayLang: 'zh_HK'
    });

    expect(cell.formatter.displayLang).toBe('zh_HK');
  });

  it("applies a moment-cell class to the cell", function () {
    expect(cell.render().$el.hasClass("moment-cell")).toBe(true);
  });

  it("renders a placeholder for the input format for the editor", function () {
    cell.render();
    cell.$el.click();
    expect(cell.currentEditor.$el.attr("placeholder")).toBe(Backgrid.Extension.MomentFormatter.prototype.defaults.displayFormat);
  });

});
