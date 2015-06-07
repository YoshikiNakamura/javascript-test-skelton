/**
assert = require('power-assert');

var a = 1+1;

describe("sample", function(){
    it("2+2", function(){
        assert.equal(a, 2);
    });
});

**/

var assert = require('power-assert');

function Person(firstname, familyname, gender, birthYear, birthMonth, birthDate){
    if(familyname == "" || firstname == "") throw new Error("Error");
    if(gender !== 0 && gender !== 1) throw new Error("Error");
    this.firstname = firstname;
    this.famillyname = familyname;
    this.fullname = familyname + firstname;
    this.gender = gender;
    this.birthday = new Date(birthYear, birthMonth, birthDate);

    this.getFamilyname = function(){
        return this.famillyname;
    };
    this.getFirstname = function(){
        return this.firstname;
    };
    this.getFullname = function(){
        return this.fullname;
    };
    this.getGender = function(){
        if(this.gender == 0){
            return "male";
        }else if(this.gender == 1){
            return "female"
        }
    };
    this.getBirthday = function(){
        return this.birthday.getFullYear()+'年'+this.birthday.getMonth()+'月'+this.birthday.getDate()+'日';
    }
    this.getAge = function(){
        var now = new Date();
        if(now.getMonth() * 100 + now.getDate() > this.birthday.getMonth() * 100 + this.getDate()){
            return now.getFullYear() - this.birthday.getFullYear();
        }
        if(now.getMonth() * 100 + now.getDate() < this.birthday.getMonth() * 100 + this.getDate()){
            return now.getFullYear() - this.birthday.getFullYear() - 1;
        }
    }
};


function marry(person1, person2){
    if(person1.getGender() == person2.getGender()){
        return false;
    }else{
        return true;
    }
}

describe("PersonSpec", function(){
    it("fullname should familyname + firstname", function(){
        var taro = new Person("太郎", "佐藤", 0);
        assert.equal(taro.getFullname(), "佐藤太郎");
    });
    it("firstname should return firstname", function(){
        var taro = new Person("太郎", "佐藤", 0);
        assert.equal(taro.getFirstname(), "太郎");
    });

    it("famillyname should return famillyname", function(){
        var taro = new Person("太郎", "佐藤", 0);
        assert.equal(taro.getFamilyname(), "佐藤");
    });

    it("should throw exception if pass blank string", function(){
        assert.throws(function(){
            new Person("", "", 0);
            new Person("f", "", 0);
            new Person("", "f", 0);
            new Person(null, null);
        });
    });

    it("gender should return gender", function(){
        var taro = new Person("太郎", "佐藤", 0);
        assert.equal(taro.getGender(), "male");
        assert.notEqual(taro.getGender(), "female");
    });

    it("gender should return gender", function(){
        var hanako = new Person("花子", "佐藤", 1);
        assert.equal(hanako.getGender(), "female");
        assert.notEqual(hanako.getGender(), "male");
    });

    it("male can marry female", function(){
        var taro = new Person("太郎", "佐藤", 0);
        var hanako = new Person("花子", "佐藤", 1);
        assert.equal(marry(taro, hanako), true);
    });

    it("male cannot marry male", function(){
        var taro = new Person("太郎", "佐藤", 0);
        var jiro = new Person("次郎", "佐藤", 0);
        assert.equal(marry(taro, jiro), false);
    });

    it("birthday should return YYYYMMDD", function(){
        var taro = new Person("太郎", "佐藤", 0, 1984, 10, 16);
        assert.equal(taro.getBirthday(), '1984年10月16日');
    });

    it("age should return age", function(){
        var taro = new Person("太郎", "佐藤", 0, 1984, 10, 16);
        assert.equal(taro.getAge(), 30);
    });
});


describe("Marry", function(){

    it("male can marry female", function(){
        var taro = new Person("太郎", "佐藤", 0);
        var hanako = new Person("花子", "佐藤", 1);
        assert.equal(marry(taro, hanako), true);
    });

    it("male cannot marry male", function(){
        var taro = new Person("太郎", "佐藤", 0);
        var jiro = new Person("次郎", "佐藤", 0);
        assert.equal(marry(taro, jiro), false);
    });

    it("male cannot marry male", function(){
        var hanako = new Person("花子", "佐藤", 1);
        var jiko = new Person("次子", "佐藤", 1);
        assert.equal(marry(hanako, jiko), false);
    });
});
