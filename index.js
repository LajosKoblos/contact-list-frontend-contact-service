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
                    "_links": {"self": {"href": "http://localhost/groups/name/contacts/1"}}
                }
            ]);
            return deferred.promise;
        };

        contactServiceObject.getContactsInGroup = function (groupId) {
            var deferred = $q.defer();

            if (typeof groupId === "undefined") {
                deferred.reject({
                    message: "Argument Error",
                    fields: {
                        groupId: ["groupId is reqired"]
                    }
                });
                return deferred.promise;
            }

            var config = {
                url: "http://localhost:8080/groups/" + groupId + "/contacts",
                method: "GET"
            };

            var httpPromise = $httpWithProtection(config);

            httpPromise.then(function (data) {
                deferred.resolve(data);
            }, function (error) {
                deferred.reject({
                
                });
            });

            return deferred.promise;
        };

        contactServiceObject.addContactToGroup = function (groupId, contact) {
            var deferred = $q.defer();
            deferred.resolve({});
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

        return contactServiceObject;
    });