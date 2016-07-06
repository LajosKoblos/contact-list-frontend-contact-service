describe("getContactsInGroup method", function () {
    var $httpBackend, $rootScope, _contactService;

    beforeEach(function () {
        module("contactServiceModule", function ($provide, $httpProvider) {
            $provide.provider("$httpWithProtectionProvider", $httpProvider);
        });

        inject(function (_$rootScope_, _$httpBackend_, contactService) {
            $rootScope = _$rootScope_;
            $httpBackend = _$httpBackend_;
            _contactService = contactService;
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("should return the expected list of contacts", function () {
        var contactList = ["asdf"];

        $httpBackend.expectGET("http://localhost:8080/groups/0/contacts");

        $httpBackend.when("GET", "http://localhost:8080/groups/0/contacts").respond(contactList);

        var promise = _contactService.getContactsInGroup(0);

        promise.then(function (data) {
            expect(data).toEqual(contactList);
        });

        $rootScope.$apply();

        $httpBackend.flush();
    });

    it("should return an error object with argument error message", function () {
        var promise = _contactService.getContactsInGroup();

        promise.then(function (data) {
            expect(false).toBe(true);
        });

        promise.catch(function (reason) {
            expect(reason).toEqual({
                message: "Argument Error",
                fields: {
                    groupId: ["groupId is reqired"]
                }
            });
        });

        $rootScope.$apply();

    });
});