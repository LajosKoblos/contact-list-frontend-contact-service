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
        var expected = {};

        $httpBackend.expectPOST("http://localhost:8080/groups/0/contacts");

        $httpBackend.when("POST", "http://localhost:8080/groups/0/contacts").respond(expected);

        var promise = _contactService.addContactToGroup(0, {});

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
                contact: ["contact is required"]
            }
        };

        var promise = _contactService.addContactToGroup();

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
                contact: ["contact is required"]
            }
        };

        var promise = _contactService.addContactToGroup(0);

        promise.then(function (data) {
            expect(false).toBe(true);
        });

        promise.catch(function (reason) {
            expect(reason).toEqual(expected);
        });

        $rootScope.$apply();
    });

    // it("should return with a server error object when server return with error", function () {
    //     var error = {
    //         data: {
    //             message: "Server Error"
    //         },
    //         status: 401,
    //         config: {}
    //     };
    //
    //     var expected = {
    //         message: error.data.message,
    //         status: error.status,
    //         httpResponse: error.config
    //     };
    //
    //     $httpBackend.expectPOST("http://localhost:8080/groups/0/contacts");
    //
    //     $httpBackend.when("POST", "http://localhost:8080/groups/0/contacts").respond(error.status, error);
    //
    //     var promise = _contactService.addContactToGroup(0, {});
    //
    //     promise.then(function (data) {
    //         expect(false).toBe(true);
    //     });
    //
    //     promise.catch(function (reason) {
    //         expect(reason).toEqual(expected);
    //     });
    //
    //     $rootScope.$apply();
    //
    //     $httpBackend.flush();
    // });
});