assert = require('power-assert');


function Person(firstname, lastname, sex){
    if(firstname == "" || lastname == ""){
        throw new Error("firstname or lastname is null or \"\"");
    }
    var self = this;
    this.fullname = firstname + lastname;
    this.sex = sex;
    this.marry = function(person){
        return person.sex != self.sex;
    };
    this.gender = function(){
        if(self.sex){
            return "male";
        }else{
            return "female";
        }
    }
}


describe("PersonSpec", function(){
    context("gender", function(){
        it("should return male if sex is true", function(){
            var target = new Person("first", "last", true);
            var actual = target.gender();
            var expected = "male";
            assert.equal(actual, expected)
        });
        it("should return female if sex is false", function(){
            var target = new Person("first", "last", false);
            var actual = target.gender();
            var expected = "female";
            assert.equal(actual, expected)
        });
    });
    context("marry", function(){
        it("should return true if male with female", function(){
            var male = new Person("hoge", "fuga", true);
            var target = new Person("first", "last", false);
            var actual = target.marry(male);
            assert(actual);
        });
        it("should return false if same gender", function(){
            var male = new Person("hoge", "fuga", false);
            var target = new Person("first", "last", false);
            var actual = target.marry(male);
            assert.equal(actual, false);
        });
    });

    context("fullname", function(){
        it("fullname should firstname + lastname", function(){
            var target = new Person("first", "last");
            assert.equal(target.fullname, "firstlast");
        });
        it("should throw Exception if fullname or lastname null", function(){
            assert.throws(function(){
                new Person("", "");
                new Person(null, "");
                new Person("", null);
                new Person(null, null);
            });
        });
        it("should throw Exception if firstname is null", function(){
            assert.doesNotThrow(function(){
                new Person("test", "test");
            }) ;
        });
    });
});

