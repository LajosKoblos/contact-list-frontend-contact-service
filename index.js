angular.module("contactServiceModule", ["authServiceModule"])

    .factory("contactService", function ($httpWithProtection, $q) {
        var contactServiceObject = {};

        contactServiceObject.getContact = function (groupId, contactId) {
            var deferred = $q.defer();

            var arguments = []

            if (typeof groupId === "undefined") {
                arguments.push("groupId");
            }

            if (typeof contactId === "undefined") {
                arguments.push("contactId");
            }

            if (arguments.length > 0) {
                deferred.reject(createArgumentErrorObject(arguments));
                return deferred.promise;
            }

            var config = {
                url: "http://localhost:8080/groups/" + groupId + "/contacts/" + contactId,
                method: "GET"
            };

            var httpPromise = $httpWithProtection(config);

            httpPromise.then(function (result) {
                deferred.resolve(result.data);
            }, function (error) {
                deferred.reject(createServerErrorObject(error));
            });

            return deferred.promise;
        };

        contactServiceObject.getContactByExample = function (groupId, contact) {
            var deferred = $q.defer();
            deferred.resolve([
                {
                    "firstName": "firstName",
                    "lastName": "lastName",
                    "workEmail": "work@email.email",
                    "nickName": "nickName",
                    "jobTitle": "jobTitle",
                    "_links": {"self": {"href": "http://localhost/groups/name/contacts/1"}}
                },
                {
                    "firstName": "firstName",
                    "lastName": "lastName",
                    "workEmail": "work@email.email",
                    "nickName": "nickName",
                    "jobTitle": "jobTitle",
                    "_links": {"self": {"href": "http://localhost/groups/name/contacts/2"}}
                }
            ]);
            return deferred.promise;
        };

        contactServiceObject.getContactsInGroup = function (groupId) {
            var deferred = $q.defer();

            if (typeof groupId === "undefined") {
                deferred.reject(createArgumentErrorObject(["groupId"]));
                return deferred.promise;
            }

            var config = {
                url: "http://localhost:8080/groups/" + groupId + "/contacts",
                method: "GET"
            };

            var httpPromise = $httpWithProtection(config);

            httpPromise.then(function (result) {
                deferred.resolve(result.data);
            }, function (error) {
                deferred.reject(createServerErrorObject(error));
            });

            return deferred.promise;
        };

        contactServiceObject.addContactToGroup = function (groupId, contact) {
            var deferred = $q.defer();

            var arguments = [];

            if (typeof groupId === "undefined") {
                arguments.push("groupId");
            }

            if (typeof contact === "undefined") {
                arguments.push("contact");
            }

            if (arguments.length > 0) {
                deferred.reject(createArgumentErrorObject(arguments));
                return deferred.promise;
            }

            var config = {
                url: "http://localhost:8080/groups/" + groupId + "/contacts",
                method: "POST",
                data: contact
            };

            var httpPromise = $httpWithProtection(config);

            httpPromise.then(function (result) {
                deferred.resolve({});
            }, function (error) {
                deferred.reject(createServerErrorObject(error));
            });

            return deferred.promise;
        };

        contactServiceObject.updateContact = function (groupId, contactId, contact) {
            var deferred = $q.defer();

            var arguments = [];

            if (typeof groupId === "undefined") {
                arguments.push("groupId");
            }

            if (typeof contactId === "undefined") {
                arguments.push("contactId");
            }

            if (typeof contact === "undefined") {
                arguments.push("contact");
            }

            if (arguments.length > 0) {
                deferred.reject(createArgumentErrorObject(arguments));
                return deferred.promise;
            }

            var config = {
                url: "http://localhost:8080/groups/" + groupId + "/contacts/" + contactId,
                method: "PUT",
                data: contact
            };

            var httpPromise = $httpWithProtection(config);

            httpPromise.then(function (result) {
                deferred.resolve({});
            }, function (error) {
                deferred.reject(createServerErrorObject(error));
            });

            return deferred.promise;
        };

        contactServiceObject.deleteContact = function (groupId, contactId) {
            var deferred = $q.defer();

            var arguments = [];

            if (typeof groupId === "undefined") {
                arguments.push("groupId");
            }

            if (typeof contactId === "undefined") {
                arguments.push("contactId");
            }

            if (arguments.length > 0) {
                deferred.reject(createArgumentErrorObject(arguments));
                return deferred.promise;
            }

            var config = {
                url: "http://localhost:8080/groups/" + groupId + "/contacts/" + contactId,
                method: "DELETE"
            };

            var httpPromise = $httpWithProtection(config);

            httpPromise.then(function (result) {
                deferred.resolve({});
            }, function (error) {
                deferred.reject(createServerErrorObject(error));
            });

            return deferred.promise;
        };

        contactServiceObject.validateContact = function (contact) {
            var deferred = $q.defer();
            deferred.resolve({});
            return deferred.promise;
        };

        function createArgumentErrorObject(arguments) {
            var fieldsObject = {};
            for (var argument of arguments) {
                fieldsObject[argument] = [argument + " is required"];
            }

            return {
                message: "Argument Error",
                fields: fieldsObject
            };
        }

        function createServerErrorObject(error) {
            return {
                message: error.data.message,
                status: error.status,
                fields: error.data.fields,
                httpResponse: error.config
            };
        }

        return contactServiceObject;
    });
