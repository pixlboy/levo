describe('getWeekDay()', function() {
    it('Gets the day of the week in English.', function() {
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        expect(days).toContain(utils.getWeekDay());
    });
});

describe('getMonthName()', function() {
    it('Gets the month of the year in English.', function() {
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        expect(months).toContain(utils.getMonthName());
    });
});

describe('replaceBetween()', function() {
    it('Replaces delimters for all instances in a string.', function() {
        var string = "I am going to --Country--";
        var newString = "I am going to Australia";
        expect(utils.replaceBetween('--Country', '--', string, 'Australia')).toBe(newString);
    });
});

describe('toPascalCase()', function() {
    it('Converts words in a string to pascal case.', function() {
        var string = 'THIS IS A TEST TEXT';
        var newString = 'This is a Test Text';
        expect(utils.toPascalCase(string)).toBe(newString);
    });
});
