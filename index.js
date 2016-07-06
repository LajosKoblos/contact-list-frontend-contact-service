angular.module("contactServiceModule", ["authServiceModule"])

    .factory("contactService", function ($httpWithProtection, $q) {
        var contactServiceObject = {};

        contactServiceObject.getContact = function (groupId, contactId) {
            var deferred = $q.defer();
            deferred.resolve({
                "firstName": "firstName",
                "lastName": "lastName",
                "workEmail": "work@email.email",
                "homeEmail": "home@email.email",
                "nickName": "nickName",
                "jobTitle": "jobTitle",
                "_links": {"self": {"href": "http://localhost/groups/name/contacts/1"}}
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
                deferred.reject(createArgumentErrorObject("groupId"));
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

            if (typeof groupId === "undefined") {
                deferred.reject(createArgumentErrorObject("groupId"));
                return deferred.promise;
            }

            var config = {
                url: "http://localhost:8080/groups/" + groupId + "/contacts",
                method: "POST",
                data: contact
            };

            var httpPromise = $httpWithProtection(config);

            httpPromise.then(function (result) {
                deferred.resolve(result.data);
            }, function (error) {
                deferred.reject(createServerErrorObject(error));
            });

            return deferred.promise;
        };

        contactServiceObject.updateContact = function (groupId, contact) {
            var deferred = $q.defer();
            deferred.resolve({});
            return deferred.promise;
        };

        contactServiceObject.deleteContact = function (groupId, contactId) {
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        };

        contactServiceObject.validateContact = function (contact) {
            var deferred = $q.defer();
            deferred.resolve({});
            return deferred.promise;
        };

        function createArgumentErrorObject(argumentName) {
            return {
                message: "Argument Error",
                fields: {
                    groupId: [argumentName + " is reqired"]
                }
            };
        }

        function createServerErrorObject(error) {
            return {
                message: error.data.message,
                status: error.status,
                httpResponse: error.config
            };
        }

        return contactServiceObject;
    });
