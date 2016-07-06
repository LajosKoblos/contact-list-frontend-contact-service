describe("getContactsInGroup suite", function() {
    var authServiceMock = {};
    var $httpWithProtectionMock = {};

    beforeEach(module("contactServiceModule", function($provide){
        $provide.value("authService", authServiceMock);
        $provide.value("$httpWithProtection", $httpWithProtectionMock);
    }));

    it("contains spec with an expectation", function() {
        expect(true).toBe(true);
    });
});