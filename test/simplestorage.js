var SimpleStorage = artifacts.require("./SimpleStorage.sol");

contract('SimpleStorage', function(accounts) {
  it("should have an empty stroage string", function() {
    return SimpleStorage.deployed().then(function(instance) {
      return instance.get.call();
    }).then(function(storage_string) {
      assert.equal(storage_string.valueOf(), "", "the storage string was not empty");
    });
  });

  it("should set the string variable correctly", function() {
    let storage; //variable to store the contract instance
    let account_one = accounts[0]; // use first account to set string.

    let new_storage_string = "QmT9qk3CRYbFDWpDFYeAv8T8H1gnongwKhh5J68NLkLir6"; //dummy IPFS hash

    return SimpleStorage.deployed().then(function(instance) {
      storage = instance;
      return storage.set.call(new_storage_string, {from: account_one});
    }).then(function() {
      return storage.get.call();
    }).then(function(storage_string) {
      assert.equal(storage_string, new_storage_string, "Storage string wasn't correctly set");
    });
  });
});
