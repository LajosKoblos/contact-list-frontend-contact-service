describe("updateContact method", function () {
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

    it("should return the expected contact when the contact successfully updated at the backend", function () {
        var expected = {};

        $httpBackend.expectPUT("http://localhost:8080/groups/0/contacts/1");

        $httpBackend.when("PUT", "http://localhost:8080/groups/0/contacts/1").respond(expected);

        var promise = _contactService.updateContact(0, 1, {});

        promise.then(function (data) {
            expect(data).toEqual(expected);
        });

        $rootScope.$apply();

        $httpBackend.flush();
    });

    it("should return with an expected argument error object when no argument passed", function () {
        var expected = {
            message: "Argument Error",
            fields: {
                groupId: ["groupId is required"],
                contactId: ["contactId is required"],
                contact: ["contact is required"]
            }
        };

        var promise = _contactService.updateContact();

        promise.then(function (data) {
            expect(false).toBe(true);
        });

        promise.catch(function (reason) {
            expect(reason).toEqual(expected);
        });

        $rootScope.$apply();
    });

    it("should return with an expected argument error object when one argument passed", function () {
        var expected = {
            message: "Argument Error",
            fields: {
                contactId: ["contactId is required"],
                contact: ["contact is required"]
            }
        };

        var promise = _contactService.updateContact(0);

        promise.then(function (data) {
            expect(false).toBe(true);
        });

        promise.catch(function (reason) {
            expect(reason).toEqual(expected);
        });

        $rootScope.$apply();
    });

    it("should return with an expected argument error object when two argument passed", function () {
        var expected = {
            message: "Argument Error",
            fields: {
                contact: ["contact is required"]
            }
        };

        var promise = _contactService.updateContact(0, 1);

        promise.then(function (data) {
            expect(false).toBe(true);
        });

        promise.catch(function (reason) {
            expect(reason).toEqual(expected);
        });

        $rootScope.$apply();
    });
});