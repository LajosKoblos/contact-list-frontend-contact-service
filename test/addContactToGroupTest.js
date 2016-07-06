describe("addContactToGroup method", function () {
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

    it("should return the expected contact when the contact successfully created at the backend", function () {
        var contact = {};

        $httpBackend.expectPOST("http://localhost:8080/groups/0/contacts");

        $httpBackend.when("POST", "http://localhost:8080/groups/0/contacts").respond(contact);

        var promise = _contactService.addContactToGroup(0);

        promise.then(function (data) {
            expect(data).toEqual(contact);
        });

        $rootScope.$apply();

        $httpBackend.flush();
    });

    it("should return an error object with argument error message when no groupId passed", function () {
        var promise = _contactService.addContactToGroup();

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